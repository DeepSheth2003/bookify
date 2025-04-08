import { initializeApp } from 'firebase/app';
import { createContext, useContext , useState , useEffect } from 'react';
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore , collection , addDoc, getDocs , getDoc , doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDptKxEafMV_b9EcBflLI1KgsCRZYbMiD0",
    authDomain: "bookify-5cac3.firebaseapp.com",
    projectId: "bookify-5cac3",
    storageBucket: "bookify-5cac3.firebasestorage.app",
    messagingSenderId: "653886037004",
    appId: "1:653886037004:web:7b018f17542ac689292229"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const Google = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

// Context Function Starts Here :
export const FirebaseProvider = (props) => {

    const [user , setUser] = useState(null);

    const [check , setCheck] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth, (user)=>{
            if(user) setUser(user);
            else setUser(null);
        });
    },[])

    const signupUserWithEmailAndPassword = (email , password) => {
        createUserWithEmailAndPassword(firebaseAuth , email , password);
    }

    const loginUserWithEmailAndPassword = (email , password) => {
        signInWithEmailAndPassword(firebaseAuth , email , password);
    }

    const signInWithGoogle = () => {
        signInWithPopup(firebaseAuth , Google);
    }
    

    // its going to check is the user state has any user or user state have null;
    const isLoggedIn = user ? true : false;

    // create firestore data :
    const listDataToFirestore = async (name , isbn , price) => {
        const result = await addDoc(collection(firestore , 'Books'),{
            name,
            isbn,
            price,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
        })
        if(result) setCheck(true);
    }
    
    const checkListing = check ? true : false;

    // Rtrive Data from firestor
    const getListedData = async () => {
        // getDocs method thi data retrive karya chhe collection method thi reference apyu chhe !
        return await getDocs(collection(firestore , 'Books'));
    }

    // Retirve Data of single Document
    const getDataOfDocument = async ( bookId ) => {
        const docRef = doc(firestore , 'Books' , bookId.bookId);
        const snapshot = await getDoc(docRef);
        return snapshot;
    }

    // Sign out User

    const signOutUser = () => {
        signOut(firebaseAuth);
    }

    // Messages collection from users

    const sendMessage = (userEmail , messageText) => {
        const message = addDoc(collection(firestore, 'Messages'), {
            userEmail,
            messageText
        })
        return message;
    }


    // Create Order Collection in separate documents

    const placeOrder = async ( bookId , details , qauntity , address , city , rajya ) => {
        const collectionRef = collection(firestore , 'Orders');
        const result = await addDoc(collectionRef , {
            Book: details.name,
            BookId: bookId,
            Price: Number(details.price),
            Amount: details.price*Number(qauntity),
            userID: user.uid,
            userEmail: user.email,
            UserName: user.displayName,
            Qauntity: Number(qauntity),
            Address: address,
            City: city,
            State: rajya,
        });
        return result;
    }


    // Remmeber Always put provider data in {} curely Braces.
    return <FirebaseContext.Provider value={{signupUserWithEmailAndPassword , loginUserWithEmailAndPassword , signInWithGoogle , isLoggedIn , user , listDataToFirestore , checkListing , getListedData , getDataOfDocument , signOutUser , placeOrder , sendMessage }}> {props.children} </FirebaseContext.Provider>
}
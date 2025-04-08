export const fetchData = async () => {
    const data = await fetch('https://randomuser.me/api/');
    const response = data.json();
    return response;
}
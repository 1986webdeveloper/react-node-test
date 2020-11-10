export const API_URL: string = "http://localhost:5555";

export const postData = async (url: string, data: object) => {
    const response = await fetch(API_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
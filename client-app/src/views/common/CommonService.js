const API_URL = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const getAllLines = () => {
    const url = `${API_URL}/statistics/lines`;

    let myHeaders = new Headers();

    let fetchData = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .catch(error => {
            return undefined
        });
};

const getAllStops = () => {
    const url = `${API_URL}/statistics/stops`;

    let myHeaders = new Headers();

    let fetchData = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(url, fetchData)
        .then(response => checkStatus(response))
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .catch(error => {
            return undefined
        });
};

export const commonService = { getAllLines, getAllStops };
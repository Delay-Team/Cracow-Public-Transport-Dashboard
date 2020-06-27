const API_URL = process.env.REACT_APP_API_URL;

const checkStatus = (response) => {
    if(!response.ok) {
        throw Error(response.status);
    }
    return response;
};

const getUrl = (type) => {
    const url = `${API_URL}/statistics/${type}`;
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
}

const getAllLines = () => {
    return getUrl('lines')
};

const getAllStops = () => {
    return getUrl('stops')
};

export const commonService = { getAllLines, getAllStops };
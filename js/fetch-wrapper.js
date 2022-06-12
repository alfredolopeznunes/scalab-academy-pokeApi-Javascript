import { errorApi } from "./error.js";

export default class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json())
            .catch(error => {
                
                errorApi(error);
            });
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json())
        .catch(error => {
            
            errorApi(error);
        });
    }
}
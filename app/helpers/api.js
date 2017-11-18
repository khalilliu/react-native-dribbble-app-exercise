'use strict';

const API_URL = 'https://api.dribbble.com/v1/',
      ACCESS_TOKEN = '32da46f4370f31c4020c22f7a89d267254212eca0a26b49e128aa033a8c44c81';

const fetchData = (URL) => fetch(URL, {
        headers: {
            Authorization: `Bearer ${  ACCESS_TOKEN}`
        }
    }).then((response) => response.json());

const api = {
    getShotsByType(type: string, pageNumber: ?number): ?object {
        let URL = `${API_URL  }shots/?list=${  type}`;
        if (pageNumber) {
            URL += `&per_page=10&page=${  pageNumber}`;
        }
        return fetchData(URL);
    },
    getResources(url: string): ?object {
        return fetchData(url);
    }
};

export default api;

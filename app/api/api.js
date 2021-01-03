import axios from "axios";

import store from "../store";

const baseURL = "http://localhost:3001/api";

const getAPI = () => {
    const {
        auth: { jwt },
    } = store.getState();

    return axios.create({
        baseURL,
        headers: {
            authorization: `Bearer ${jwt}`,
        },
    });
};

export default getAPI;

//     withCredentials: true,

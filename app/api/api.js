import axios from "axios";

import store from "../store";

import { BASE_URL } from "../constants";

const getAPI = () => {
    const {
        auth: { jwt },
    } = store.getState();

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            authorization: `Bearer ${jwt}`,
        },
    });
};

export default getAPI;

//     withCredentials: true,

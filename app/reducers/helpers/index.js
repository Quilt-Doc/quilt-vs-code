export const populateIntegration = (payload, state, fileContextKeys) => {
    const copy = { ...state };

    fileContextKeys.map((key) => {
        if (key in payload) {
            const objects = _.mapKeys(payload[key], "_id");

            copy[key] = objects;
        } else {
            copy[key] = {};
        }
    });

    return copy;
};

export const merge = (state, payload) => {
    state = { ...state };

    payload.map((item) => {
        const { _id } = item;

        if (_id in state) {
            const currentItem = state[item._id];

            state[_id] = { ...currentItem, ...item };
        } else {
            state[_id] = item;
        }
    });

    return state;
};

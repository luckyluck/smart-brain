import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

export const setInput = input => ({
    type: actionTypes.SET_INPUT,
    payload: input
});

export const setBox = box => ({
    type: actionTypes.SET_BOX,
    payload: box
});

export const imageUrl = (input, userId) => {
    return dispatch => {
        dispatch(setInput(input));
        axiosInstance.post('imageurl', { input }).then(response => {
            if (response) {
                dispatch(image(userId));
            }
            dispatch(setBox(calculateFaceLocation(response.data)));
        })
        .catch(console.log);
    };
};

export const image = userId => {
    return dispatch => {
        axiosInstance.put('image', { id: userId }).then(count => {
            dispatch(setEntries(count.data));
        })
        .catch(console.log);
    };
};

export const setEntries = count => ({
    type: actionTypes.SET_ENTRIES,
    payload: count
});

const calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    };
};
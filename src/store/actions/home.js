import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

export const setInput = input => ({
    type: actionTypes.SET_INPUT,
    payload: input
});

export const setBox = boxes => ({
    type: actionTypes.SET_BOX,
    payload: boxes
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
    const result = [];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    for (const output of data.outputs) {
        for (const region of output.data.regions) {
            result.push({
                leftCol: region.region_info.bounding_box.left_col * width,
                topRow: region.region_info.bounding_box.top_row * height,
                rightCol: width - (region.region_info.bounding_box.right_col * width),
                bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
            });
        }
    }

    return result
};
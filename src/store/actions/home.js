import * as actionTypes from './actionTypes';
import axios from 'axios';

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
        axios.post(
            'http://localhost:3001/imageurl',
            { input: this.state.input }
        )
            // .then(response => response.json())
            .then(response => {
                if (response) {
                    dispatch(image(userId));
                }
                dispatch(setBox(calculateFaceLocation(response)));
            })
            .catch(err => console.log(err));
    };
};

export const image = userId => {
    return dispatch => {
        axios.put(
            'http://localhost:3001/image',
            { id: userId }
        )
            // .then(response => response.json())
            .then(count => {
                dispatch(setEntries(count));
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
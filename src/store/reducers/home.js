import * as actionTypes from '../actions/actionTypes';

const initialState = {
    imageUrl: '',
    boxes: [],
    entries: 0
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INPUT: {
            return {
                ...state,
                imageUrl: action.payload
            };
        }
        case actionTypes.SET_BOX: {
            return {
                ...state,
                boxes: action.payload
            };
        }
        case actionTypes.SET_ENTRIES: {
            return {
                ...state,
                entries: action.payload
            };
        }
        default:
            return state;
    }
};

export default home;
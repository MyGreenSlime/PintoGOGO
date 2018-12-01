import { SET_CURRENT_ORDER } from '../actions/types'
const initialState = {
    order : {}
}

export default function(state =  initialState, action) {
    switch(action.type) {
        case SET_CURRENT_ORDER:
            return {
                ...state,
                order : action.payload
            }
        default:
            return state;
    }
}
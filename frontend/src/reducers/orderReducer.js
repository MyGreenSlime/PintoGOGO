import { SET_CURRENT_ORDER } from '../actions/types'
import isEmpty from '../validation/is-empty'
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
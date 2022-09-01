import {
    UPDATE_CHILDREN,
    UPDATE_CHORE,
    DELETE_CHILD,
    DELETE_CHORE
} from "./actions";

import { useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_CHILDREN`, return a new state object with an updated products array
        case UPDATE_CHILDREN:
            return {
                ...state,
                children: [...action.children],
            }
        // if it's non of these actions, do not update state at all and keep things the same!
        default: 
            return state;
    }
}

export function useAppReducer(initialState) {
    return useReducer(reducer, initialState);
}
import {
    UPDATE_CHILDREN,
    UPDATE_CHORES,
    REMOVE_CHILD,
    REMOVE_CHORE,
    SET_CURRENT_CHILD,
    LOAD_CHORES
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

        // create new children array in newState with specified child removed then return state with new children array
        case REMOVE_CHILD: 
            let newChildren = state.children.filter(child => {
                return child._id !== action._id
            })

            return {
                ...state,
                children: [...newChildren]
            }

        case SET_CURRENT_CHILD: 
            return {
                ...state,
                currentChild: action.currentChild
            }
            
        case LOAD_CHORES: 
            return {
                ...state,
                chores: [...action.chores]
            }

        case REMOVE_CHORE: 
            let newChores = state.chores.filter(chore => {
                return chore._id !== action._id
            })

            return {
                ...state,
                chores: [...newChores]
            }

        case UPDATE_CHORES: 
            let updatedChores = state.chores.map(chore => {
                if (chore._id === action._id) {
                    return {...chore, ...action.choreInfo}
                } else {
                    return chore;
                }
            })

            return {
                ...state,
                chores: [...updatedChores]
            }
        // if it's non of these actions, do not update state at all and keep things the same!
        default: 
            return state;
    }
}

export function useAppReducer(initialState) {
    return useReducer(reducer, initialState);
}
import React, {createContext, useContext} from 'react';
import {useAppReducer} from './reducers';

const AppContext = createContext();
const {Provider} = AppContext;

const AppProvider = ({value = [], ...props}) => {

    const [state, dispatch] = useAppReducer({
        children: [],
        currentChild: '',
        chores: []
    })
    // use this to confirm it works!
    return <Provider value={[state, dispatch]} {...props} />;
}

const useAppContext = () => {
    return useContext(AppContext);
}

export {AppProvider, useAppContext};
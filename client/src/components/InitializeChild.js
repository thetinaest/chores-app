import {useEffect} from 'react';
import Auth from '../utils/auth';
import {useAppContext} from '../utils/GlobalState';
import {useQuery} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {LOAD_CHORES, SET_CURRENT_CHILD} from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const InitializeChild = () => {
    const [state, dispatch] = useAppContext();

    const profile = Auth.getProfile();

    // query child data from child collection
    const {loading, error, data: childData} = useQuery(QUERY_CHILD, {
        variables: {_id: profile.data._id}
    })

    const chores = childData?.child.chores || [];

    // update state with current child and chores
    useEffect(() => {

        if (childData) {
            // set current child current child
            dispatch({
                type: SET_CURRENT_CHILD,
                currentChild: childData.child
            })
        }
        
        
        // if chores in query
        if (chores) {
            dispatch({
                type: LOAD_CHORES,
                chores
            })

            // add all chores to indexedDB
            chores.forEach(chore => {
                idbPromise('chores', 'put', chore);
            })
        }
      }, [loading])
        
    return (<></>);
}

export default InitializeChild;
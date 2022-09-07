import {useEffect} from 'react';
import Auth from '../utils/auth';
import {useAppContext} from '../utils/GlobalState';
import {useQuery} from '@apollo/client';
import {QUERY_PARENT} from '../utils/queries';
import {SET_CURRENT_CHILD, UPDATE_CHILDREN} from '../utils/actions';
import { idbPromise } from '../utils/helpers';

const InitializeParent = () => {
    const [state, dispatch] = useAppContext();

    const profile = Auth.getProfile();

    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
        variables: { _id: profile.data._id },
      });
  
      const childrenData = parentData?.parent.children || [];
  
      useEffect(() => {
        // if state.currentChild
        if (state.currentChild) {
          dispatch({
            type: SET_CURRENT_CHILD,
            currentChild: {}
          })
        }
        // if children in query
        if (childrenData) {
          // update global state to contain children in query
          dispatch({
            type: UPDATE_CHILDREN,
            children: childrenData
          })
  
          // add all children to indexedDB
          childrenData.forEach(child => {
            idbPromise('children', 'put', child);
          })
        } else if (!loading) {
          idbPromise('children', 'get').then(children => {
            // use retrieved data to set global state for offline browsing
            dispatch({
              type: UPDATE_CHILDREN,
              children: children
            })
          })
        }
      }, [loading])
        

    return (<></>);
}

export default InitializeParent;
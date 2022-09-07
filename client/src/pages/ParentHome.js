import React, {useEffect, useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";
import {useNavigate, Link} from 'react-router-dom';


import ChildCard from '../components/ChildCard';
import { SET_CURRENT_CHILD, UPDATE_CHILDREN } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import {useAppContext} from '../utils/GlobalState';

// add parent homescreen function
const ParentHome = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useAppContext();
    const [removingChild, setRemovingChild] = useState(false);
    
    // get current user parent profile
    const profile = Auth.getProfile();

        // check if user is logged in
        if (Auth.loggedIn() && profile.data.username) {

        } else {
          // navigate to dashboard if not logged in
          navigate('/');
        }

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




  //return html
  return (
    <>
      <Link to='/create-child' className="navElement">Create Child</Link>
      {state.children.length > 0 &&
        <Link to='/add-chore' className="navElement">Add Chore</Link>
      }
      <button onClick= {() => setRemovingChild(!removingChild)}className="navElement border-0 p-2">{!removingChild ? 'Remove Child' : 'Finish'}</button>

      <h2 className="my-3">{`${profile.data.displayName || profile.data.username}'s Children`}</h2>
      <div className="d-flex flex-column btnGroup">
        {state.children.map(child => {
          return <ChildCard child={child} key={child._id} removingChild={removingChild}/>
        })}
      </div>
    </>
        
  )

}

export default ParentHome;
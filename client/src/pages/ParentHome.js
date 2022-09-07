import React, {useEffect, useState} from "react";
import Auth from "../utils/auth";
import {useNavigate, Link} from 'react-router-dom';


import ChildCard from '../components/ChildCard';
import { SET_CURRENT_CHILD } from "../utils/actions";
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

    // resets current child to null when visiting home page
    useEffect(() => {
      dispatch({
        type: SET_CURRENT_CHILD,
        currentChild: {}
      })
    }, [])

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
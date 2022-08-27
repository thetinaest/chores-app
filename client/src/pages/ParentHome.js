import React, {useEffect, useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";
import {useNavigate, Link} from 'react-router-dom';


import ChildCard from '../components/ChildCard';

// add parent homescreen function
const ParentHome = () => {
    const navigate = useNavigate();
    

    const [removingChild, setRemovingChild] = useState(false);
    
    // get current user parent profile
    const profile = Auth.getProfile();

    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
      variables: { _id: profile.data._id },
    });

    const children = parentData?.parent.children || [];

    // check if user is logged in
    if (Auth.loggedIn() && profile.data.username) {

    } else {
      // navigate to dashboard if not logged in
      navigate('/');
    }


  //return html
  return (
    <>
      <Link to='/create-child' className="navElement">Create Child</Link>
      <Link to='/add-chore' className="navElement">Add Chore</Link>
      <button onClick= {() => setRemovingChild(!removingChild)}className="navElement border-0 p-2">{!removingChild ? 'Remove Child' : 'Finish'}</button>

      <h2 className="my-3">{`${profile.data.username}'s Children`}</h2>
      <div className="d-flex flex-column btnGroup">
        {children.map(child => {
          return <ChildCard child={child} key={child._id} removingChild={removingChild}/>
        })}
      </div>
    </>
        
  )

}

export default ParentHome;
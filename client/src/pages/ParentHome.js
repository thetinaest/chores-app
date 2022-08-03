import React, {useEffect, useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CHILD } from "../utils/mutations";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";
import {useNavigate, Link} from 'react-router-dom';

import ChildCard from '../components/ChildCard';

// add parent homescreen function
const ParentHome = () => {
    const navigate = useNavigate();
    
    // get current user parent profile
    const profile = Auth.getProfile();
    // console.log(profile.data._id);

    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
      variables: { _id: profile.data._id },
    });

    const children = parentData?.parent.children || [];

    console.log(parentData);

    // check if user is logged in
    if (Auth.loggedIn() && profile.data.username) {
      
    } else {
      // navigate to dashboard if not logged in
      navigate('/');
    }


  //return html
  return (
    <>
      <div>{loading ? 'Loading' : `Rendering the children of ${profile.data.username}`}</div>
      <Link to='/create-child'>Create Child</Link>
      <Link to='/add-chore'>Add Chore</Link>
      <div className="d-flex flex-column">
        {children.map(child => {
          return <ChildCard child={child} key={child._id}/>
        })}
      </div>
      
      
    </>
        
  )

}

export default ParentHome;
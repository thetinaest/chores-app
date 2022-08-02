import React, {useEffect, useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CHILD } from "../utils/mutations";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";
import {useNavigate} from 'react-router-dom';

import ChildCard from '../components/ChildCard';

// add parent homescreen function
const ParentHome = () => {
    const [children, setChildren] = useState([]);
    const navigate = useNavigate();
    const [addChild] = useMutation(ADD_CHILD);
    
    // get current user parent profile
    const profile = Auth.getProfile();
    console.log(profile.data._id);

    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
      variables: { _id: profile.data._id },
    });

      // check if user is logged in
      if (Auth.loggedIn() && profile.data.username) {
        
      } else {
        // navigate to dashboard if not logged in
        navigate('/');
      }

      useEffect( () => {
        if (!loading){
          console.log(parentData);
          console.log(parentData.parent.children);
          setChildren(parentData.parent.children);
        }
      }, [loading])


  

  // if (loading) {
  //     return <div> Loading....</div>
  // } else {
  //   console.log(data);
  // }

  //add handleclick for adding child(ren) 

  const handleClick = async () => {
    try {
      await addChild({
        variables: { id: parent._id },
      });
    } catch (e) {
      console.error(e);
    }
  };


  //return html
  return (
    <>
      <div>{loading ? 'Loading' : `Rendering the children of ${profile.data.username}`}</div>
      {children.map(child => {
        return <ChildCard child={child} key={child._id}/>
      })}
    </>
        
  )

}

export default ParentHome;
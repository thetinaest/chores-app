import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CHILD } from "../utils/mutations";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";
import {useNavigate} from 'react-router-dom';

import ChildCard from '../components/ChildCard';

// add parent homescreen function
const ParentHome = async () => {
    const navigate = useNavigate();
    const [addChild] = useMutation(ADD_CHILD);
    // const [ queryParent, { loading, data }] = useQuery(QUERY_PARENT)
    

  // check if user is logged in
  if (Auth.loggedIn() && Auth.getProfile().data.username) {
    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
      variables: { _id: Auth.getProfile().data._id },
    });
    console.log(parentData);
    const children = parentData.children;
  } else {
    // navigate to dashboard if not logged in
    navigate('/');
  }

  if (loading) {
      return <div> Loading....</div>
  }

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
      {children.map(child => {
        <ChildCard child={child}/>
      })}
    </>
        
  )

}

export default ParentHome;
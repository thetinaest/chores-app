import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CHILD } from "../utils/mutations";
import { QUERY_PARENT } from "../utils/queries";
import Auth from "../utils/auth";

// add parent homescreen function
const ParentHome = (props) => {
    const { userId } = props 

    const [addChild] = useMutation(ADD_CHILD);
    const [ queryParent, { loading, data }] = useQuery(QUERY_PARENT) 
    


// navigate to profile
if (Auth.loggedIn() && Auth.getProfile().data.username ) {
    return <Navigate to="/profile:username" />;
}

if (loading) {
    return <div> Loading....</div>
}

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
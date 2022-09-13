import {UPDATE_CHILD} from '../utils/mutations';
import { useState } from 'react';
import {useMutation} from '@apollo/client';
import {useNavigate, Link, useParams} from 'react-router-dom';
import { useAppContext } from '../utils/GlobalState';
import {SET_CURRENT_CHILD} from '../utils/actions';

const ChildProfile = () => {
    const navigate = useNavigate();
    const {childId} = useParams();
    const [state, dispatch] = useAppContext();

    const [updateChild, {loading, error}] = useMutation(UPDATE_CHILD);
    const [displayName, setDisplayName] = useState(state.currentChild.displayName || '')
    const [username, setUsername] = useState(state.currentChild.username || '')

    if (!state.currentChild._id) {
        window.location.assign(`/children/${childId}`);
    }


    const submitUpdatedProfile = async e => {
        e.preventDefault()

        try {
        dispatch({
            type: SET_CURRENT_CHILD,
            currentChild: {
                displayName, 
                _id: childId,
                username
            }
        })

        const {data} = await updateChild({
            variables: {
                _id: childId,
                username,
                displayName
            }
        })
        
        window.location.assign(`/children/${childId}`);
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            <nav>
                <Link to='/create-child' className="navElement">Create Child</Link>
                {state.children.length > 0 &&
                    <Link to='/add-chore' className="navElement">Add Chore</Link>
                }
                <Link to={`/child-password/${childId}`} className="navElement">Change Password</Link>
            </nav>
            

            <form className='d-flex flex-column' onSubmit={submitUpdatedProfile}>
                <h1 className="mt-3">Edit {state.currentChild.displayName}'s Profile</h1>
                <input
                    name="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Name"
                    type="text"
                    required
                    
                />
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    type="text"
                    required
                    
                />
                <button type="submit" className='w-100 mt-2 rounded'>Update {state.currentChild.displayName}'s Profile</button>
                {error && <div>Error! {error.message}</div>}
            </form>
        </>

    );
}

export default ChildProfile;

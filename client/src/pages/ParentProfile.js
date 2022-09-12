import {UPDATE_PARENT} from '../utils/mutations';
import { useState } from 'react';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import {useNavigate, Link} from 'react-router-dom';
import { useAppContext } from '../utils/GlobalState';

const ParentProfile = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useAppContext();

    const {data: profile} = Auth.getProfile();

    const [updateParent, {loading, error}] = useMutation(UPDATE_PARENT);
    const [displayName, setDisplayName] = useState(profile.displayName || '')
    const [username, setUsername] = useState(profile.username || '')
    const [email, setEmail] = useState(profile.email || '')


    const submitUpdatedProfile = async e => {
        e.preventDefault()

        console.log(profile._id);

        try {
        const {data} = await updateParent({
            variables: {
                _id: profile._id,
                username,
                email,
                displayName
            }
        })
        // sign new token
        Auth.login(data.updateParent.token)
        
        navigate('/parent-home');
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
                <Link to='/parent-password' className="navElement">Change Password</Link>
            </nav>
            

            <form className='d-flex flex-column' onSubmit={submitUpdatedProfile}>
                <h1 className="mt-3">Edit Profile</h1>
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
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="text"
                    required
                    
                />
                <button type="submit" className='w-100 mt-2 rounded'>Update Profile</button>
                {error && <div>Error! {error.message}</div>}
            </form>
        </>

    );
}

export default ParentProfile;

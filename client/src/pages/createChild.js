import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ADD_CHILD} from '../utils/mutations';
import {useNavigate, Link} from 'react-router-dom';
import Auth from '../utils/auth';
import {QUERY_PARENT} from '../utils/queries';
import {idbPromise} from '../utils/helpers';
import {useAppContext} from '../utils/GlobalState';
import {UPDATE_CHILDREN} from '../utils/actions';


const createChild = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useAppContext();
    const [displayName, setDisplayName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // get current user parent profile
    const profile = Auth.getProfile();

    // query user data from parent collection
    const [createChild, loading, error ] = useMutation(ADD_CHILD, {
        // refetchQueries: [
        //     {query: QUERY_PARENT}, // DocumentNode object parsed with gql
        //     'parent' // Query name
        // ],
    })
    
    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            const {data} = await createChild({
                variables: {
                    username,
                    password,
                    displayName,
                    parentId: profile.data._id
                }
            })
            
            if (!data) {
                throw 'Invalid entry'
            }
            dispatch({
                type: UPDATE_CHILDREN,
                children: [...state.children, data.addChild.child]
            })
            // store child data in indexedDB
            idbPromise('children', 'put', {...data.addChild.child});
            // navigate('/parent-home');
            window.location.assign('/parent-home');
        } catch (err) {
            console.log(err);
        }
    }


    // login form set to require username and password
    return (
        <>
            <nav>
                {state.children.length > 0 &&
                    <Link to='/add-chore' className="navElement">Add Chore</Link>
                }
            </nav>
            
            <form className='d-flex flex-column mt-3' onSubmit={handleSubmit}>
            <h1>Create Child</h1>
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
            />
            <button type="submit" className='w-100 mt-2 rounded'>Create Child</button>
        </form>
        </>
        
    )
}

// TODO: peer review

export default createChild
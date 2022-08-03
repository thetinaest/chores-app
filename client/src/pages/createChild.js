import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ADD_CHILD} from '../utils/mutations';
import {useNavigate} from 'react-router-dom';
import Auth from '../utils/auth';

const createChild = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [createChild, loading, error ] = useMutation(ADD_CHILD)

    // get current user parent profile
    const profile = Auth.getProfile();

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            const {data} = await createChild({
                variables: {
                    username,
                    password,
                    parentId: profile.data._id
                }
            })
            navigate('/parent-home');
        } catch (err) {
            console.log(err);
        }
    }


    // if (loading) return 'Loading...'

    // if (error) return `Error! ${error.message}`


    // login form set to require username and password
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                placeholder="password"
                type="password"
                required
            />
            <button type="submit">Create Child</button>
        </form>
    )
}

// TODO: peer review

export default createChild
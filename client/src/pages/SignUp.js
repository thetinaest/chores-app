import {ADD_PARENT} from '../utils/mutations';
import { useState } from 'react';
import {useMutation} from '@apollo/client';
import AuthService from '../utils/auth';
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate();
    const [addParent, {loading, error}] = useMutation(ADD_PARENT);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()

        try {
        const {data} = await addParent({
            variables: {
                username,
                email,
                password
            }
        })
        AuthService.login(data.addParent.token)
        navigate('/parent-home');
    } catch (err) {
        console.log(err);
    }
    }

    return(
        <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
        <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            required
        />
        <button type="submit">Submit</button>
    </form>
    );
}

export default SignUp

import {ADD_PARENT} from '../utils/mutations';
import { useState } from 'react';

const SignUp = (props) => {
    const {setUserType} = props;
    const [addParent, {loading, error}] = useMutation(ADD_PARENT);
    const [username, setUsername] = useState('')
    cosnt [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async e => {
        e.preventDefault()
        const {data} = await addParent({
            variables: {
                username,
                email,
                password
            }
        })
        AuthService.addParent(data.addParent.token)
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

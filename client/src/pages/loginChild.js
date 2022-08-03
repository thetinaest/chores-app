import { useState } from 'react'
import {LOGIN_CHILD} from '../utils/mutations'
import { useMutation } from '@apollo/client'
import  AuthService  from '../utils/auth'
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginChild, {loading, error} ] = useMutation(LOGIN_CHILD)

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const {data} = await loginChild({
                variables: {
                    username,
                    password
                }
            })
            AuthService.login(data.loginChild.token)
            navigate('/child-home');
        } catch (err) {
            console.log(err);
        }
    }

    
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
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
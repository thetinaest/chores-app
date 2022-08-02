import { useState } from 'react'
import {LOGIN_CHILD} from '../utils/mutations'
import { useMutation } from '@apollo/client'
import  AuthService  from '../utils/auth'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, {loading, error} ] = useMutation(LOGIN_CHILD)

    const handleSubmit = async e => {
        e.preventDefault()
        const {data} = await login({
            variables: {
                username,
                password
            }
        })
        AuthService.login(data.LOGIN_CHILD.token)
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
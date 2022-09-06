import { useState } from 'react'
import { LOGIN_PARENT } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import  AuthService  from '../utils/auth'
import {useNavigate} from 'react-router-dom';

const Login = ({setLoggedIn}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // loading will proc when the page is loading. Error will proc if an error is encountered
    const [loginParent, {loading, error} ] = useMutation(LOGIN_PARENT)


    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            const {data} = await loginParent({
                variables: { username, password}
            })
            AuthService.login(data.loginParent.token)
            setLoggedIn(true);
            navigate('/parent-home');
        } catch (err) {
            console.log(err);
        }
    }
 
    return (
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
            <h2 >Parent Login</h2>
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
            <button type="submit" className='w-100 mt-2 rounded'>Login</button>
            {error && <div>Error! {error.message}</div>}
        </form>
    )
}

export default Login
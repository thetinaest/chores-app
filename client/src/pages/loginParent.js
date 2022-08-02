import { useState } from 'react'
import { LOGIN_PARENT } from '../utils/mutations'
import { QUERY_PARENT} from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client'
import  AuthService  from '../utils/auth'

const Login = (props) => {
    const {setUserId} = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
// loading will proc when the page is loading. Error will proc if an error is encountered
    const [login, {loading, error} ] = useMutation(LOGIN_PARENT)


    const handleSubmit = async e => {
        e.preventDefault()
        //use query
        const {data} = await login({
            variables: {
                username,
                password
            }
        })
        AuthService.login(data.LOGIN_PARENT.token)

        const {data: currentParent} = useQuery(QUERY_PARENT,
            {
                variables: {
                    username
                }
            })
        
        setUserId(currentParent._id)
    }
 
    if (loading) return 'Loading...'

    if (error) return `Error! ${error.message}`
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
            <button type="submit">Login</button>
        </form>
    )
}

export default Login
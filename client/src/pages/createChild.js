import { useState } from 'react'
import { useMutation } from '@apollo/client'

const createChild = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [createChild, loading, error ] = useMutation(createChild)

    const handleSubmit = async e => {
        e.preventDefault()
        const {data} = await createChild({
            variables: {
                username,
                password
            }
        })
        AuthService.login(data.createChild.token)
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

// TODO: peer review

export default createChild
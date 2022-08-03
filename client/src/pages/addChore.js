import { useState } from 'react'
import { useMutation } from '@apollo/client'

const addChore = () => {
    const [addChore, loading, error ] = useMutation(addChore)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const {data} = await addChore({
            variables: {
                name, 
                description
            }
        })
    }


    if (loading) return 'Loading...'

    if (error) return `Error! ${error.message}`


    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Chore</h1>
            <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chore Name"
                type="text"
                required
                
            />
            <input
                name="description"
                value={password}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Chore Description"
                type="text"
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default addChore
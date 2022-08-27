import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {ADD_CHORE} from '../utils/mutations';
import {QUERY_PARENT, QUERY_CHILD} from '../utils/queries';
import Auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';

const addChore = () => {
    const navigate = useNavigate();
    const [addChore] = useMutation(ADD_CHORE)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [child, setChild] = useState('');

    // get current user parent profile
    const profile = Auth.getProfile();
    // console.log(profile.data._id);

    // query user data from parent collection
    const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
      variables: { _id: profile.data._id },
    });

    const children = parentData?.parent.children || [];

    const handleSubmit = async e => {
        e.preventDefault()

        const childId = children.filter(fchild => fchild.username === child)[0]._id

        try {
            const {data} = await addChore({
                variables: {
                    name, 
                    description,
                    childId
                },
                refetchQueries: [
                    {query: QUERY_CHILD}, // DocumentNode object parsed with gql
                    'child' // Query name
                ],
            })
            navigate(`/children/${childId}`)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className='d-flex flex-column mt-3'onSubmit={handleSubmit}>
            <h1>Add Chore</h1>
            <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chore Name"
                type="text"
                required
                
            />
            <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Chore Description"
                type="text"
                rows='5'
                required
            />
            <input 
                type="text" 
                list="childList" 
                placeholder="Child"
                value={child}
                onChange={(e) => {
                    setChild(e.target.value);
                }}
            />
            <datalist id="childList">
                {children.map(child => {
                    return <option value={child.username} key={child._id}/>
                })}
            </datalist>

            <button type="submit"  className='w-100 mt-2 rounded'>Add Chore</button>
        </form>
    )
}

export default addChore
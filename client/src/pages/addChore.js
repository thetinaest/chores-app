import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {ADD_CHORE} from '../utils/mutations';
import {QUERY_PARENT, QUERY_CHILD} from '../utils/queries';
import Auth from '../utils/auth';
import {useNavigate, Link} from 'react-router-dom';
import {useAppContext} from '../utils/GlobalState';


const addChore = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useAppContext();
    const [addChore] = useMutation(ADD_CHORE)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [childId, setChildId] = useState(state.currentChild._id || '');
    
    // get current user parent profile
    const profile = Auth.getProfile();

    // prevent users from using the add-chore page if they have no children
    if (state.children.length === 0) {
        window.location.assign('/parent-home');
    }

    // query user data from parent collection
    // const { loading, error, data: parentData } = useQuery(QUERY_PARENT, {
    //   variables: { _id: profile.data._id },
    // });

    // const children = parentData?.parent.children || [];

    const handleSubmit = async e => {
        e.preventDefault()

        try {

            if (!childId) {
                throw 'Please select a child';
            }

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

            window.location.assign(`/children/${childId}`)
            // navigate(`/children/${childId}`)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to='/create-child' className="navElement">Create Child</Link>
            <Link to="/parent-home" className="navElement">Home</Link>
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
            <select 
            name="child-list" 
            id="child-list"
            className="mt-1"
            required
            defaultValue={childId}
            onChange={(e) => {
                setChildId(e.target.value);
            }}>
                <option>Select a child...</option>
                {state.children.map(child => {
                    return <option value={child._id} key={child._id}>{child.displayName || child.username}</option>
                })}
            </select>

            <button type="submit"  className='w-100 mt-2 rounded'>Add Chore</button>
        </form>
        </>
        
    )
}

export default addChore
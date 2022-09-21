import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {ADD_CHORE} from '../utils/mutations';
import {QUERY_CHILD} from '../utils/queries';
import Auth from '../utils/auth';
import {useNavigate, Link} from 'react-router-dom';
import {useAppContext} from '../utils/GlobalState';


const addChore = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useAppContext();
    const [addChore] = useMutation(ADD_CHORE)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [allowance, setAllowance] = useState('');
    const [points, setPoints] = useState('');
    const [childId, setChildId] = useState(state.currentChild._id || '');

    const handleSubmit = async e => {
        e.preventDefault()

        try {

            // no child selected
            if (!childId) {
                throw 'Please select a child';
            }

            const {data} = await addChore({
                variables: {
                    name, 
                    description,
                    childId,
                    allowance,
                    points
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

    const handleAllowance = () => {
        // default allowance of $0.00
        if (!allowance) {
            setAllowance('');
            return;
        }

        // if allowance is an integer
        if (allowance % 1 === 0 && !allowance.includes('.00')) {
            setAllowance(`${allowance}.00`);
        } else {
            setAllowance(`${allowance}`.split(''));
            
            // money format, only 2 decimal places
            for (let i = 0; i < allowance.length; i++) {
                if (allowance[i] === '.') {
                    setAllowance(allowance.slice(0, i + 3))

                    // if only one decimal place was added, add an extra 0
                    if (allowance.length - i < 3) {
                        setAllowance(`${allowance}0`);
                    }
                    break;
                }
            }
        }
    }

    return (
        <>
            <nav>
                <Link to="/parent-home" className="navElement">Home</Link>
                <Link to='/create-child' className="navElement">Create Child</Link>
            </nav>
            
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
                type="number"
                value={allowance}
                onChange = {(e) => setAllowance(e.target.value)}
                onBlur = {() => handleAllowance()}
                step='0.01'
                min='0'
                placeholder="Allowance (Optional)"
            />

            <input
                type="number"
                value={points}
                onChange = {(e) => setPoints(e.target.value)}
                onBlur = {() => {if(points) setPoints(Math.floor(points))}}
                step='1'
                min='0'
                placeholder="Chore Points (Optional)"
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
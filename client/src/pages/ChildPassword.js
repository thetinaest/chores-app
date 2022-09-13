import {useState} from 'react';
import {UPDATE_CHILD} from '../utils/mutations';
import {useMutation} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {useAppContext} from '../utils/GlobalState';

const ChildPassword = () => {
    const {childId} = useParams();
    const [state, dispatch] = useAppContext();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [updateChild, {loading}] = useMutation(UPDATE_CHILD);

    if (!state.currentChild._id) {
        window.location.assign(`/children/${childId}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Both fields must match!')
            return;
        }

        try {
            const {data} = await updateChild({
                variables: {
                    _id: childId,
                    password
                }
            })
            window.location.assign(`/child-profile/${childId}`);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <h1 className="mt-3">Change {state.currentChild.displayName}'s Password</h1>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    type="password"
                    required
                    
                />
                {password &&
                    <input
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    type="password"
                    required
                    
                    />
                }
                {error && <div>*{error}</div>}
                {confirmPassword &&
                    <button type="submit" className='w-100 mt-2 rounded'>Update {state.currentChild.displayName}'s Password</button>
                }
                
                
            </form>
        </>
    )

}

export default ChildPassword;
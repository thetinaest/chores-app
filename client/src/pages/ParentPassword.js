import {useState} from 'react';
import {UPDATE_PARENT} from '../utils/mutations';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';

const ParentPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [updateParent, {loading}] = useMutation(UPDATE_PARENT);

    const {data: profile} = Auth.getProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Both fields must match!')
            return;
        }

        try {
            const {data} = await updateParent({
                variables: {
                    _id: profile._id,
                    password
                }
            })
            window.location.assign('/parent-home');
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <h1 className="mt-3">Change Password</h1>
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
                    <button type="submit" className='w-100 mt-2 rounded'>Update Password</button>
                }
                
                
            </form>
        </>
    )

}

export default ParentPassword;
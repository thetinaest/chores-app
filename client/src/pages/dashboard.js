import { Link, Navigate } from 'react-router-dom';
import Auth from '../utils/auth';


const Dashboard = () => {

    const loggedIn = Auth.loggedIn();

    // if already logged in, navigate to appropriate home screen
    if (loggedIn) {
        const profile = Auth.getProfile();
        if (profile.data.userType === 'parent'){
            return <Navigate to='/parent-home' />
        } else if (profile.data.userType === 'child') {
            return <Navigate to='/child-home' />
        }
    }
    return(
        <>
            <Link to='/login-parent'>Parent Login</Link>
            <Link to='/login-child'>Child Login</Link>
            <Link to='/sign-up'>Sign Up</Link>
        </>
    );
}

export default Dashboard;
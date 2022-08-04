import "../App.css";
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
        <div className="container">
        <div className="btnGroup">
            <Link className="link"to='/login-parent'>
                <button>Parent Login</button>
            </Link>

            <Link className="link"to='/login-child'>
            <button> Child Login</button>
            </Link>

            <Link className="link"to='/sign-up'>
            <button>Sign up</button>
            </Link>
            </div>
        </div>
    );
}

export default Dashboard;
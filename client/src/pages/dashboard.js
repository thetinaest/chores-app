import { Link } from 'react-router-dom';

const Dashboard = () => {
    return(
        <>
            <Link to='/login-parent'>Parent Login</Link>
            <Link to='/login-child'>Child Login</Link>
            <Link to='/sign-up'>Sign Up</Link>
        </>
    );
}

export default Dashboard;
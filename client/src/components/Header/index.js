import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = (props) => {
    const {loggedIn, setLoggedIn} = props;

    // logout user
    const logout = e => {
        e.preventDefault();
        setLoggedIn(false);
        Auth.logout();
    }


    return (
        <>
        <h1 className="appName">Jessie's List</h1>

        {loggedIn && <Link to="/dashboard" onClick={logout}>Logout</Link>}
        </>
    )
}

export default Header;
import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';
import './style.css';

const Header = (props) => {
    const {loggedIn, setLoggedIn} = props;

    // logout user
    const logout = e => {
        e.preventDefault();
        setLoggedIn(false);
        Auth.logout();
    }


    return (
        <div>
            <h1 className="appName">Jessie's List</h1>

            {loggedIn && <Link className='logout-btn' to="/dashboard" onClick={logout}>Logout</Link>}
        </div>
    )
}

export default Header;
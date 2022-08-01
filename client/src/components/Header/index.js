import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

function Header(props) {

    // logout user
    const logout = e => {
        e.preventDefault();
        Auth.logout();
    }

    // check if current user is logged in
    const loggedIn = Auth.loggedIn();

    return (
        <>
        <h1>Jessie's List</h1>

        {loggedIn && <Link to="/dashboard" onClick={logout}/>}
        </>
    )
    
}

export default Header;
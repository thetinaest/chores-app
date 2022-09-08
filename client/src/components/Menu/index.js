import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

const Menu = (props) => {
    const {setLoggedIn, toggleMenu} = props;

    // logout user
    const logout = e => {
        e.preventDefault();
        setLoggedIn(false);
        Auth.logout();
    }

    const profile = Auth.getProfile();

    if (profile.data.userType === 'parent') {
        // PARENT menu
        return (
            <>
                <div className="menu">
                    <button type="button" className="btn-close close-menu-btn" aria-label="Close" onClick={toggleMenu}></button>

                    <Link className='menu-btn' to="/parent-profile" onClick={toggleMenu}>Profile</Link>

                    <Link className='menu-btn' to="/dashboard" onClick={logout}>Logout</Link>
                </div>
            </>

            
        )
    } else if (profile.data.userType === 'child') {
        // CHILD menu
        return(
            <>
                <div className="menu">
                    <button type="button" className="btn-close close-menu-btn" aria-label="Close" onClick={toggleMenu}></button>

                    <Link className='menu-btn' to="/dashboard" onClick={logout}>Logout</Link>
                </div>
            </>
        )
        
    }

    
}

export default Menu;
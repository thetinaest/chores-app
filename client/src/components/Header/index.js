import { useState } from 'react';

import Menu from '../Menu';
import './style.css';

const Header = (props) => {
    const {loggedIn} = props;

    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div>
            <h1 className="appName">Jessie's List</h1>

            {loggedIn && 
             <button 
             className="open-menu-btn"
             onClick={toggleMenu}
             >Menu</button>
            }
           
            {loggedIn && menuOpen && <Menu toggleMenu={toggleMenu} {...props}/>}
        </div>
    )
}

export default Header;
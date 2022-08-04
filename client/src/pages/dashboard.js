import { Link } from 'react-router-dom';
import Header from "../components/Header"
import "../App.css";

const Dashboard = () => {
    return(
        <div className="container">
        <Header />
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
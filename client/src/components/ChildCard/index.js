import {Link} from 'react-router-dom';


const ChildCard = (props) => {
    // get username and chores of child from props
    const {username, chores} = props;

    return (
        <Link to="/">
            {username}
        </Link>
    )
}

export default ChildCard;
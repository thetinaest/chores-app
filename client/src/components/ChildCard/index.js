import {Link} from 'react-router-dom';


const ChildCard = (props) => {
    // get username and chores of child from props
    const {child} = props;
    const {username, _id} = child

    return (
        
        <Link to={`/children/${_id}`}>
            {username}
        </Link>
    )
}

export default ChildCard;
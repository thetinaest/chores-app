import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client'
import { DELETE_CHILD } from "../../utils/mutations";
import {QUERY_PARENT} from '../../utils/queries';
import './style.css';


const ChildCard = (props) => {
    const [removeChild] = useMutation(DELETE_CHILD)

    // get username and chores of child from props
    const {username, _id} = props.child
    // removing child status
    const {removingChild} = props;

    const handleClick = async (e) => {

        try {
            const {data} = await removeChild({
                variables: {
                    _id
                },
                refetchQueries: [
                    {query: QUERY_PARENT}, // DocumentNode object parsed with gql
                    'parent' // Query name
                ],
            })
            
        } catch (err) {
            console.log(err);
        }
    }

    if (!removingChild) {
        return (
            <Link to={`/children/${_id}`} className='button mb-3'>
                {username}
            </Link>
        )
    } else {
        return (
            <button 
                className='remove-child-btn b-danger w-100 mb-3'
                onClick={handleClick}
            >Delete {username}</button>
        )
    }



    
    
}

export default ChildCard;
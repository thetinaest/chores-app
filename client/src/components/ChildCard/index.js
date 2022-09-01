import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/client'
import { DELETE_CHILD } from "../../utils/mutations";
import {QUERY_PARENT} from '../../utils/queries';
import {idbPromise} from '../../utils/helpers';


const ChildCard = (props) => {
    const [removeChild] = useMutation(DELETE_CHILD);

    // get username and chores of child from props
    const {username, _id, displayName} = props.child
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
                ]
            })
            // Remove child from indexedDB
            idbPromise('children', 'delete', {_id: data.deleteChild._id})
            
        } catch (err) {
            console.log(err);
        }
    }

    if (!removingChild) {
        return (
            <Link to={`/children/${_id}`} className='button mb-3'>
                {displayName || username}
            </Link>
        )
    } else {
        return (
            <button 
                className='remove-child-btn bg-danger w-100 mb-3'
                onClick={handleClick}
            >Delete {displayName || username}</button>
        )
    }



    
    
}

export default ChildCard;
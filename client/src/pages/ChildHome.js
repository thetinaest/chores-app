import {useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE} from '../utils/mutations';
import Auth from '../utils/auth';
import {useAppContext} from '../utils/GlobalState';
import {UPDATE_CHORES} from '../utils/actions';
import {idbPromise} from '../utils/helpers';

import ChoreCard from '../components/ChoreCard';

const ChildHome = () => {
    const [state, dispatch] = useAppContext();

    //mutations
    const [updateChore] = useMutation(UPDATE_CHORE, {
        refetchQueries: [
            {query: QUERY_CHILD}, // DocumentNode object parsed with gql
            'child' // Query name
        ],
    });

    // get current user child profile
    const profile = Auth.getProfile();

    const markComplete = async (chore) => {
        // update chore in global state
        dispatch({
            type: UPDATE_CHORES,
            _id: chore._id,
            choreInfo: {
                status: "Awaiting Approval",
            }
        })

        await updateChore({
            variables: { ...chore, status: "Awaiting Approval"}
        })

        // update chore in indexedDB
        idbPromise('chores', 'put', {... chore, status: "Awaiting Approval"});
    }

    const redoChore = async (chore) => {
        // update chore in global state
        dispatch({
            type: UPDATE_CHORES,
            _id: chore._id,
            choreInfo: {
                status: "Incomplete",
            }
        })
        
        await updateChore({
            variables: { ...chore, status: "Incomplete"}
        })

        // update chore in indexedDB
        idbPromise('chores', 'put', {...chore , status: "Incomplete"});
    }

    return (
        <>
        <h3>{state.currentChild.displayName}'s Points: {state.currentChild.pointBank}</h3>
        <h2 className='my-3'>{state.currentChild.displayName}'s Chores</h2>
        <div className='choresList d-flex flex-column align-items-center'>
            {state.chores.filter(chore => chore.status === "Incomplete").length > 0 &&
                <h3>Chores to Complete</h3>}
                {state.chores.filter(chore => chore.status === "Incomplete")
                .map(chore => {
                    return (
                        <div  className='choreCard' key={chore._id}> 
                        <ChoreCard chore={chore} />
                        <div className='btnGroup'>
                            <button type="button" onClick={() => {
                                return markComplete(chore);
                                }}>Mark as Complete
                            </button>
                        </div>
                        </div>
                    )
            })}

            {state.chores.filter(chore => chore.status === "Awaiting Approval").length > 0 &&
                <h3>Awaiting Approval</h3>}
                {state.chores.filter(chore => chore.status === "Awaiting Approval")
                .map(chore => {
                    return (
                        <div  className='choreCard'  key={chore._id}> 
                        <ChoreCard chore={chore} />
                        <div className='btnGroup'>
                            <button type="button" onClick={() => {
                                return redoChore(chore);
                            }}>Redo</button>
                        </div>
                        </div>
                    )
            })}

            {state.chores.filter(chore => chore.status === "Awaiting Payment").length > 0 &&
                <h3>Awaiting Payment</h3>
                }
                {state.chores.filter(chore => chore.status === "Awaiting Payment")
                .map(chore => {
                    return (
                        <div  className='choreCard'  key={chore._id}> 
                        <ChoreCard chore={chore} />
                        </div>
                    )
            })}
        </div>
        </>
    )
}

export default ChildHome;
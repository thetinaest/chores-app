import {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE} from '../utils/mutations';
import Auth from '../utils/auth';
import {useAppContext} from '../utils/GlobalState';
import {UPDATE_CHORES, LOAD_CHORES} from '../utils/actions';
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

    const {loading, error, data: childData} = useQuery(QUERY_CHILD, {
        variables: {_id: profile.data._id}
    })
    const chores = childData?.child.chores || [];

    // update state with current child and chores
    useEffect(() => {
        
        // if chores in query
        if (chores) {
            dispatch({
                type: LOAD_CHORES,
                chores
            })

            // add all chores to indexedDB
            chores.forEach(chore => {
                idbPromise('chores', 'put', chore);
            })
        }
      }, [loading])

    const markComplete = async (chore) => {
        // update chore in global state
        dispatch({
            type: UPDATE_CHORES,
            _id: chore._id,
            choreInfo: {
                complete: true,
            }
        })

        await updateChore({
            variables: { ...chore, complete: true}
        })

        // update chore in indexedDB
        idbPromise('chores', 'put', {... chore, complete: true});
    }

    const redoChore = async (chore) => {
        // update chore in global state
        dispatch({
            type: UPDATE_CHORES,
            _id: chore._id,
            choreInfo: {
                complete: false,
            }
        })
        
        await updateChore({
            variables: { ...chore, complete: false}
        })

        // update chore in indexedDB
        idbPromise('chores', 'put', {...chore , complete: false});
    }

    return (
        <>
        <h2 className='my-3'>{profile.data.displayName || profile.data.username}'s Chores</h2>
        <div className='choresList d-flex flex-column align-items-center'>
        {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && approve && !paid);
            }).length > 0 &&
            <h3>Awaiting Payment</h3>
            }
            {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && approve && !paid);
            })
            .map(chore => {
                return (
                    <div  className='choreCard'  key={chore._id}> 
                    <ChoreCard chore={chore} />
                    </div>
                )
            })}
            
            {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && !approve && !paid);
            }).length > 0 &&
            <h3>Awaiting Approval</h3>}
            {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && !approve && !paid);
            })
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

            {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (!complete && !approve && !paid);
            }).length > 0 &&
            <h3>Chores to Complete</h3>}
            {state.chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (!complete && !approve && !paid);
            })
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
        </div>
        </>
    )
}

export default ChildHome;
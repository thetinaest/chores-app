import {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE, DELETE_CHORE} from '../utils/mutations';
import {useAppContext} from '../utils/GlobalState';
import {SET_CURRENT_CHILD, UPDATE_CHORES, REMOVE_CHORE} from '../utils/actions';
import {idbPromise} from '../utils/helpers'

import ChoreCard from '../components/ChoreCard';

const ParentView = () => {
    // get childId from params
    const {childId} = useParams();
    const [state, dispatch] = useAppContext();

    // mutations
    const [updateChore] = useMutation(UPDATE_CHORE, {
        refetchQueries: [
            {query: QUERY_CHILD}, // DocumentNode object parsed with gql
            'child' // Query name
        ],
    });
    const [deleteChore] = useMutation(DELETE_CHORE, {
        refetchQueries: [
            {query: QUERY_CHILD}, // DocumentNode object parsed with gql
            'child' // Query name
        ],
    });

    // query child
    const {loading, error, data: childData} = useQuery(QUERY_CHILD, {
        variables: {_id: childId}
    })

    const chores = childData?.child.chores || [];
    const childName = childData?.child.displayName || childData?.child.username || [];

    // update state with current child and chores
    useEffect(() => {
        // if childName in query
        if (childName) {
          // update global state to contain children in query
          dispatch({
            type: SET_CURRENT_CHILD,
            currentChild: childName
          })
  
        }

        // if chores in query
        if (chores) {
            dispatch({
                type: UPDATE_CHORES,
                chores
            })

            // add all chores to indexedDB
            chores.forEach(chore => {
                idbPromise('chores', 'put', chore);
            })
        }
      }, [loading])


      const removeChore = async (_id) => {
        dispatch({
            type: REMOVE_CHORE,
            _id
        })

        await deleteChore({
            variables: {_id}
        })
      }

      const approveChore = async (_id) => {
        await updateChore({
            variables: { _id, approve: true}
        })
      }

      const reassignChore = async (_id) => {
        await updateChore({
            variables: { _id, complete: false}
        })
      }


    return (
        <>
        <Link to="/parent-home" className="navElement">Home</Link>
        <Link to="/add-chore" className="navElement">Add Chore</Link>
        <h2 className='my-3'>{childName}'s Chores</h2>
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
                        <div className='choreCard' key={chore._id}> 
                        <ChoreCard chore={chore} />
                        <div className='btnGroup'>
                            <button type="button" onClick={() => {
                                return removeChore(chore._id);
                            }}>Mark as Paid</button>
                            <button type="button" onClick={() => {
                                return removeChore(chore._id);
                            }}>Remove Chore</button>
                        </div>

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
                        <div className='choreCard' key={chore._id}> 
                        <ChoreCard chore={chore} />
                        <div className='btnGroup'>
                            <button type="button" onClick={() => {
                                return approveChore(chore._id);
                            }}>Approve Chore</button>
                            <button type="button" onClick={() => {
                                return reassignChore(chore._id);
                            }}>Reassign Chore</button>
                            <button type="button" onClick={() => {
                                return removeChore(chore._id);
                            }}>Remove Chore</button>
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
                        <div className='choreCard' key={chore._id}> 
                        <ChoreCard chore={chore} />
                        <div className='btnGroup'>
                            <button type="button" onClick={() => {
                                return removeChore(chore._id);
                            }}>Remove Chore</button>
                        </div>
                        </div>
                    )
                })}
        </div>

        </>
    )



}

export default ParentView;
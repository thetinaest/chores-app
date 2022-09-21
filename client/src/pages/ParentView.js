import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE, DELETE_CHORE, UPDATE_CHILD} from '../utils/mutations';
import {useAppContext} from '../utils/GlobalState';
import {SET_CURRENT_CHILD, UPDATE_CHORES, REMOVE_CHORE, LOAD_CHORES} from '../utils/actions';
import {idbPromise} from '../utils/helpers'

import ChoreCard from '../components/ChoreCard';
import PointModal from'../components/PointModal';

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

    const [updateChild] = useMutation(UPDATE_CHILD);

    // query child
    const {loading, error, data: childData} = useQuery(QUERY_CHILD, {
        variables: {_id: childId}
    })

    const chores = childData?.child.chores || [];
    const displayName = childData?.child.displayName || '';
    const username = childData?.child.username || '';
    const pointBank = childData?.child.pointBank || 0;

    // update state with current child and chores
    useEffect(() => {
        // if childName in query
        if (displayName) {
          // update global state to contain children in query
          dispatch({
            type: SET_CURRENT_CHILD,
            currentChild: {
                displayName, 
                _id: childId,
                username,
                pointBank
            }
          })
        }

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


      const removeChore = async ({_id}) => {
        // remove chore from global state
        dispatch({
            type: REMOVE_CHORE,
            _id
        })

        // remove chore from indexedDB
        idbPromise('chores', 'delete', {_id});

        await deleteChore({
            variables: {_id}
        })
      }

      const approveChore = async (chore) => {
        // update chore in global state
        dispatch({
            type: UPDATE_CHORES,
            _id: chore._id,
            choreInfo: {
                status: "Awaiting Payment",
            }
        })

        await updateChore({
            variables: { ...chore, status: "Awaiting Payment"}
        })

        // update chore in indexedDB
        idbPromise('chores', 'put', { ...chore, status: "Awaiting Payment"});

        // update child if chore had chore points
        if (chore.points) {
            // update child in global state
            dispatch({
                type: SET_CURRENT_CHILD,
                currentChild: {
                    ...state.currentChild,
                    pointBank: state.currentChild.pointBank + chore.points
                }
            })

            // update child in database
            updateChild({
                variables: {
                    _id: childId,
                    pointBank: state.currentChild.pointBank + chore.points
                }
            })
        }
        
      }

      const reassignChore = async (chore) => {
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
        idbPromise('chores', 'put', { ...chore, status: "Incomplete"});
      }


    return (
        <>
            <nav className="mb-3">
                <Link to="/parent-home" className="navElement">Home</Link>
                <Link to="/add-chore" className="navElement">Add Chore</Link>
                <Link to={`/child-profile/${state.currentChild._id}`} className="navElement">{state.currentChild.displayName}'s Profile</Link>
            </nav>

            <PointModal childId={childId}/>
            <h2 className='my-3'>{state.currentChild.displayName}'s Chores</h2>
            
            <div className='choresList d-flex flex-column align-items-center'>
                {state.chores.filter(chore => chore.status === "Awaiting Payment").length > 0 &&
                    <h3>Awaiting Payment</h3>
                    }
                    {state.chores.filter(chore => chore.status === "Awaiting Payment")
                    .map(chore => {
                        return (
                            <div className='choreCard' key={chore._id}> 
                            <ChoreCard chore={chore} />
                            <div className='btnGroup'>
                                <button type="button" onClick={() => {
                                    return removeChore(chore);
                                }}>Mark as Paid</button>
                                <button type="button" onClick={() => {
                                    return removeChore(chore);
                                }}>Remove Chore</button>
                            </div>

                            </div>
                        )
                    })}
                    
                    {state.chores.filter(chore => chore.status === "Awaiting Approval").length > 0 &&
                    <h3>Awaiting Approval</h3>}
                    {state.chores.filter(chore => chore.status === "Awaiting Approval")
                    .map(chore => {
                        return (
                            <div className='choreCard' key={chore._id}> 
                            <ChoreCard chore={chore} />
                            <div className='btnGroup'>
                                <button type="button" onClick={() => {
                                    return approveChore(chore);
                                }}>Approve Chore</button>
                                <button type="button" onClick={() => {
                                    return reassignChore(chore);
                                }}>Reassign Chore</button>
                                <button type="button" onClick={() => {
                                    return removeChore(chore);
                                }}>Remove Chore</button>
                            </div>
                            </div>
                        )
                    })}

                    {state.chores.filter(chore => chore.status === "Incomplete").length > 0 &&
                    <h3>Chores to Complete</h3>}
                    {state.chores.filter(chore => chore.status === "Incomplete")
                    .map(chore => {
                        return (
                            <div className='choreCard' key={chore._id}> 
                            <ChoreCard chore={chore} />
                            <div className='btnGroup'>
                                <button type="button" onClick={() => {
                                    return removeChore(chore);
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
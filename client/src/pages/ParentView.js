import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE, DELETE_CHORE} from '../utils/mutations';
import Auth from '../utils/auth';

import ChoreCard from '../components/ChoreCard';

const ParentView = () => {
    // get childId from params
    const {childId} = useParams();

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

      const removeChore = async (_id) => {
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
            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && approve && !paid);
            }).length > 0 &&
            <h3>Awaiting Payment</h3>
            }
            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && approve && !paid);
            })
            .map(chore => {
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <button type="button" onClick={() => {
                        return removeChore(chore._id);
                    }}>Mark as Paid</button>
                    <button type="button" onClick={() => {
                        return removeChore(chore._id);
                    }}>Remove Chore</button>
                    </div>
                )
            })}
            
            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && !approve && !paid);
            }).length > 0 &&
            <h3>Awaiting Approval</h3>}
            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && !approve && !paid);
            })
            .map(chore => {
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
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
                )
            })}

            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (!complete && !approve && !paid);
            }).length > 0 &&
            <h3>Chores to Complete</h3>}
            {chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (!complete && !approve && !paid);
            })
            .map(chore => {
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <button type="button" onClick={() => {
                        return removeChore(chore._id);
                    }}>Remove Chore</button>
                    </div>
                )
            })}
        </>
    )



}

export default ParentView;
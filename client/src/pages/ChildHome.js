import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import {UPDATE_CHORE} from '../utils/mutations';
import Auth from '../utils/auth';

import ChoreCard from '../components/ChoreCard';

const ChildHome = () => {

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

    const markComplete = async (_id) => {
        await updateChore({
            variables: { _id, complete: true}
        })
    }

    const redoChore = async (_id) => {
        await updateChore({
            variables: { _id, complete: false}
        })
    }

    return (
        <>
        <h2 className='my-3'>{profile.data.username}'s Chores</h2>
        <div className='choresList d-flex flex-column align-items-center'>
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
                    <div  className='choreCard'  key={chore._id}> 
                    <ChoreCard chore={chore} />
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
                    <div  className='choreCard'  key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <div className='btnGroup'>
                        <button type="button" onClick={() => {
                            return redoChore(chore._id);
                        }}>Redo</button>
                    </div>
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
                    <div  className='choreCard' key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <div className='btnGroup'>
                        <button type="button" onClick={() => {
                            return markComplete(chore._id);
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
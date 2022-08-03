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

    const markComplete = async () => {
        await updateChore({
            variables: { _id, complete: true}
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
                        return markComplete(chore._id);
                    }}>Mark as Complete</button>
                    </div>
                )
            })}
        </>
    )
}

export default ChildHome;
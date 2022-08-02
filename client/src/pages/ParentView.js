import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {QUERY_CHILD} from '../utils/queries';
import Auth from '../utils/auth';

import ChoreCard from '../components/ChoreCard';

const ParentView = () => {
    const [chores, setChores] = useState([]);
    const [completeChores, setCompleteChores] = useState([]);
    const [approveChores, setApproveChores] = useState([]);
    const [payChores, setPayChores] = useState([]);
    // get childId from params
    const {childId} = useParams();

    // query child
    const {loading, error, data: childData} = useQuery(QUERY_CHILD, {
        variables: {_id: childId}
    })
    
    useEffect( () => {
        if (!loading){
        //   console.log(childData);
            setChores(childData.child.chores);
        //   console.log(chores);

        
            setCompleteChores(chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (!complete && !approve && !paid)
            }))
            setApproveChores(chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && !approve && !paid)
            }))
            setPayChores(chores.filter(chore => {
                const {complete, approve, paid} = chore;
                return (complete && approve && !paid)
            }))
        }
      }, [loading, chores])

      const removeChore = () => {

      }

      const approveChore = () => {

      }

      const reassignChore = () => {

      }

      const payChore = () => {
        
      }


    return (
        <>
            {payChores.length > 0 &&
            <h3>Awaiting Payment</h3>
            }
            {payChores.map(chore => {
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <button type="button" onClick={payChore}>Mark as Paid</button>
                    <button type="button" onClick={removeChore}>Remove Chore</button>
                    </div>
                )
            })}
            
            {approveChores.length > 0 &&
            <h3>Awaiting Approval</h3>}
            {approveChores.map(chore => {
                
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <button type="button" onClick={approveChore}>Approve Chore</button>
                    <button type="button" onClick={reassignChore}>Reassign Chore</button>
                    <button type="button" onClick={removeChore}>Remove Chore</button>
                    </div>
                )
            })}

            {completeChores.length > 0 &&
            <h3>Chores to Complete</h3>}
            {completeChores.map(chore => {
                return (
                    <div key={chore._id}> 
                    <ChoreCard chore={chore} />
                    <button type="button" onClick={removeChore}>Remove Chore</button>
                    </div>
                )
            })}
        </>
    )



}

export default ParentView;
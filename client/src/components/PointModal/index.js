import {useEffect, useState} from 'react';
import {useAppContext} from '../../utils/GlobalState';
import {SET_CURRENT_CHILD} from '../../utils/actions';
import {UPDATE_CHILD} from '../../utils/mutations';
import './style.css';
import { useMutation } from '@apollo/client';

const PointModal = (props) => {
    const {childId} = props;

    const [state, dispatch] = useAppContext();
    const [chorePoints, setChorePoints] = useState(state.currentChild.pointBank);
    const [pointModal, setPointModal] = useState(false);

    //mutations
    const [updateChild] = useMutation(UPDATE_CHILD);

    // update local chore points state
    useEffect(() => {
        setChorePoints(state.currentChild.pointBank)
    }, [state.currentChild.pointBank])

    const updatePoints = (e) => {
        e.preventDefault();

        // cancel if no value exists
        if (!e.target.value) {
            return;
        }
        setChorePoints(Math.max(chorePoints + parseInt(e.target.value), 0));
    }

    const submitPoints = () => {
        // update child in global state
        dispatch({
            type: SET_CURRENT_CHILD,
            currentChild: {
                ...state.currentChild,
                pointBank: chorePoints
            }
        })

        // update child in database
        updateChild({
            variables: {
                _id: childId,
                pointBank: chorePoints
            }
        })
    }

    return (
        <div className="point-bank">
            {!pointModal && 
            <button
            className="point-button rounded-3"
            onClick={() => setPointModal(!pointModal)}
            >
                {state.currentChild.displayName}'s Points: {state.currentChild.pointBank}
            </button>
            }

            {pointModal && 
                <div className="point-modal rounded-3">
                    <h3>{state.currentChild.displayName}'s Points</h3>
                    <button 
                    type="button" 
                    className="btn-close close-point-modal-btn" 
                    aria-label="Close" 
                    onClick={() => {
                        submitPoints();
                        setPointModal(!pointModal);
                    }}
                    ></button>

                    <form 
                    className="d-flex flex-column align-items-center pb-3"
                    onClick={updatePoints}
                    >
                        <div className="point-buttons">
                            <button value="1" className="rounded-left">+1</button>
                            <button value="10">+10</button>
                            <button value= "50">+50</button>
                        </div>
                        <div className="point-display">{chorePoints}</div>
                        <div className="point-buttons">
                            <button value="-1">-1</button>
                            <button value="-10">-10</button>
                            <button value="-50">-50</button>
                        </div>
                    </form>
                </div>
            }
            
        </div>
    )
}

export default PointModal;
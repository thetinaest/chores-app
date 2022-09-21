import './style.css';

const ChoreCard = (props) => {
    const {chore} = props;
    const {name, description, createdAt, allowance, points} = chore;

    return (
        <>
        <p className='chore-date'>{createdAt.split('at')[0]}</p>

        <div className="chore-data">
            {allowance && <p className='allowance'>${allowance}</p>}
            {points > 0 && <p className='chore-points'>{points} Point{points !== 1 && 's'}</p>}
        </div>
        
        <div>
            <h4>{name}</h4>
            <p>{description}</p>
            
        </div>
        </>
        
    )
}

export default ChoreCard;
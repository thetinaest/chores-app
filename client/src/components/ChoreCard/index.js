import './style.css';

const ChoreCard = (props) => {
    const {chore} = props;
    const {name, description, createdAt} = chore;

    return (
        <>
        <p className ='chore-date'>{createdAt.split('at')[0]}</p>
        <div>
            <h4>{name}</h4>
            <p>{description}</p>
            
        </div>
        </>
        
    )
}

export default ChoreCard;
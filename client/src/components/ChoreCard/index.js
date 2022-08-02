const ChoreCard = (props) => {
    const {chore} = props;
    const {name, description} = chore;

    return (
        <div>
            <h4>{name}</h4>
            <p>{description}</p>
        </div>
    )
}

export default ChoreCard;
const ChoreCard = (props) => {
    const {name, description} = props;

    return (
        <div>
            <h4>{name}</h4>
            <p>{description}</p>
        </div>
    )
}

export default ChoreCard;
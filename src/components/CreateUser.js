export const CreateUser = ({props}) => {
    return (
        <div className="user_container">{props.map((user, index) => (
            <div key={user.id} className="user_item">
                <p>{index + 1} {user.name}</p>
                <p>{user.company.name}</p>
                <a href='#'>{user.website}</a>
            </div>) 
            )}
        </div>    
    )
}

export default CreateUser
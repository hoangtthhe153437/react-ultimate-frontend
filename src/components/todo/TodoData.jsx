
const TodoData = (props) => {

    const { todoList, removeTodo } = props;

    const handleOnClick = (id) => {
        removeTodo(id);
    }

    console.log(">>> Check props", props);
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>

                        <button onClick={() => handleOnClick(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData; 
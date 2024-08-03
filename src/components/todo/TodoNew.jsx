import { useState } from "react";

const TodoNew = (props) => {

    // useState hook
    // const varlueInput = "";
    const [valueInput, setValueInput] = useState("eric");
    const { addNewTodo } = props;

    // addNewTodo("Eric");

    const handlerClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handlerOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className='todo-new'>
            <input type="text"
                value={valueInput}
                onChange={(event) => handlerOnChange(event.target.value)}
            />
            <button style={{ cursor: "pointer" }}
                onClick={handlerClick}
            >Add</button>
        </div>
    )
}

export default TodoNew;
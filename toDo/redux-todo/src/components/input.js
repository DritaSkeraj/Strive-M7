import React, {useState} from 'react';
import './input.css'

const Input = (props) => {

    const [input, setInput] = useState('')

    const addTodo = () => {

    }

    return (
        <div className='input'>
            <input type='text' 
            value={input} 
            onChange={e => setInput(e.target.value)}/>
            <button onClick={addTodo}>Add: </button>
        </div>
    );
}

export default Input;
import React from 'react'
import plusSvg from '../../assets/img/plus.svg'
import axios from 'axios';

function AddTasksForm({list, onAddTask}) {
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }
    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks', obj)
        .then(({data}) => {
            onAddTask(list.id, data)
            toggleFormVisible()
        })
        .catch(e => {
          alert('Не удалось добавить задачу')
        })
        
        .finally(() => {
            setIsLoading(false);
        })

    }
    return (
      <div className="tasks__form">
        {!visibleForm ? (
          <div onClick={toggleFormVisible} className="tasks__form-new">
            <img src={plusSvg} alt="Plus icon" />
            <span>Новая задача</span>
          </div>
        ) : (
          <div className="tasks__form-block">
            <input
            value={inputValue}
              className="fiel"
              type="text"
              placeholder="Текст задачи"
              onChange={event => setInputValue(event.target.value)}
            ></input>
            <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
          </div>
        )}
      </div>
    );
}

export default AddTasksForm

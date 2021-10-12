import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './tasks.scss'
import penSvg from '../../assets/img/pen.svg';
import AddTasksForm from './AddTasksForm';
import Task from './Task';


const Tasks = ({
  list, 
  onEditTitle, 
  onAddTask,
  onRemoveTask, 
  onEditTask,
  onCompleteTask,
  withoutEmpty 
}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Введите название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios
            .patch('hhttp://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
            .catch(() => {
                alert('Не удалось обновить назване списка')
            })
        }
    }

    
    return (
      <div className="tasks">
        <Link to={`/lists/${list.id}`}>
          <h2 style={{ color: list.color.hex }} className="tasks__title">
            {list.name}
            <img onClick={editTitle} src={penSvg} alt="Pen icon" />
          </h2>
        </Link>

        <div className="tasks__items">
          {!withoutEmpty && list.tasks && !list.tasks.length && (
            <h2>Задачи отсутствуют</h2>
          )}
          {list.tasks &&
            list.tasks.map((task) => (
              <Task
                key={task.id}
                list={list}
                onRemove={onRemoveTask}
                onEdit={onEditTask}
                onComplete={onCompleteTask}
                {...task}
              />
            ))}
          <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
        </div>
      </div>
    );
}

export default Tasks;

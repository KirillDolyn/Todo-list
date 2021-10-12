import React from 'react';
import List from '../List';
import './AddList.scss'
import Badge from '../Badge'
import closeSvg from '../../assets/img/Close.svg'
import axios from 'axios';

const AddList = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false)
  const [selectColor, setSelectColor] = React.useState(3)
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    if (Array.isArray(colors)) {
    setSelectColor(colors[0].id)
    }
  }, [colors])
  
  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectColor(colors[0].id)
  }
  const addList = () => {
    if (!inputValue) {
      alert('введите название')
      return;
    }
    setIsLoading(true)
    axios
    .post('http://localhost:3001/lists', {name: inputValue, colorId: selectColor})
    .then(({data}) => {
    const color = colors.filter(c => c.id === selectColor)[0];
      const listObj = {...data, color, tasks: []}
      onAdd(listObj)
      onClose()
    })
    .catch(() => {
      alert('Не удалось добавить задачу')
    })
    .finally(() => {
      setIsLoading(false)
    })
    
  }
    return (
      <div className="add-list">
        <List
          onClick={() => setVisiblePopup(true)}
          items={[
            {
              className: "list__add-button",
              icon: (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 1V11"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 6H11"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              name: "Добавить список",
            },
          ]}
        />

        {visiblePopup && (
          <div className="add-list__popup">
            <img
              onClick={onClose}
              src={closeSvg}
              alt="Close button"
              className="add-list__popup-close-btn"
            />
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="fiel"
              type="text"
              placeholder="Название папки"
            />
            <div className="add-list__popup-colors">
              {colors.map((color) => (
                <Badge
                  onClick={() => setSelectColor(color.id)}
                  key={color.id}
                  color={color.name}
                  className={selectColor === color.id && "active"}
                />
              ))}
            </div>
            <button onClick={addList} className="button">
              {isLoading ? "Добавление" : "Добавить"}
            </button>
          </div>
        )}
      </div>
    );
}
export default AddList;
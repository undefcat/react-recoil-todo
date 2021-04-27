import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { todos } from '../../state/todos'

function Todo(props) {
  const todo = props.todo
  const { id } = todo
  const [editing, setEditing] = useState(false)

  const setTodos = useSetRecoilState(todos)

  const handleOnChange = e => {
    const { checked } = e.target

    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, done: checked }
        : todo
    }))
  }

  const handleOnDoubleClick = () => {
    setEditing(true)
  }

  const handleOnBlur = () => {
    setEditing(false)
  }

  const handleOnInput = e => {
    const { value } = e.target

    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, text: value }
        : todo
    }))
  }

  const handleOnKeyDown = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    setEditing(false)
  }

  const handleOnDestroy = () => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const classNames = []
  if (editing) {
    classNames.push('editing')
  }

  if (todo.done) {
    classNames.push('completed')
  }

  return (
    <li className={classNames.join(' ')}>
      <div className="view">
        <input
          checked={todo.done}
          className="toggle"
          onChange={handleOnChange}
          type="checkbox"
          value={todo.done}
        />
        <label onDoubleClick={handleOnDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleOnDestroy}/>
      </div>
      <input
        className="edit"
        onBlur={handleOnBlur}
        onInput={handleOnInput}
        onKeyDown={handleOnKeyDown}
        value={todo.text}
      />
    </li>
  )
}

export default Todo

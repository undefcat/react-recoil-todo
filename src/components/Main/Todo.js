import { useState, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { todos } from '../../state/todos'

function Todo(props) {
  const { id, done, text } = props.todo
  const setTodos = useSetRecoilState(todos)

  const toggleTodo = checked => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, done: checked, }
        : todo
    }))
  }

  const handleToggle = e => {
    const { checked } = e.target

    toggleTodo(checked)
  }

  const handleDestroy = () => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const [isEditing, setEditing] = useState(false)
  const [input, setInput] = useState(text)
  const editInputEl = useRef(null)

  useEffect(() => {
    if (isEditing) {
      editInputEl.current.focus()
    }

  }, [isEditing])

  const handleEditTextDbClick = () => {
    setEditing(true)
  }

  const handleEditTextInput = e => {
    setInput(e.target.value)
  }

  const editTodo = () => {
    const value = input.trim()

    if (value === '') {
      setInput('')
      return
    }

    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? { ...todo, text: value }
        : todo
    }))

    setEditing(false)
  }

  const handleEditTextEnter = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    editTodo()
  }

  const classNames = []
  if (isEditing) {
    classNames.push('editing')
  }

  if (done) {
    classNames.push('completed')
  }

  const className = classNames.join(' ')

  return (
    <li className={ className }>
      <div className="view">
        <input className="toggle" type="checkbox" checked={ done } onChange={ handleToggle } />
        <label onDoubleClick={ handleEditTextDbClick }>{ text }</label>
        <button className="destroy" onClick={ handleDestroy }/>
      </div>
      <input
        className="edit"
        value={ input }
        onInput={ handleEditTextInput }
        onKeyDown={ handleEditTextEnter }
        ref={ editInputEl }
      />
    </li>
  )
}

export default Todo

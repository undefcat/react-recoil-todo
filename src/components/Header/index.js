import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { createTodo, todos } from '../../state/todos'

function Header() {
  const [value, setValue] = useState('')

  const handleInput = e => {
    setValue(e.target.value)
  }

  const setTodos = useSetRecoilState(todos)

  const handleAddTodo = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    const text = value.trim()

    if (text === '') {
      setValue('')
      return
    }

    setValue('')
    setTodos(todos => [
      ...todos,
      createTodo(text),
    ])
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" value={ value } onInput={ handleInput } onKeyDown={ handleAddTodo }/>
    </header>
  )
}

export default Header

import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { createTodo, todos } from '../../state/todos'

function Header() {
  const [text, setText] = useState('')
  const addTodo = useSetRecoilState(todos)

  const handleOnInput = e => {
    const { value } = e.target

    setText(value)
  }

  const handleOnKeyDown = e => {
    if (!(e.key === 'Enter' || e.keyCode === 13)) {
      return
    }

    const value = text.trim()
    if (value === '') {
      return
    }

    setText('')
    addTodo(todos => [
      ...todos,
      createTodo(value),
    ])
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        autoFocus
        className="new-todo"
        onInput={handleOnInput}
        onKeyDown={handleOnKeyDown}
        placeholder="What needs to be done?"
        value={text}
      />
    </header>
  )
}

export default Header

import { useRecoilValue, useRecoilState } from 'recoil'
import Todo from './Todo'
import { todos, filterTodos } from '../../state/todos'

function Main() {
  const [items, setItems] = useRecoilState(todos)
  const isToggleAll = items.every(todo => todo.done)

  const handleOnChange = e => {
    const { checked } = e.target

    setItems(todos => todos.map(todo => {
      return {
        ...todo,
        done: checked,
      }
    }))
  }

  const Todos = useRecoilValue(filterTodos)
    .map(todo => <Todo key={todo.id} todo={todo} />)

  return (
    <section className="main">
      <input
        checked={isToggleAll}
        className="toggle-all"
        id="toggle-all"
        onChange={handleOnChange}
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        { Todos }
      </ul>
    </section>
  )
}

export default Main

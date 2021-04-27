import { useRecoilState } from 'recoil'
import { filterType, todos } from '../../state/todos'

function Footer() {
  const [items, setItems] = useRecoilState(todos)
  const count = items.filter(todo => !todo.done).length
  const [type, setType] = useRecoilState(filterType)

  const handleOnClick = () => setItems(todos => todos.filter(todo => !todo.done))

  return (
    <footer className="footer">
      <span className="todo-count"><strong>{ count }</strong> item left</span>
      <ul className="filters">
        <li>
          <a className={ type === 'all' ? 'selected' : '' } href="#/" onClick={() => setType('all')}>All</a>
        </li>
        <li>
          <a className={ type === 'do' ? 'selected' : '' }  href="#/active" onClick={() => setType('do')}>Active</a>
        </li>
        <li>
          <a className={ type === 'done' ? 'selected' : '' }  href="#/completed" onClick={() => setType('done')}>Completed</a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleOnClick}>Clear completed</button>
    </footer>
  )
}

export default Footer

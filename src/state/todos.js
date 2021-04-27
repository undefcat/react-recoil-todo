import { atom, selector } from 'recoil'

let uniqId = 0

export const createTodo = text => ({
  id: ++uniqId,
  text,
  done: false,
})

export const todos = atom({
  key: 'todos',
  default: [],
})

export const filterType = atom({
  key: 'filterType',
  default: 'all',
})

export const filterTodos = selector({
  key: 'filterTodos',
  get: ({ get }) => {
    const items = get(todos)
    const type = get(filterType)

    switch (type) {
      case 'do':
        return items.filter(todo => !todo.done)

      case 'done':
        return items.filter(todo => todo.done)

      default:
        return items
    }
  }
})

export type Todo = {
  id: number
  userId: number
  completed: boolean
  title: string
}
export const API_URL = 'https://jsonplaceholder.typicode.com/todos'
export const getTodos = (): Promise<Todo[]> => fetch(API_URL).then((r) => r.json())

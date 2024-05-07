import { observer } from "mobx-react";
import TodoViewModel from "../viewModels/TodoViewModel";

const TodoList = observer(() => {
  const handleChange = (e) => {
    TodoViewModel.setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    TodoViewModel.addTodo();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={TodoViewModel.newTodo} onChange={handleChange} />
        <button type='submit'>Add Todo</button>
      </form>
      <ul>
        {TodoViewModel.todos.map((todo, index) => (
          <li key={index}>{todo.title}</li>
        ))}
      </ul>
      <p>Remaining: {TodoViewModel.remaining}</p>
    </div>
  );
});

export default TodoList;

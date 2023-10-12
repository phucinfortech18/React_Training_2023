import { FormEvent, useState } from "react";
import "./App.css";
import { TTodo } from "./types/todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState<TTodo[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTodo: TTodo = {
      id: uuidv4(),
      name,
      finished: false,
      createdAt: new Date(),
    };
    setTodoList([...todoList, newTodo]);
  };

  const handleDelete = (id: TTodo["id"]) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  console.log(todoList);

  return (
    <>
      <div className="w-[600px] mx-auto bg-gray-200 p-16 flex flex-col items-center space-y-8">
        <div>
          <form
            action=""
            className="w-[500px] bg-white p-8"
            onSubmit={handleSubmit}
          >
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Name: </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="w-full input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button className="mt-2 btn-primary btn btn-sm">Submit</button>
          </form>
        </div>

        {/* start: todo list */}
        <div className="w-full mt-8 space-y-4 bg-white">
          {todoList.map((todo) => (
            <div className="flex w-full px-8 py-2 bg-red-50" key={todo.id}>
              <div className="flex-1">{todo.name}</div>
              <div className="w-[160px] flex items-center justify-between">
                <button
                  className="btn btn-sm btn-outline btn-secondary"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
                <button className="btn btn-sm btn-outline btn-accent">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* end: todo list */}
      </div>
    </>
  );
}

export default App;

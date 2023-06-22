
import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([])
  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }
  function toggleTaskCompleted(id) {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ?
      { ...task, completed: !task.completed } : task))
  }
  function clearList() {
    setTasks([])
  }
  return (
    <>

      <div className="container">
        <Header />
        <Form tasks={tasks} setTasks={setTasks} />
        <TodoList tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskCompleted={toggleTaskCompleted}
          clearList={clearList} />


      </div>
    </>
  )
}

function Header() {
  return (
    <h1>Todo list</h1>
  )
}
function Form({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
    setInputValue("")

  }
  function handleChange(e) {
    setInputValue(e.target.value)
  }

  return (

    <form onSubmit={handleSubmit}>

      <input type="text"
        placeholder='Add your task'
        value={inputValue}
        onChange={handleChange} />
      <button className='add-todo'>Add</button>
    </form>


  )
}
function TodoList({ tasks, deleteTask, toggleTaskCompleted, clearList }) {
  const [sortedList, setSortedList] = useState('input')
  let sortedTasks;
  if (sortedList === 'input') sortedTasks = tasks
  if (sortedList === 'description') sortedTasks = tasks.slice()
    .sort((a, b) => a.text.localeCompare(b.text))
  if (sortedList === 'completed') sortedTasks = tasks.slice()
    .sort((a, b) => Number(a.completed) - Number(b.completed))
  return (
    <>
      <ul className='the-list'>
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <label>
              <input type="checkbox"
                className='checkbox-input'
                checked={task.completed}
                onChange={() => toggleTaskCompleted(task.id)}
              />
              <span className={`checkbox-custom ${task.completed ? 'checked' : ''}`}></span>
            </label>
            {task.text}
            <button className='remove-todo'
              onClick={() => deleteTask(task.id)}>&times;</button>
          </li>
        ))
        }
      </ul>
      <div className='footer'>
        <select className='select'
          value={sortedList}
          onChange={e => setSortedList(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="completed">Sort by completed</option>
        </select>
        <button className='clear-list' onClick={clearList}>Clear list</button>
      </div>
    </>


  )

}



export default App;

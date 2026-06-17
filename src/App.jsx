import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  // タスクを追加する
  const addTask = () => {
    if (inputValue.trim() === '') return
    setTasks([
      ...tasks,
      { id: Date.now(), text: inputValue.trim(), completed: false },
    ])
    setInputValue('')
  }

  // Enterキーでもタスクを追加できるようにする
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  // 完了・未完了を切り替える
  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // タスクを削除する
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container">
      <h1 className="title">タスクボード</h1>

      {/* タスク入力エリア */}
      <div className="input-area">
        <input
          type="text"
          className="task-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力してEnterまたは追加ボタンで登録"
        />
        <button className="add-btn" onClick={addTask}>
          追加
        </button>
      </div>

      {/* タスクリスト */}
      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty-message">タスクがありません</li>
        )}
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="タスクを削除"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {/* タスク件数の表示 */}
      {tasks.length > 0 && (
        <p className="task-count">
          {tasks.filter((t) => t.completed).length} / {tasks.length} 件完了
        </p>
      )}
    </div>
  )
}

export default App

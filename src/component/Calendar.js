// Calendar.js (Firebase 연동 + UI 업그레이드 완료)

import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import './Calendar.css';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [todoContent, setTodoContent] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [todos, setTodos] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const today = String(date.getDate()).padStart(2, '0');

  const firday = new Date(`${year}-${month}-01`).getDay();
  const last = new Date(year, month, 0);
  const last_day = last.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);
    const loadedTodos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTodos(loadedTodos);
  };

  const getMarkedDates = () => {
    return todos
      .filter(todo => todo.date.startsWith(`${year}-${month}`))
      .map(todo => todo.date.substring(8));
  };

  const dateOfMonth = () => {
    let count = 1;
    let days = [];
    let flag = false;
    for (let i = 0; i < 6; i++) {
      let weekRow = [];
      for (let j = 0; j < 7; j++) {
        if (count > last_day) break;
        if (i === 0 && j >= firday) flag = true;
        weekRow.push(flag ? count++ : '');
      }
      days.push(weekRow);
    }
    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dayStr = String(date).padStart(2, '0');
    const fullDate = `${year}-${month}-${dayStr}`;
    const selectedTodos = todos.filter(todo => todo.date === fullDate);
    setTodoContent(selectedTodos);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '' || !selectedDate) return;
    const dayStr = String(selectedDate).padStart(2, '0');
    const todoObj = {
      uid: user.uid,
      content: newTodo,
      date: `${year}-${month}-${dayStr}`
    };
    const docRef = await addDoc(collection(db, 'todos'), todoObj);
    setTodos(prev => [...prev, { ...todoObj, id: docRef.id }]);
    setNewTodo('');
    setShowInput(false);
    setSelectedDate(Number(dayStr));
    handleDateClick(Number(dayStr));
  };

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    const updated = todos.filter(todo => todo.id !== id);
    setTodos(updated);
    const dayStr = String(selectedDate).padStart(2, '0');
    setTodoContent(updated.filter(todo => todo.date === `${year}-${month}-${dayStr}`));
  };

  const days = dateOfMonth();
  const markedDatesList = getMarkedDates();

  return (
    <div className="calendar-wrapper">
      <h2>{month}월</h2>
      <table>
        <thead>
          <tr>
            {week.map((d, i) => <th key={i}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {days.map((week, i) => (
            <tr key={i}>
              {week.map((d, j) => (
                <td
                  key={j}
                  className={`calendar-cell ${selectedDate === d ? 'selected' : ''}`}
                  onClick={() => d && handleDateClick(d)}
                >
                  {d}
                  {markedDatesList.includes(String(d).padStart(2, '0')) && <span className="marked-dot">●</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDate && (
        <div className="todo-section">
          <h3>{month}/{selectedDate} 할 일</h3>
          <ul>
            {todoContent.length === 0 ? <li>할 일이 없습니다.</li> : (
              todoContent.map(todo => (
                <li key={todo.id}>
                  {todo.content}
                  <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
                </li>
              ))
            )}
          </ul>
          <div className="todo-buttons-container">
            <button onClick={() => setShowInput(!showInput)}>
              {showInput ? '입력 취소' : '할 일 추가'}
            </button>
            {showInput && (
              <>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="할 일을 입력하세요"
                />
                <button onClick={handleAddTodo}>추가</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

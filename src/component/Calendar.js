import { useState, useEffect } from 'react';
import '../component/Calendar.css'
import '../component/Reset.css';

export default function CalendarTest() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todoContent, setTodoContent] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [todos, setTodos] = useState([]);

  const format = (num) => (num < 10 ? '0' + num : '' + num);

  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const firday = new Date(`${currentYear}-${format(currentMonth)}-01`).getDay();
  const last = new Date(currentYear, currentMonth, 0);
  const last_day = last.getDate();

  const getMarkedDates = () => {
    return todos
      .filter(todo => todo.now_date.startsWith(`${currentYear}-${format(currentMonth)}`))
      .map(todo => todo.now_date.substring(8)); 
  };

  useEffect(() => {
    setMarkedDates(getMarkedDates());
  }, [todos, currentYear, currentMonth]);

  const dateOfMnth = () => {
    let count = 1;
    let days = [];
    let flag = false;

    for (let i = 0; i < 6; i++) {
      let weekRow = [];
      for (let j = 0; j < 7; j++) {
        if (count > last_day) break;
        if (i === 0 && j >= firday) flag = true;
        if (flag) {
          weekRow.push(count);
          count += 1;
        } else {
          weekRow.push(' ');
        }
      }
      days.push(weekRow);
    }
    return days;
  };

  const days = dateOfMnth();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const fullDate = `${currentYear}-${format(currentMonth)}-${format(date)}`;
    const selectedTodos = todos.filter(todo => todo.now_date === fullDate);
    setTodoContent(selectedTodos.map(todo => todo.content));
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const date = selectedDate || today.getDate();
    const fullDate = `${currentYear}-${format(currentMonth)}-${format(date)}`;

    const newTodoObj = {
      id: todos.length + 1,
      content: newTodo,
      now_date: fullDate
    };

    const updatedTodos = [...todos, newTodoObj];
    setTodos(updatedTodos);
    setNewTodo('');
    setShowInput(false);

    const selectedTodos = updatedTodos.filter(todo => todo.now_date === fullDate);
    setTodoContent(selectedTodos.map(todo => todo.content));
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);

    const selectedTodos = updatedTodos.filter(todo =>
      todo.now_date === `${currentYear}-${format(currentMonth)}-${format(selectedDate)}`
    );
    setTodoContent(selectedTodos.map(todo => todo.content));
  };

  return (
    <div>
      {/* 달 이동 헤더 */}
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h2>{currentYear}년 {currentMonth}월</h2>
        <button onClick={handleNextMonth}>→</button>
      </div>

      {/* 캘린더 */}
      <table>
        <thead>
          <tr>
            {week.map((day, idx) => (
              <th key={idx}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((week, idx) => (
            <tr key={idx}>
              {week.map((d, subIdx) => {
                const isMarked = typeof d === 'number' && markedDates.includes(format(d));
                return (
                  <td
                    key={subIdx}
                    onClick={() => d !== ' ' && handleDateClick(d)}
                    className={`calendar-cell ${selectedDate === d ? 'selected' : ''}`}
                  >
                    {d}
                    {isMarked && (
                      <span className="marked-dot">●</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 선택된 날짜의 할 일 목록 */}
      <div>
        <ul>
          {todoContent.length === 0 ? (
            <li>.</li>
          ) : (
            todoContent.map((content, idx) => (
              <li key={idx} className="todo-item">
                <span>{content}</span>
                <button onClick={() => handleDeleteTodo(todos.find(todo => todo.content === content).id)}>X</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* 할 일 추가 */}
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
              placeholder="새 할 일을 입력하세요"
            />
            <button onClick={handleAddTodo}>할 일 추가</button>
          </>
        )}
      </div>
    </div>
  );
}

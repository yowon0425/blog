import { useState } from 'react';
import './Calendar.css';

export default function CalendarTest() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  let firday = new Date(year + '-' + month + '-01').getDay(); // 첫날 요일
  let last = new Date(year, month, 0);    // 마지막일 28, 29, 30, 31
  let last_day = last.getDate();

  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const [selectedDate, setSelectedDate] = useState(null);
  const [todoContent, setTodoContent] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [newTodo, setNewTodo] = useState(''); // 사용자 입력을 저장할 상태
  const [showInput, setShowInput] = useState(false); // 입력창 표시 여부

  // todos 배열은 빈 배열로 초기화
  const [todos, setTodos] = useState([]);

  const getMarkedDates = () => {
    return todos
      .filter(todo => todo.now_date.startsWith(`${year}-${month}`))
      .map(todo => todo.now_date.substring(8));
  };

  const dateOfMnth = () => {
    let count = 1;
    let days = [];
    let flag = false;

    for (let i = 0; i < 6; i++) {
      let weekRow = [];
      for (let j = 0; j < 7; j++) {
        if (count > last_day) {
          break;
        }
        if (i === 0 && j >= firday) {
          flag = true;
        }
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
  const markedDatesList = getMarkedDates();

  const handleDateClick = (date) => {
    setSelectedDate(date);

    // 해당 날짜에 맞는 todos 배열의 content 찾기
    const selectedTodos = todos.filter(todo => todo.now_date === `${year}-${month}-${String(date).padStart(2, '0')}`);
    setTodoContent(selectedTodos.map(todo => todo.content));  // 해당 날짜의 todo 내용만 가져옴
  };

  // 할 일 추가 함수
  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return; // 입력이 비어있으면 추가하지 않음
    }

    const newTodoObj = {
      id: todos.length + 1,
      content: newTodo,
      now_date: `${year}-${month}-${day}` // 현재 날짜를 할 일 날짜로 설정
    };

    // 새로운 할 일을 todos 배열에 추가
    const updatedTodos = [...todos, newTodoObj];
    setTodos(updatedTodos);

    // markedDates 업데이트
    const updatedMarkedDates = getMarkedDates();
    setMarkedDates(updatedMarkedDates);

    // 입력 필드 비우기
    setNewTodo('');
    setShowInput(false); // 입력창 닫기
  };

  // 할 일 삭제 함수
  const handleDeleteTodo = (todoId) => {
    // 해당 id를 제외한 새로운 배열 생성
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);

    // markedDates 업데이트
    const updatedMarkedDates = getMarkedDates();
    setMarkedDates(updatedMarkedDates);

    // 선택된 날짜에 해당하는 할 일도 새롭게 업데이트
    const selectedTodos = updatedTodos.filter(todo => todo.now_date === `${year}-${month}-${String(selectedDate).padStart(2, '0')}`);
    setTodoContent(selectedTodos.map(todo => todo.content));
  };

  return (
    <>
      <div>
        <h2>{month}월</h2>
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
                {week.map((d, subIdx) => (
                  <td
                    key={subIdx}
                    onClick={() => d !== ' ' && handleDateClick(d)}
                    className={`calendar-cell ${selectedDate === d ? 'selected' : ''}`}
                  >
                    {d}
                    {markedDatesList.includes(String(d).padStart(2, '0')) && (
                      <span className="marked-dot">●</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 클릭한 날짜의 할 일 목록 */}
        <div>
          <ul>
            {todoContent.length === 0 ? (
              <li>.</li>
            ) : (
              todoContent.map((content, idx) => (
                <li key={idx}>
                  {content}
                  <button onClick={() => handleDeleteTodo(todos.find(todo => todo.content === content).id)}>삭제</button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* 할 일 추가 버튼 및 입력 취소 버튼 */}
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
    </>
  );
}

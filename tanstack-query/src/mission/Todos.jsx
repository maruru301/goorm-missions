import './Todos.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import { useState } from 'react';

const BASE_URL = 'http://localhost:4000/todos';

const Todos = () => {
    const queryClient = useQueryClient();

    const [todo, setTodo] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const fetchTodos = async () => {
        const res = await axios.get(BASE_URL);
        return res.data;
    };

    const {
        data: todosData,
        isPending,
        isError,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        select: (todos) => {
            const completed = todos.filter((todo) => todo.completed);
            const pending = todos.filter((todo) => !todo.completed);

            return { all: [...pending, ...completed], completed, pending };
        },
    });

    const addTodo = async (newTodo) => {
        const res = await axios.post(BASE_URL, newTodo);
        return res.data;
    };

    const { mutate: addMutate } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']); // refetching
            setTodo('');
        },
    });

    const toggleTodo = async (todo) => {
        const res = await axios.patch(`${BASE_URL}/${todo.id}`, {
            completed: !todo.completed,
        });

        return res.data;
    };

    const { mutate: toggleMutate } = useMutation({
        mutationFn: toggleTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
        },
    });

    const deleteTodo = async (todo) => {
        await axios.delete(`${BASE_URL}/${todo.id}`);
    };

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']);
        },
    });

    if (isPending) return <div>로딩중...</div>;
    if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

    const todosMap = {
        all: todosData.all,
        pending: todosData.pending,
        completed: todosData.completed,
    };

    return (
        <div className="todos">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addMutate({ title: todo, completed: false });
                }}
            >
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" />
                <button>추가</button>
            </form>

            <div className="tab">
                <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>
                    전체 ({todosMap.all.length})
                </button>
                <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
                    할 일 ({todosMap.pending.length})
                </button>
                <button className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>
                    완료 ({todosMap.completed.length})
                </button>
            </div>

            <ul className="todo-list-container">
                {todosMap[activeTab].map((todo) => (
                    <div key={todo.id} className="todo-list">
                        <li onClick={() => toggleMutate(todo)} className="todo-item">
                            <span className={`todo-title ${todo.completed ? 'completed' : 'in-progress'}`}>
                                {todo.title}
                            </span>
                            <span className={`completed-badge ${todo.completed ? 'completed' : 'in-progress'}`}>
                                {todo.completed ? '완료' : '진행중'}
                            </span>
                        </li>

                        <button onClick={() => deleteMutate(todo)}>삭제</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Todos;

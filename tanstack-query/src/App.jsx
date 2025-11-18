import './App.css';

import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import { useState } from 'react';

const BASE_URL = 'http://localhost:4000/todos';

function App() {
    const [todo, setTodo] = useState('');
    const queryClient = useQueryClient();

    const fetchTodos = async () => {
        const res = await axios.get(BASE_URL);
        return res.data;
    };

    const {
        data: todos,
        isPending,
        isError,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const addTodo = async (newTodo) => {
        const res = await axios.post(BASE_URL, newTodo);
        return res.data;
    };

    const { mutate } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']); // refetching
            setTodo('');
        },
    });

    if (isPending) return <div>로딩중...</div>;
    if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate({ title: todo, completed: false });
                }}
            >
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" />
                <button>추가</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

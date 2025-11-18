import './App.css';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:4000/todos';

function App() {
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

    if (isPending) return <div>로딩중...</div>;
    if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

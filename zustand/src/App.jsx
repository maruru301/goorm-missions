import './App.css';

import useAuthStore from './zustand/authStore';
import { useState } from 'react';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { userEmail, isLogin, login, logout } = useAuthStore();

    const handleLogin = () => {
        login({ email, password });
    };

    return (
        <div>
            {isLogin ? (
                <div>
                    <p>{userEmail}님 환영합니다!</p>
                    <button onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <div>
                    <h2>로그인</h2>

                    <div>
                        <input
                            type="email"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button onClick={handleLogin}>로그인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

import './App.css';

import useAuthStore from './zustand/authStore';

function App() {
    const { userEmail, isLogin, login, logout } = useAuthStore();

    const handleLogin = () => {
        login({ email: 'yoon@gmail.com', password: '1234' });
    };

    return (
        <div>
            {isLogin ? (
                <div>
                    <p>{userEmail} 계정으로 로그인됨</p>
                    <button onClick={logout}>로그아웃</button>
                </div>
            ) : (
                <div>
                    <p>로그인 해주세요</p>
                    <button onClick={handleLogin}>로그인</button>
                </div>
            )}
        </div>
    );
}

export default App;

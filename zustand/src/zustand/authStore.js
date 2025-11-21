import { create } from 'zustand';

const useAuthStore = create((set) => ({
    userEmail: null, // 로그인한 사용자 이메일
    isLogin: false, // 로그인 상태

    login: ({ email, password }) => {
        console.log('email: ', email);
        console.log('password: ', password);
        set({ userEmail: email, isLogin: true });
    },

    logout: () => {
        console.log('로그아웃');
        set({ userEmail: null, isLogin: false });
    },
}));

export default useAuthStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import supabase from '../supabase/supabaseClient';

const useAuthStore = create(
    persist(
        (set) => ({
            userEmail: null, // 로그인한 사용자 이메일
            isLogin: false, // 로그인 상태

            login: async ({ email, password }) => {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                    if (error) throw error;

                    set({ userEmail: data.user?.email, isLogin: true });
                } catch (error) {
                    alert(error.message);
                    console.error('로그인 오류:', error);
                }
            },

            logout: async () => {
                try {
                    const { error } = await supabase.auth.signOut();

                    if (error) throw error;

                    set({ userEmail: null, isLogin: false });
                } catch (error) {
                    alert(error.message);
                    console.error('로그아웃 오류: ', error);
                }
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;

'use server';

import { BASE_URL } from '../constants/api';
import { Book } from '@/types/book';
import { CartItem } from '@/types/cart';
import { revalidatePath } from 'next/cache';

// 장바구니 리스트 가져오기
export const getCartItems = async () => {
    const [cartRes, bookRes] = await Promise.all([
        fetch(`${BASE_URL}/cart`, { cache: 'no-store' }),
        fetch(`${BASE_URL}/books`, { cache: 'no-store' }),
    ]);

    const cart: CartItem[] = await cartRes.json();
    const books: Book[] = await bookRes.json();

    return cart.map((item) => {
        const book = books.find((b) => Number(b.id) === Number(item.bookId));
        return { ...item, book };
    });
};

// 장바구니 추가
export const addToCart = async (formData: FormData) => {
    const bookId = Number(formData.get('bookId'));
    const quantity = Number(formData.get('quantity'));

    const cartRes = await fetch(`${BASE_URL}/cart`, { cache: 'no-store' });
    const cart: CartItem[] = await cartRes.json();

    const existing = cart.find((item) => item.bookId === bookId); // 중복 확인

    if (existing) {
        return { success: false, message: '이미 장바구니에 있는 책입니다.' };
    }

    const res = await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, quantity }),
    });

    if (!res.ok) {
        console.error('장바구니 추가 실패:', await res.text());
        return { success: false, message: '장바구니 추가 실패' };
    }

    revalidatePath('/cart'); // 장바구니 페이지 갱신
    return { success: true, message: '장바구니에 추가되었습니다.' };
};

// 장바구니 삭제
export const deleteCartItems = async (formData: FormData) => {
    const id = formData.get('id');

    const res = await fetch(`${BASE_URL}/cart/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        console.error('장바구니 삭제 실패:', await res.text());
    }

    revalidatePath('/cart');
};

// 장바구니 수량 변경
export const updateQuantity = async (formData: FormData) => {
    const id = formData.get('id');
    const quantity = Number(formData.get('quantity'));

    const res = await fetch(`${BASE_URL}/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
        console.error('수량 업데이트 실패:', await res.text());
    }

    revalidatePath('/cart');
};

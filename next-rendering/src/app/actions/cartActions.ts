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

    await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookId, bookId, quantity }),
    });

    revalidatePath('/cart'); // 장바구니 페이지 갱신
};

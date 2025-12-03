'use client';

import { Book } from '@/types/book';

type Props = {
    book: Book;
};

const CartButton = ({ book }: Props) => {
    const addToCart = async () => {
        await fetch('http://localhost:4000/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        alert(`${book.title} 장바구니에 추가됨`);
    };

    return (
        <button
            className="font-medium text-sm text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors"
            onClick={addToCart}
        >
            장바구니 담기
        </button>
    );
};

export default CartButton;

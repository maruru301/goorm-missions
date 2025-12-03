'use client';

import { Book } from '@/types/book';
import { BsCartPlus } from 'react-icons/bs';

type Props = {
    book: Book;
};

const CartButton = ({ book }: Props) => {
    const addToCart = async () => {
        try {
            const res = await fetch('http://localhost:4000/cart');
            const data: Book[] = await res.json();

            // 중복 체크
            if (data.find((item) => item.id === book.id)) {
                alert('이미 장바구니에 있습니다.');
                return;
            }

            // 추가
            await fetch('http://localhost:4000/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book),
            });

            alert(`${book.title} 장바구니에 추가됨`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className="font-medium text-sm text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
            onClick={addToCart}
        >
            <div className="flex items-center justify-center gap-2">
                <BsCartPlus className="w-4 h-4" />
                장바구니 담기
            </div>
        </button>
    );
};

export default CartButton;

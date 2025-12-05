'use client';

import { Book } from '@/types/book';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from '@/app/actions/cartActions';

type Props = {
    book: Book;
};

const CartButton = ({ book }: Props) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const result = await addToCart(formData);

        if (result.success) {
            alert(result.message); // 성공 메시지
        } else {
            alert(result.message); // 실패 메시지
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="bookId" value={book.id} />
            <input type="hidden" name="quantity" value={1} />

            <button
                type="submit"
                className="font-medium text-sm text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
            >
                <div className="flex items-center justify-center gap-2">
                    <BsCartPlus className="w-4 h-4" />
                    장바구니 담기
                </div>
            </button>
        </form>
    );
};

export default CartButton;

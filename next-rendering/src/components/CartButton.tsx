import { Book } from '@/types/book';
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from '@/app/actions/cartActions';

type Props = {
    book: Book;
};

const CartButton = ({ book }: Props) => {
    return (
        <form action={addToCart}>
            <input type="hidden" name="bookId" value={book.id} />
            <input type="hidden" name="quantity" value={1} />

            <button className="font-medium text-sm text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-center gap-2">
                    <BsCartPlus className="w-4 h-4" />
                    장바구니 담기
                </div>
            </button>
        </form>
    );
};

export default CartButton;

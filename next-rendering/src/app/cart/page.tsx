// 장바구니 페이지

import Link from 'next/link';
import { getCartItems } from '../actions/cartActions';

const CartPage = async () => {
    const cartItems = await getCartItems();

    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.book?.price.amount), 0);

    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold mb-6">🛒 장바구니</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">장바구니가 비어 있습니다.</p>
            ) : (
                <ul className="flex flex-col gap-4 justify-center">
                    {cartItems.map((item) => (
                        <li key={item.id} className="border p-6 flex justify-between">
                            <div>
                                <Link href={`/books/${item.id}`}>
                                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                                        {item.book?.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-500">{item.book?.author}</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>{Number(item.book?.price.amount).toLocaleString()}원</span>

                                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer">
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="py-6">
                <hr />
            </div>

            <div className="flex justify-end gap-4 text-lg font-medium">
                <span>총 금액:</span>
                <span>{totalPrice.toLocaleString()}원</span>
            </div>
        </div>
    );
};

export default CartPage;

// 장바구니 페이지

import { getCartItems, updateQuantity } from '../actions/cartActions';

import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

const CartPage = async () => {
    const cartItems = await getCartItems();

    const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.book?.price.amount) * item.quantity, 0);

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
                                <Link href={`/books/${item.bookId}`}>
                                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                                        {item.book?.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-500">{item.book?.author}</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <form action={updateQuantity}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <input
                                            type="hidden"
                                            name="quantity"
                                            value={item.quantity > 1 ? item.quantity - 1 : 1}
                                        />
                                        <button
                                            type="submit"
                                            className="px-3 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
                                        >
                                            -
                                        </button>
                                    </form>

                                    <span>{item.quantity}개</span>

                                    <form action={updateQuantity}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <input type="hidden" name="quantity" value={item.quantity + 1} />
                                        <button
                                            type="submit"
                                            className="px-3 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </form>
                                </div>

                                <span>{Number(item.book?.price.amount).toLocaleString()}원</span>

                                <DeleteButton itemId={item.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="py-6">
                <hr />
            </div>

            <div className="flex text-lg font-medium flex-col items-end gap-2">
                <div className="flex gap-4">
                    <span>총 개수: </span>
                    <span>{totalQuantity}개</span>
                </div>

                <div className="flex gap-4">
                    <span>총 금액:</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                </div>
            </div>
        </div>
    );
};

export default CartPage;

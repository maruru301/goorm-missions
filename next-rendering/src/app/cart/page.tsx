// 장바구니 페이지 (CSR)
'use client';

import { useEffect, useState } from 'react';

import { Book } from '@/types/book';

const CartPage = () => {
    const [cartList, setCartList] = useState<Book[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch('http://localhost:4000/cart');

                const data: Book[] = await res.json();
                setCartList(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold mb-6">🛒 장바구니</h2>

            {cartList.length === 0 ? (
                <p className="text-gray-500">장바구니가 비어 있습니다.</p>
            ) : (
                <ul className="flex flex-col gap-4 justify-center">
                    {cartList.map((item) => (
                        <li key={item.id} className="border p-6 flex justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.author}</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>{item.price.amount}원</span>
                                <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;

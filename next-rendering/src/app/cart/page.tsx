// 장바구니 페이지 (CSR)
'use client';

import { useEffect, useState } from 'react';

import { Book } from '@/types/book';
import Link from 'next/link';

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

    // 삭제
    const handleDelete = async (id: number) => {
        const confirm = window.confirm('삭제하시겠습니까?');
        if (!confirm) return;

        try {
            const res = await fetch(`http://localhost:4000/cart/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('삭제 실패');

            // 상태에서도 바로 제거
            setCartList((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const totalPrice = cartList.reduce((sum, item) => sum + Number(item.price.amount), 0);

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
                                <Link href={`/books/${item.id}`}>
                                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                                        {item.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-500">{item.author}</p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>{Number(item.price.amount).toLocaleString()}원</span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                                >
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

// 책 상세 페이지 (SSR)

import { BASE_URL } from '@/app/constants/api';
import { Book } from '@/types/book';
import CartButton from '@/components/CartButton';
import { notFound } from 'next/navigation';

type Params = {
    params: Promise<{ id: string }>;
};

const page = async ({ params }: Params) => {
    const { id } = await params;

    const res = await fetch(`${BASE_URL}/books/${id}`, {
        cache: 'no-store', // 매 요청마다 새로 가져오기
    });

    if (!res.ok) {
        // 글로벌 not-found.tsx 렌더링
        notFound();
    }

    const book: Book = await res.json();

    return (
        <div className="p-20 flex gap-10">
            <img src={book.coverImage} alt={book.title} width={300} />

            <div className="flex flex-col justify-between py-4 flex-1">
                <div className="flex flex-col gap-2">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-2xl font-bold">{book.title}</h1>

                            <div>
                                {book.isNew && (
                                    <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                        신간
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-400">{book.author}</p>
                        <p className="text-yellow-500 mb-4">★ {book.rating}</p>
                        <p>{book.description}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <p className="mt-2 font-semibold">{Number(book.price.amount).toLocaleString()}원</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {book.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-300 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <CartButton book={book} />
            </div>
        </div>
    );
};

export default page;

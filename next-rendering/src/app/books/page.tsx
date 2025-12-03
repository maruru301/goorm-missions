// 책 목록 페이지 (ISR)

import { Book } from '@/types/book';
import CartButton from '@/components/CartButton';
import Link from 'next/link';
import { MdInfoOutline } from 'react-icons/md';

const page = async () => {
    const res = await fetch('http://localhost:4000/books', {
        next: { revalidate: 10 }, // 10초마다 백그라운드에서 재생성
    });
    const books: Book[] = await res.json();

    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold mb-6">📚 책 목록</h2>

            <div className="flex flex-col gap-8">
                {books.map((book) => (
                    <div key={book.id} className="border flex gap-6 p-4">
                        <img src={book.coverImage} alt={book.title} width={200} />

                        <div className="flex flex-col justify-between py-4">
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

                            <div className="flex gap-2">
                                <CartButton book={book} />

                                <Link href={`/books/${book.id}`}>
                                    <button className="font-medium text-sm text-white px-3 py-2 rounded bg-neutral-500 hover:bg-neutral-600 transition-colors cursor-pointer">
                                        <div className="flex items-center justify-center gap-2">
                                            <MdInfoOutline className="w-4 h-4" />
                                            자세히 보기
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;

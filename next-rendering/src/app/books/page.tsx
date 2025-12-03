// 책 목록 페이지 (ISR)

import { Book } from '@/types/book';
import Link from 'next/link';

const page = async () => {
    const res = await fetch('http://localhost:4000/books', {
        next: { revalidate: 10 }, // 10초마다 백그라운드에서 재생성
    });
    const books: Book[] = await res.json();

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">책 목록</h2>

            <div className="flex flex-col gap-6">
                {books.map((book) => (
                    <div key={book.id} className="border flex gap-4">
                        <img src={book.coverImage} alt={book.title} width={200} />

                        <div className="pt-4">
                            <div className="flex items-center gap-2">
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
                            <p className="mb-4">{book.description}</p>
                            <p className="text-yellow-500">★ {book.rating}</p>

                            <div>
                                <Link href={`/books/${book.id}`}>
                                    <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 text-sm">
                                        자세히 보기
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

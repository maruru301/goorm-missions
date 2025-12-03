// 책 목록 페이지 (ISR)

import { Book } from '@/types/book';

const page = async () => {
    const res = await fetch('http://localhost:4000/books', {
        next: { revalidate: 10 }, // 10초마다 백그라운드에서 재생성
    });
    const books: Book[] = await res.json();

    return (
        <div>
            <h2>책 목록</h2>

            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <div>
                            <img src={book.coverImage} alt={book.title} width={200} />

                            <div>
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                                <p>{book.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;

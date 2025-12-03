// 메인 홈 (SSG)

import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold">환영합니다!</h1>
            <p className="text-gray-300 mb-6 text-center pt-2">아래 버튼을 눌러 다양한 책들을 확인해보세요.</p>

            <nav>
                <Link href="/books">
                    <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 text-sm">책 목록 보기</button>
                </Link>
            </nav>
        </div>
    );
}

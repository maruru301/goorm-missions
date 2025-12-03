// 메인 홈 (SSG)

import { FaListUl } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold">환영합니다!</h1>
            <p className="text-gray-300 mb-6 text-center pt-2">아래 버튼을 눌러 다양한 책들을 확인해보세요.</p>

            <nav>
                <Link href="/books">
                    <button className="font-medium text-sm text-white px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer">
                        <div className="flex items-center justify-center gap-2">
                            <FaListUl />책 목록 보기
                        </div>
                    </button>
                </Link>
            </nav>
        </div>
    );
}

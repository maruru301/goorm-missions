// 메인 홈 (SSG)

import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>환영합니다</h1>

            <nav>
                <Link href="/books">
                    <button>책 목록 보기</button>
                </Link>
            </nav>
        </div>
    );
}

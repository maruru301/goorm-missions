import Link from 'next/link';

export const NavBar = () => {
    return (
        <nav className="bg-gray-700 p-4 text-white">
            <ul className="flex gap-4">
                <li>
                    <Link href="/" className="hover:text-gray-200">
                        홈
                    </Link>
                </li>
                <li>
                    <Link href="/books" className="hover:text-gray-200">
                        책 목록
                    </Link>
                </li>
                <li>
                    <Link href="/cart" className="hover:text-gray-200">
                        장바구니
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;

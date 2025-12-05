'use client';

import { deleteCartItems } from '@/app/actions/cartActions';

type Props = {
    itemId: number;
};

const DeleteButton = ({ itemId }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!confirm('정말 삭제하시겠습니까?')) e.preventDefault();
    };
    return (
        <form action={deleteCartItems} onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={itemId} />

            <button
                type="submit"
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
            >
                삭제
            </button>
        </form>
    );
};

export default DeleteButton;

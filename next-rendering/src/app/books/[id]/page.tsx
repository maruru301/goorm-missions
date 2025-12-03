// 책 상세 페이지 (SSR)

type Params = {
    params: Promise<{ id: number }>;
};

const page = async ({ params }: Params) => {
    const { id } = await params;

    return <div>책 상세 정보 ({id})</div>;
};

export default page;

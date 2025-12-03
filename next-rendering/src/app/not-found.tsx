// 글로벌 404 (not-found) 페이지
export default function NotFound() {
    return (
        <div className="p-20 text-center">
            <h1 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다 😢</h1>
            <p className="mb-6">요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
        </div>
    );
}

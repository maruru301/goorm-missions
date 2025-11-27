// 미션 파일

type Geo = {
    lat: string;
    lng: string;
};

type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
};

type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
};

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

// 1.  id, title만 포함
type PostSummary = Pick<Post, 'id' | 'title'>;

// 2. Post에서 id 제외
type CreatePostDto = Omit<Post, 'id'>;

// 3. title, body만 선택적
type UpdatePostDto = Partial<Pick<Post, 'title' | 'body'>>;

// 4. Post 필드를 모두 읽기 전용
type ReadonlyPost = Readonly<Post>;

async function fetchJson<T>(url: string): Promise<T> {
    // TODO: fetch 호출 후 응답을 T 타입으로 반환하기
    const res = await fetch(url);
    const data: T = await res.json();

    return data;
}

type PostsReturnType = ReturnType<typeof fetchJson<Post[]>>; // Promise<Post[]>
type PostsDataType = Awaited<PostsReturnType>; // Post[]

const getPosts = async () => {
    try {
        const posts = await fetchJson<Post[]>('https://jsonplaceholder.typicode.com/posts');

        console.log('=====모든 Posts 가져오기=====');
        posts.forEach((post) => {
            console.log(post);
        });
    } catch (error) {
        console.error('posts 가져오기 실패', error);
    }
};

const getUser = async () => {
    try {
        const user = await fetchJson<User>('https://jsonplaceholder.typicode.com/users/1');

        console.log('=====User1 가져오기=====');
        console.log(user);
    } catch (error) {
        console.error('user 가져오기 실패', error);
    }
};

// API 요청 실행 후 로그 출력
const run = async () => {
    try {
        await getPosts();
        await getUser();
    } catch (error) {
        console.error('데이터 가져오기 실패', error);
    }
};

// 유틸리티로 만든 타입 확인
const testPostTypes = async () => {
    try {
        const posts = await fetchJson<Post[]>('https://jsonplaceholder.typicode.com/posts');

        // PostSummary
        const postSummary: PostSummary = {
            id: posts[0].id,
            title: posts[0].title,
        };
        console.log('===PostSummary===');
        console.log(postSummary);

        // ReadonlyPost
        const readonlyPost: ReadonlyPost = posts[0];
        console.log('===ReadonlyPost===');
        console.log(readonlyPost);
        // 수정 시 오류 발생 확인
        // readonlyPost.title = '안녕';

        // UpdatePostDto
        const updatePost: UpdatePostDto = {
            title: '타이틀',
            body: '바디',
            // id: 1,
        };
        console.log('===UpdatePostDto===');
        console.log(updatePost);
    } catch (error) {
        console.error('testPostTypes 실행 실패', error);
    }
};

// run();
testPostTypes();

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

async function fetchJson<T>(url: string): Promise<T> {
    // TODO: fetch 호출 후 응답을 T 타입으로 반환하기
    const res = await fetch(url);
    const data: T = await res.json();

    return data;
}

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

const run = async () => {
    try {
        await getPosts();
        await getUser();
    } catch (error) {
        console.error('데이터 가져오기 실패', error);
    }
};

run();

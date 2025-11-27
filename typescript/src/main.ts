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

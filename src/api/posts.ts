import { sleep } from 'react-query/types/core/utils';
const API_URL = 'https://dummyjson.com/posts';

export type PaginatedResponse = {
  limit: number;
  skip: number;
  total: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
};

export type GetPostsResponse = PaginatedResponse & {
  posts: Post[];
};
export async function getPosts({
  page = 1,
  limit = 10,
  getAll = false,
}): Promise<GetPostsResponse> {
  const queryParams = getAll
    ? '?limit=150'
    : `?limit=${limit}&skip=${(page - 1) * limit}`;
  const query = `${API_URL}${queryParams}`;
  try {
    await sleep(1000);
    const response = await fetch(query);
    return (await response.json()) as GetPostsResponse;
  } catch (error) {
    throw new Error('Error while fetching data');
  }
}

export async function getPost(id: string) {
  const query = `${API_URL}/${id}`;
  try {
    await sleep(1000);
    const response = await fetch(query);
    return (await response.json()) as Post;
  } catch (error) {
    throw new Error('Something went wrong while fetching post');
  }
}

export type GetPostsFromUserResponse = PaginatedResponse & {
  posts: Post[];
};
export async function getPostsFromUser(userId: string) {
  const query = `${API_URL}/user/${userId}`;
  try {
    await sleep(1000);
    const response = await fetch(query);
    return (await response.json()) as GetPostsFromUserResponse;
  } catch (error) {
    throw new Error('Error while fetching data');
  }
}

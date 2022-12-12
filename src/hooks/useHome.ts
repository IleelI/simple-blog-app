import type { GetPostsResponse } from '../api/posts';
import usePagination from 'hooks/usePagination';

type UseHomeParams = {
  postsData: GetPostsResponse | null;
};
export default function useHome({ postsData }: UseHomeParams) {
  const pagination = usePagination(1, 3);
  const { page, limit } = pagination;

  const posts = (postsData?.posts ?? []).slice(
    (page - 1) * limit,
    page * limit
  );
  const total = postsData?.total ?? 0;

  return {
    posts,
    pagination,
    total,
  };
}

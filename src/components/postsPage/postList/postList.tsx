import type { PostType } from 'api/posts';
import Pagination from 'components/pagination/pagination';
import type usePagination from 'hooks/usePagination';
import Post from '../post/post';
import classes from './postList.module.scss';

type PostListProps = {
  posts: PostType[];
  total: number;
  pagination: ReturnType<typeof usePagination>;
};

const PostList = ({ posts, total, pagination }: PostListProps) => {
  return (
    <div className={classes.postsContainer}>
      <ul className={classes.postsList}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>

      <Pagination total={total} pagination={pagination} />
    </div>
  );
};

export default PostList;

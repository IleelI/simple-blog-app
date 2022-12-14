import type { PostType } from 'api/posts';
import type { UserType } from 'api/users';
import BaseLink from 'components/baseLink/baseLink';
import Tag from 'components/tag/tag';
import classes from './postHeader.module.scss';

type PostHeaderDetails = { post: PostType; user: UserType };

const PostHeader = ({ post, user }: PostHeaderDetails) => {
  const postAuthor = `${user.firstName} ${user.lastName}`;
  const authorUsernane = user.username;

  return (
    <header className={classes.postHeader}>
      <h1>{post.title}</h1>

      <section className={classes.postDetails}>
        <BaseLink to={`/user/${post.userId}`} classes={classes.headerDetail}>
          Post by: {postAuthor} ({authorUsernane})
        </BaseLink>
        <div className={classes.spacer} />
        <small className={classes.headerDetail}>
          Reactions: {post?.reactions ?? 0}
        </small>
      </section>

      {post.tags && (
        <ul className={classes.tagList}>
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      )}
    </header>
  );
};

export default PostHeader;

import type { PostType } from 'api/posts';
import clsx from 'clsx';
import BaseLink from 'components/baseLink/baseLink';
import Tag from 'components/tag/tag';
import classes from './post.module.scss';
import usePost from './usePost';

type PostProps = {
  post: PostType;
  simplified?: boolean;
};
const Post = ({ post, simplified = false }: PostProps) => {
  const { id, title, body, reactions, tags, userId } = post;
  const {
    handleGoToPostPage,
    handleKeyboardGoToPostPage,
    handleCardContentClick,
    handleCardContentKeyboardPress,
  } = usePost(id);

  return (
    <li
      tabIndex={0}
      role="button"
      className={clsx(classes.post, simplified && classes.postSimplified)}
      onClick={handleGoToPostPage}
      onKeyDown={handleKeyboardGoToPostPage}
    >
      <header className={classes.postHeader}>
        <h1 className={classes.postTitle}>{title}</h1>
        <div className={classes.postDetails}>
          <small className={classes.postDetail}>Reactions: {reactions}</small>
          <span className={classes.detailDivider} />
          <span
            onClick={handleCardContentClick}
            onKeyDown={handleCardContentKeyboardPress}
          >
            <BaseLink to={`/user/${userId}`} classes={classes.postDetail}>
              See author
            </BaseLink>
          </span>
        </div>
      </header>

      {!simplified && <p className={classes.postBody}>{body}</p>}

      {!simplified && tags && (
        <ul className={classes.tagList}>
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Post;

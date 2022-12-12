import { Post } from 'api/posts';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { KeyboardEvent, MouseEvent } from 'react';
import { capitalizeFirstLetter } from 'utils/string';
import classes from './post.module.scss';

type PostProps = {
  post: Post;
  simplified?: boolean;
};
const Post = ({ post, simplified = false }: PostProps) => {
  const { push } = useRouter();
  const { id, title, body, reactions, tags, userId } = post;

  const handleGoToPostPage = () => {
    push(`/post/${id}`);
  };

  const handleKeyboardGoToPostPage = (event: KeyboardEvent<HTMLLIElement>) => {
    const keyCode = event.code;
    if (['Enter', 'Space'].includes(keyCode)) {
      handleGoToPostPage();
    }
  };

  const handleCardContentClick = (event: MouseEvent, callback?: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    callback?.();
  };

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
          <small
            onClick={handleCardContentClick}
            className={clsx(classes.postDetail, classes.postLink)}
          >
            <Link href={`/user/${userId}`}>See author</Link>
          </small>
        </div>
      </header>

      {!simplified && <p className={classes.postBody}>{body}</p>}

      {!simplified && tags && (
        <ul className={classes.tagList}>
          {tags.map((tag) => (
            <li key={tag} className={classes.tag}>
              {capitalizeFirstLetter(tag)}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Post;

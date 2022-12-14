import { getParagraphedBody } from 'utils/string';

import classes from './postBody.module.scss';

type PostBodyProps = {
  body: string;
};

const PostBody = ({ body }: PostBodyProps) => {
  const paragraphedBody = getParagraphedBody(body);

  return (
    <section className={classes.postBody}>
      {paragraphedBody.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
};

export default PostBody;

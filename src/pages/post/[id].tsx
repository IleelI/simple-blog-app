import type { Post } from 'api/posts';
import { getPost, getPosts } from 'api/posts';
import Layout from 'components/layout/layout';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { capitalizeFirstLetter, getParagraphedBody } from 'utils/string';
import classes from './post.module.scss';

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostPage: NextPage<PostProps> = function ({ initialPost }) {
  const router = useRouter();
  const { id } = router.query as PostQuery;
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getPost(id ?? '1'),
    queryKey: ['post', id],
    initialData: initialPost,
  });

  const handleGoBackClick = () => {
    router.push('/');
  };

  if (!post) return <p>Nothing here</p>;
  const { title, body, reactions, tags, userId } = post;
  const reactionsLabel =
    reactions > 1 ? `Reactions: ${reactions}` : 'Reaction: 1';
  const paragraphedBody = getParagraphedBody(body);

  return (
    <>
      <Head>
        <title>{post.title ?? 'Post'}</title>
      </Head>

      <Layout>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
        <div className={classes.postContainer}>
          <header className={classes.postHeader}>
            <h1>{title}</h1>

            <section className={classes.postDetails}>
              <small className={classes.headerDetail}>
                Post by: author {userId}
              </small>
              <div className={classes.spacer} />
              <small className={classes.headerDetail}>{reactionsLabel}</small>
            </section>

            {tags && (
              <ul className={classes.tagList}>
                {tags.map((tag) => (
                  <li key={tag} className={classes.tag}>
                    {capitalizeFirstLetter(tag)}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <section className={classes.postBody}>
            {paragraphedBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <button
            type="button"
            className={classes.goBackButton}
            onClick={handleGoBackClick}
          >
            Go back
          </button>
        </div>
      </Layout>
    </>
  );
};

export default PostPage;

export type PostQuery = ParsedUrlQuery & {
  id?: string;
};
export const getStaticPaths: GetStaticPaths<PostQuery> = async function () {
  try {
    const postsData = await getPosts({ getAll: true });
    const postPaths: GetStaticPathsResult<PostQuery>['paths'] =
      postsData.posts?.map(({ id }) => ({
        params: {
          id: String(id ?? '0'),
        },
      }));

    return {
      paths: postPaths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export type StaticProps = {
  initialPost: Post | null;
};
export const getStaticProps: GetStaticProps<StaticProps, PostQuery> =
  async function (context) {
    try {
      const id = context.params?.id || '1';
      const postData = await getPost(id);
      return {
        props: {
          initialPost: postData,
        },
      };
    } catch (error) {
      return {
        props: {
          initialPost: null,
        },
      };
    }
  };

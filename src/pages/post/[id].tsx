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
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { capitalizeFirstLetter, getParagraphedBody } from 'utils/string';
import classes from './post.module.scss';

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostPage: NextPage<PostProps> = function ({ post }) {
  const router = useRouter();

  const handleGoBackClick = () => {
    router.back();
  };

  const paragraphedBody = getParagraphedBody(post?.body ?? '');

  if (!post) return <p>Something went wrong</p>;
  return (
    <>
      <Head>
        <title>{post.title ?? 'Post'}</title>
      </Head>

      <Layout>
        <div className={classes.postContainer}>
          <header className={classes.postHeader}>
            <h1>{post.title}</h1>

            <section className={classes.postDetails}>
              <small className={classes.headerDetail}>
                <Link href={`/user/${post.userId}`}>
                  Post by: author {post.userId}
                </Link>
              </small>
              <div className={classes.spacer} />
              <small className={classes.headerDetail}>
                Reactions: {post?.reactions ?? 0}
              </small>
            </section>

            {post.tags && (
              <ul className={classes.tagList}>
                {post.tags.map((tag) => (
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
  id: string;
};
export const getStaticPaths: GetStaticPaths<PostQuery> = async function () {
  try {
    const postsData = await getPosts({ getAll: true });
    const postPaths: GetStaticPathsResult<PostQuery>['paths'] =
      postsData.posts?.map(({ id }) => ({
        params: {
          id: String(id ?? '1'),
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
  post: Post | null;
};
export const getStaticProps: GetStaticProps<StaticProps, PostQuery> =
  async function (context) {
    try {
      const id = context.params?.id || '1';
      const postData = await getPost(id);
      return {
        props: {
          post: postData,
        },
      };
    } catch (error) {
      return {
        props: {
          post: null,
        },
      };
    }
  };

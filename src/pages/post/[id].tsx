import type { PostType } from 'api/posts';
import { getPost, getPosts } from 'api/posts';
import type { UserType } from 'api/users';
import { getUser } from 'api/users';
import GoBackButton from 'components/goBackButton/goBackButton';
import Layout from 'components/layout/layout';
import PostBody from 'components/postPage/postBody/postBody';
import PostHeader from 'components/postPage/postHeader/postHeader';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import classes from './post.module.scss';

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostPage: NextPage<PostProps> = function ({ post, user }) {
  if (!post || !user) return <p>Something went wrong</p>;

  return (
    <>
      <Head>
        <title>{post.title ?? 'Post'}</title>
      </Head>

      <Layout>
        <div className={classes.postContainer}>
          <PostHeader post={post} user={user} />

          <PostBody body={post.body} />

          <GoBackButton />
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
  post: PostType | null;
  user: UserType | null;
};
export const getStaticProps: GetStaticProps<StaticProps, PostQuery> =
  async function (context) {
    try {
      const id = context.params?.id || '1';
      const postData = await getPost(id);
      const userData = await getUser(String(postData.userId));
      return {
        props: {
          post: postData,
          user: userData,
        },
      };
    } catch (error) {
      return {
        props: {
          post: null,
          user: null,
        },
      };
    }
  };

import type { Post } from 'api/posts';
import { getPost, getPosts } from 'api/posts';
import Layout from 'components/layout/layout';
import PostComponent from 'components/posts/post/post';
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

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
const PostPage: NextPage<PostProps> = function ({ initialPost }) {
  const router = useRouter();
  const query = router.query as PostQuery;
  console.log(query?.id);

  if (!initialPost) return <p>Nothing here</p>;
  return (
    <>
      <Head>
        <title>{initialPost?.title ?? 'Post'}</title>
      </Head>
      <Layout>
        <PostComponent post={initialPost} />
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

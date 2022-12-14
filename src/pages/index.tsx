import type { GetPostsResponse } from 'api/posts';
import { getPosts } from 'api/posts';
import Layout from 'components/layout/layout';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import classes from './home.module.scss';
import useHome from '../hooks/useHome';
import PostList from 'components/postsPage/postList/postList';

const PAGE_NAME = 'Home';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = function ({ posts: postsData }) {
  const { posts, pagination, total } = useHome({ postsData });

  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>

      <Layout>
        <div className={classes.contentContainer}>
          <header className={classes.pageTitle}>
            <h1>Here are the results</h1>
          </header>

          {posts && (
            <PostList posts={posts} total={total} pagination={pagination} />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Home;

type StaticProps = {
  posts: GetPostsResponse | null;
};
export const getStaticProps: GetStaticProps<StaticProps> = async function () {
  try {
    const posts = await getPosts({ getAll: true });
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: null,
      },
    };
  }
};

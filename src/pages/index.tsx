import type { GetPostsResponse } from 'api/posts';
import { getPosts } from 'api/posts';
import Layout from 'components/layout/layout';
import Pagination from 'components/pagination/pagination';
import Post from 'components/posts/post/post';
import usePagination from 'hooks/usePagination';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import classes from './home.module.scss';

const PAGE_NAME = 'Home';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = function ({ initialData }) {
  const pagination = usePagination(1, 3);
  const { page, limit } = pagination;
  const { data: postsData, isError } = useQuery({
    queryFn: () => getPosts({ page, limit }),
    queryKey: ['posts', page, limit],
    keepPreviousData: true,
    initialData: initialData,
  });

  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>
      <Layout>
        <div>
          <header className={classes.pageTitle}>
            <h1>Here are the results</h1>
          </header>

          {isError && <p>Something went wrong :(</p>}

          {!isError && postsData?.posts && (
            <div className={classes.postsContainer}>
              <ul className={classes.postsList}>
                {postsData?.posts?.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </ul>

              <Pagination total={postsData?.total} pagination={pagination} />
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Home;

type StaticProps = {
  initialData: GetPostsResponse | null;
};
export const getStaticProps: GetStaticProps<StaticProps> = async function () {
  try {
    const initialData = await getPosts({ page: 1, limit: 3 });
    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: null,
      },
    };
  }
};

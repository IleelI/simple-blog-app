import type { GetPostsResponse } from 'api/posts';
import { getPosts } from 'api/posts';
import Layout from 'components/layout/layout';
import Post from 'components/posts/post/post';
import usePagination from 'hooks/usePagination';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import classes from './home.module.scss';

const PAGE_NAME = 'Home';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = function ({ initialData }) {
  const {
    page,
    limit,
    isPrevPageDisabled,
    handleGoToPage,
    handlePrevPage,
    handleNextPage,
    handleLimitSet,
  } = usePagination(1, 3);
  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getPosts({ page, limit }),
    queryKey: ['posts', page, limit],
    keepPreviousData: true,
    initialData: initialData,
  });

  const total = postsData?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const isNextPageDisabled = page >= totalPages;

  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>
      <Layout>
        <div>
          <header>
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

              <div className={classes.pagination}>
                <button
                  type="button"
                  className={classes.button}
                  disabled={isPrevPageDisabled}
                  onClick={handlePrevPage}
                >
                  Prev page
                </button>
                <p className={classes.page}>
                  {page}/{totalPages}
                </p>
                <button
                  type="button"
                  className={classes.button}
                  disabled={isNextPageDisabled}
                  onClick={handleNextPage}
                >
                  Next page
                </button>
              </div>

              <div className={classes.paginationControls}>
                <div className={classes.paginationControl}>
                  <small>Go to page:</small>
                  <input
                    className={classes.limitInput}
                    defaultValue={page}
                    onBlur={(event) => {
                      const input = event.target as HTMLInputElement;
                      const newPage = parseInt(input.value) || 1;
                      handleGoToPage(newPage, totalPages);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        const input = event.target as HTMLInputElement;
                        const newPage = parseInt(input.value) || 1;
                        handleGoToPage(newPage, totalPages);
                      }
                    }}
                  />
                </div>
                <div className={classes.paginationControl}>
                  <small>Limit per page:</small>
                  <input
                    className={classes.limitInput}
                    defaultValue={limit}
                    onBlur={(event) => {
                      const input = event.target as HTMLInputElement;
                      const newLimit = parseInt(input.value) || 1;
                      handleLimitSet(newLimit);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        const input = event.target as HTMLInputElement;
                        const newLimit = parseInt(input.value) || 1;
                        handleLimitSet(newLimit);
                      }
                    }}
                  />
                </div>
              </div>
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
    const initialData = await getPosts(1, 3);
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

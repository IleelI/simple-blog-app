import type { GetPostsFromUserResponse } from 'api/posts';
import { getPostsFromUser } from 'api/posts';
import type { UserType } from 'api/users';
import { getUser } from 'api/users';
import { getUsers } from 'api/users';
import GoBackButton from 'components/goBackButton/goBackButton';
import Layout from 'components/layout/layout';
import Post from 'components/postsPage/post/post';
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import type { ParsedUrlQuery } from 'querystring';
import { capitalizeFirstLetter } from 'utils/string';
import classes from './user.module.scss';

const PAGE_NAME = 'Profile';
type ProfileProps = InferGetStaticPropsType<typeof getStaticProps>;
const Profile: NextPage<ProfileProps> = ({ user, userPosts }) => {
  if (!user) return <h2>No user found</h2>;
  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>

      <Layout>
        <h1 className={classes.pageTitle}>
          {capitalizeFirstLetter(user.username)} profile
        </h1>

        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div className={classes.userBasicInfo}>
              <Image
                width={100}
                height={100}
                src={user.image}
                className={classes.profileImage}
                alt={`${user.username} image`}
              />
              <div className={classes.userInfo}>
                <p className={classes.mainInfo}>
                  {user.firstName} {user.lastName}
                </p>
                <p className={classes.secondaryInfo}>
                  {capitalizeFirstLetter(user.gender)} ({user.age})
                </p>
              </div>
            </div>

            <div className={classes.userPosts}>
              <h1 className={classes.postsHeading}>
                User posts({userPosts?.posts?.length ?? 0}):
              </h1>

              {userPosts?.posts && (
                <ul className={classes.posts}>
                  {userPosts.posts.map((post) => (
                    <Post key={post.id} post={post} simplified />
                  ))}
                </ul>
              )}
            </div>
          </div>

          <GoBackButton />
        </div>
      </Layout>
    </>
  );
};

export default Profile;

type UserQuery = ParsedUrlQuery & {
  id: string;
};
export const getStaticPaths: GetStaticPaths = async function () {
  try {
    const usersData = await getUsers({ getAll: true });
    const userPaths: GetStaticPathsResult<UserQuery>['paths'] =
      usersData.users?.map(({ id }) => ({
        params: {
          id: String(id ?? '1'),
        },
      }));
    return {
      paths: userPaths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

type StaticProps = {
  user: UserType | null;
  userPosts: GetPostsFromUserResponse | null;
};
export const getStaticProps: GetStaticProps<StaticProps, UserQuery> =
  async function (context) {
    try {
      const id = context.params?.id || '1';
      const user = await getUser(id);
      const userPosts = await getPostsFromUser(id);
      return {
        props: {
          user,
          userPosts,
        },
      };
    } catch (error) {
      return {
        props: {
          user: null,
          userPosts: null,
        },
      };
    }
  };

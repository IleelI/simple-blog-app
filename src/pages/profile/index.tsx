import Layout from 'components/layout/layout';
import Head from 'next/head';

const PAGE_NAME = 'Profile';
const Profile = () => {
  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>

      <Layout>
        <h1>Profile page</h1>
      </Layout>
    </>
  );
};

export default Profile;

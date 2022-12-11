import Layout from 'components/layout/layout';
import type { NextPage } from 'next';
import Head from 'next/head';

const PAGE_NAME = 'About';
const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>{PAGE_NAME}</title>
      </Head>

      <Layout>
        <h1>About page</h1>
      </Layout>
    </>
  );
};

export default About;

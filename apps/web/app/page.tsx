import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import '../styles/globals.css';
import { Row } from 'design';
import type { AppRouter } from 'sacola-trpc';
// import { Text } from 'react-native-web';

const Home: NextPage = () => {
  return (
    <Row>
      <h1 className="text-6xl text-blue-400">GRANDE PIROCA DO FLORI</h1>
      {/* <Text>asdkjhasdkjhasd</Text> */}
    </Row>
  );
};

export default Home;

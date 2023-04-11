import { AppProps } from 'next/app';
import Layout from './layout';
import ChatBot from '@components/chatbot/ChatBot';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ChatBot />
    </Layout>
  );
}

export default App;

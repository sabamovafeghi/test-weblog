import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { Alexandria } from 'next/font/google'

const inter = Alexandria({ subsets: ['latin'] })
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className}>
<QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </div>
    
  );
}

export default MyApp; 

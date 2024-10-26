import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { Alexandria } from 'next/font/google'
import Cookies from 'js-cookie';
import Header from '@/components/Header';

const inter = Alexandria({ subsets: ['latin'] })
const queryClient = new QueryClient();
const token = Cookies.get('token');


function MyApp({ Component, pageProps }) {
   
  return (
    <div className={inter.className}> 
        {/* {!token ? "" : <Header/>}  */}
       
<QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider> 
    </div>
    
  );
}

export default MyApp; 

// pages/blog.js
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment-jalaali';
import Header from '@/components/Header';

const fetchPosts = async () => {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};
 
const Blog = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const token = Cookies.get('token');
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: !!token,
  });

  useEffect(() => {
    console.log('data:', data);
    if(data)
      setUniqueCategories([...new Map(data.map(post => [post.categories[0].slug, post.categories[0]])).values()])
      
  }, [ data]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } 
      
  }, [token, isClient, router]);

  if (!isClient) {
    return null; 
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;


  return (
    <>
    <Header/>
   
     <div className="container mx-auto p-4"> 
      
      <h1 className="text-3xl font-bold mb-6" dir='rtl'>بلاگ</h1>
      <div className="flex flex-col-reverse gap-2 lg:flex-row">
      
        <main className="lg:w-3/4 sm:w-full grid grid-cols-1 gap-4">
          {data?.map(post => (
            <Link href={`/blog/${post.id}`} key={post.id} legacyBehavior>
              <a className="gap-4 p-4 border-cyan-100 border  hover:bg-cyan-50 rounded-2xl flex ">
                <Image
                  src={post.featured_media_object.source_url}
                  alt={post.featured_media_object.title}
                  width={post.featured_media_object.media_details.width}
                  height={post.featured_media_object.media_details.height}
                  className="mb-4 w-56 h-56"
                />
                <div className='flex gap-2 flex-col w-100 justify-between'>
                <h2 className="text-xl font-bold" dir='rtl'>{post.title.rendered}</h2>
                <p className="text-gray-700" dir='rtl' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                <div className='flex justify-between'>
                <p className="text-gray-400">{moment(post.date).format('jYYYY/jM/jD')}</p>
                <div className="text-gray-600 bg-sky-200 py-1 px-2 rounded-xl w-fit ">{post.categories.map(category => category.name).join(', ')}</div>
                
                </div>
              
                </div>
               
              </a>
            </Link>
          ))}
        </main>
        <aside className="sm:w-full lg:w-1/4 p-4 bg-cyan-50 h-min rounded-2xl" dir='rtl'> 
          <h2 className="text-l font-semibold mb-4">دسته بندی</h2>
          <ul>
            {uniqueCategories.map(category => (
              <li key={category.id} className="mb-2">
                <Link href={`/category/${category.slug}`} legacyBehavior>
                  <a className="text-blue-500 hover:underline ">{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
    </>
   
  );
};

export default Blog;
 
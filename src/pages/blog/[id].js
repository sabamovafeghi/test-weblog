import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment-jalaali';
import Link from 'next/link';
import Header from '@/components/Header';

const fetchPost = async (id) => {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
};

const fetchPosts = async () => {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get('token');
  const [isClient, setIsClient] = useState(false);
    const [otherPosts, setOtherPosts] = useState([]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: post, error: postError, isLoading: postLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id && !!token && isClient,
  });

  const { data: posts, error: postsError, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: !!token && isClient,
  });

  useEffect(() => {
    if(posts)
      setOtherPosts(posts.filter(otherPost => otherPost.id !== parseInt(id)))
      
  }, [ posts]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } 
  }, [token, isClient, router]);

  if (!isClient) {
    return null; // Avoid rendering during SSR
  }

  if (postLoading || postsLoading) return <div>Loading...</div>;
  if (postError || postsError) return <div>Error loading data</div>;


  return (
    <>
    <Header/>
     <div className="container mx-auto p-4 flex gap-3" >
         <aside className="w-1/4 p-4  bg-cyan-50 rounded-2xl" dir='rtl'>
        <h2 className="text-xl font-bold mb-4" dir='rtl'>پست های بیشتر</h2>
        <ul>
          {otherPosts?.map(otherPost => (
            <li key={otherPost.id} className="mb-2">
              <Link href={`/blog/${otherPost.id}`} legacyBehavior>
                <a className="block p-2  rounded hover:bg-cyan-100">
                  <Image
                    src={otherPost.featured_media_object.source_url}
                    alt={otherPost.featured_media_object.title}
                    width={otherPost.featured_media_object.media_details.width}
                    height={otherPost.featured_media_object.media_details.height}
                    className="w-full h-auto mb-2"
                  />
                  <h3 className="text-base font-medium" dir='rtl'>{otherPost.title.rendered}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {post && (
        <main className="w-3/4 py-3 px-10" dir='rtl'>
          <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
          <p className="text-gray-700" dir='rtl' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
             
          <Image
            src={post.featured_media_object.source_url}
            alt={post.featured_media_object.title}
            width={post.featured_media_object.media_details.width}
            height={post.featured_media_object.media_details.height}
            className="mb-4 w-full"
          />
           <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
           <p className="text-gray-500 mb-4" dir='ltr'>{moment(post.date).format('jYYYY/jM/jD')}</p>
        
          <div className="mt-4" dir='rtl'>
            <h3 className="text-xl font-semibold">دسته بندی:</h3>
            <p className="text-gray-700">{post.categories.map(category => category.name).join(', ')}</p>
          </div>
        </main>
      )}
     
    </div>
    </>
   
  );
};

export default PostDetail;

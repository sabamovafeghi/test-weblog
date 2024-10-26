// pages/blog/[id].js
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment-jalaali';

const fetchPost = async (id) => {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
};

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get('token');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id && !!token && isClient,
  });

  useEffect(() => {
    if (!token && isClient) {
      router.push('/login');
    }
  }, [token, isClient, router]);

  if (!isClient) {
    return null; // Avoid rendering during SSR
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div className="container mx-auto p-4">
      {data && (
        <>
          <h1 dir='rtl'
          className="text-lg font-bold mb-4 lg:text-3xl">{data.title.rendered}</h1>
           <p className="text-gray-700" dir='rtl' dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}></p>
              
          <Image
            src={data.featured_media_object.source_url}
            alt={data.featured_media_object.title}
            width={data.featured_media_object.media_details.width}
            height={data.featured_media_object.media_details.height}
            className="mb-4"
          />
        
          <div className="text-gray-700" dir='rtl' dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>
          <div className="mt-4 " dir='rtl'>
            <h3 className="text-xl font-semibold">دسته بندی:</h3>
            <p className="text-gray-700 bg-sky-200 p-1 rounded-md w-fit">{data.categories.map(category => category.name).join(', ')}</p>
          </div>
          <p className="text-gray-500 mb-4" >{moment(data.date).format('jYYYY/jM/jD')} :تاریخ انتشار </p>
        </>
      )}
    </div>
  );
};

export default PostDetail; 

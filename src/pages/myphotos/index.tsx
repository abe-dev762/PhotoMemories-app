import * as React from 'react';
import Layout from '@/components/ui/layout';
import { useUserAuth } from '@/context/UserAuthContext';
import type { DocumentResponse, Post } from '@/types';
import { getPostByUserId } from '@/firebaseDb/post.service';
import { HeartIcon } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';




interface MyPhotoProps {}



const MyPhotos: React.FC<MyPhotoProps> = () => {
  const { user } = useUserAuth();
  const [posts, setPosts] = React.useState<DocumentResponse[]>([]);
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const [loading, setLoading] = React.useState(true);    

///
const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArray: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("the response is: ", responseObj);
          tempArray.push(responseObj);
        })
        setData(tempArray);
      } else {
        console.log("document not found");
      }
    } catch (error) {
      console.error(error);
    }
  }


  React.useEffect(() => {
  if (!user?.uid) return; 

  const fetchPosts = async () => {
    setLoading(true); 
    try {
      const snapshot = await getPostByUserId(user.uid);

      const fetchedPosts: DocumentResponse[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Post;
        return {
          id: doc.id,
          ...data,
        };
      });

      setPosts(fetchedPosts); 
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); 
    }
  };

  fetchPosts();
}, [user?.uid]); 


  if (loading) {
    return (
      <div className='container mx-auto h-screen'>
        <div className='flex flex-col justify-center items-center mt-[20vh]'>
        <CircularProgress className='w-2xs md:w-2xl'/>
        <div className='text-lg'>Loading</div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='border w-[50vw] pl-[4vw]'>
          <h3 className='bg-slate-800 text-white text-center text-lg p-2'>
            My Photos
          </h3>
          <div className='p-8'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {posts.length === 0 ? (
                <p>No posts found</p>
              ) : (
                posts.map((post) =>
                post.photos?.map((photo, index) => (
                  <div key={`${post.id}-${index}`} className='border rounded-md relative'>
                    <div className='absolute group transition-all duration-200 bg-transparent hover:bg-slate-900 hover:opacity-70 top-0 bottom-0 left-0 right-0 h-full w-full'>
                      <div className='flex flex-col justify-center items-center w-full h-full'>
                        <HeartIcon className='hidden group-hover:block fill-white'/>
                        <div className='hidden group-hover:block text-white'>{post.likes} Likes</div>
                      </div>
                    </div>
                    <img
                    className='w-full'
                    alt='post'
                    src={`${photo.cdnUrl}/-/progressive/yes/-/scale_crop/400x400/center/`}/>
                  </div>
                )))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
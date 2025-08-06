import * as React from 'react';
import Layout from '@/components/ui/layout';
import { useUserAuth } from '@/context/UserAuthContext';
import type { DocumentResponse, Post } from '@/types';
import { getPostByUserId } from '@/firebaseDb/post.service';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

interface MyPhotoProps {}

const MyPhotos: React.FC<MyPhotoProps> = () => {
  const { user } = useUserAuth();
  const [posts, setPosts] = React.useState([]);
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

      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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
      <div>...Loading</div>
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
              {posts}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
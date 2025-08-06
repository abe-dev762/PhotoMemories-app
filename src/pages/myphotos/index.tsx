import * as React from 'react';
import Layout from '@/components/ui/layout';
import { useUserAuth } from '@/context/UserAuthContext';
import type { DocumentResponse, Post } from '@/types';
import { getPostByUserId } from '@/firebaseDb/post.service';
import { doc, QuerySnapshot } from 'firebase/firestore';


interface MyPhotoProps {

}

const MyPhotos: React.FC<MyPhotoProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArray: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc: QuerySnapshot<Post>) => {
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
    if (user != null) {
      getAllPost(user.uid);
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      return (
        <div key={item.photos[0].uuid}
        className='relative'>
          <div className='absolute'>
            <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}/>
          </div>
        </div>
      )
    })
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
              {data ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyPhotos;
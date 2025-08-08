import React from 'react'
import Layout from '@/components/ui/layout'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Stories from '@/components/stories';
import type { DocumentResponse } from '@/types';
import { useUserAuth } from '@/context/UserAuthContext';
import { getPosts } from '@/firebaseDb/postService';
import CircularProgress from '@mui/material/CircularProgress';
import PostCard from '@/components/postCard';

interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const getAllpost = async () => {
    const res: DocumentResponse[] = (await getPosts()) || [];
    console.log("all posts are: ", res);
    setData(res);
  };

  React.useEffect(() => {
    if (user != null) {
      getAllpost();
    }
  }, []);

  const renderPost = () => {
    return data.map((item) => {
      return <PostCard key={item.id} data={item}/>
    })
  };


  return (
    <Layout>
      <div className='flex flex-col sm:w-2xs md:w-2xl pl-4 ml-2'>
        <div className='relative mb-2 w-full text-gray-600'>
          <Input className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none'
          type='search'
          placeholder='search'
          name='search'
          />
          <button 
          type='submit'
          className='absolute right-2.5 top-2.5'>
            <Search className='w-5 h-5 text-gray-400'/>
          </button>
        </div>
        <div className='mb-5 overflow-y-auto'>
          <h2 className='mb-5'>Stories</h2>
          <Stories/>
        </div>
        <div className='mb-5'>
          <h2 className='mb-5'>Feed</h2>
          <div className='w-full flex justify-center'>
            <div className='flex flex-col max-w-sm rounded-sm overflow-hidden'>
              {data ? renderPost() : 
              <div className='container mx-auto h-screen'>
                      <div className='flex flex-col justify-center items-center mt-[20vh]'>
                      <CircularProgress className='w-2xs md:w-2xl'/>
                      <div className='text-lg'>Loading</div>
                      </div>
                    </div> }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;
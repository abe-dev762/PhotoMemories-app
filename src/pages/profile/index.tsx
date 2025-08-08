import * as React from 'react';
import Layout from '@/components/ui/layout';
import { useUserAuth } from '@/context/UserAuthContext';
import type { DocumentResponse, Post, ProfileResponse } from '@/types';
import avatar from "@/assets/default-avatar.png";
import Button from '@mui/material/Button';
import { Edit2Icon, HeartIcon } from 'lucide-react';
import { getPostByUserId } from '@/firebaseDb/postService';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';




interface profileProps {

}

const profile: React.FC<profileProps> = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid,
    userBio: "Update your Bio",
    photoURL: user?.photoURL ? user.photoURL : "",
    displayName: user?.displayName ? user.displayName : "Guest User"
  };
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const [posts, setPosts] = React.useState<DocumentResponse[]>([]);
  const [userInfo, setUserInfo] = React.useState<ProfileResponse>(initialUserInfo);
  const [loading, setLoading] = React.useState(true);

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


  const editProfile = () => {
    navigate("/edit-profile", { state: userInfo });
  };
  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='border w-2xl px-3'>
          <h3 className='bg-zinc-700 text-white text-center text-lg p-2'>Profile</h3>
          <div className='p-8 pb-4 border-b'>
            <div className='flex flex-row items-center pb-2 mb-2'>
              <div className='mr-2'>
                <img
                className='w-28 h-28 rounded-full border-2 border-zinc-600 object-cover'
                alt='avatar'
                src={userInfo?.photoURL?.trim() ? userInfo.photoURL : avatar}
                onError={(e) => {
                  e.currentTarget.src = avatar
                }}
                />
              </div>
              <div className='text-xl ml-3'>{userInfo.displayName}</div>
              <div className='text-xl ml-3'>
                {user?.email ? user.email : ""}
              </div>
            </div>
          </div>
          <div className='mb-4'>{userInfo.userBio}</div>
          <div className='w-fit border'>
            <Button onClick={editProfile}>
              <Edit2Icon className='mr-2 h-4 w-4'/> Edit Profile
            </Button>
          </div>
          <div className='p-8'>
            <h3 className='mb-5'>My post</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
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
  )
}

export default profile;
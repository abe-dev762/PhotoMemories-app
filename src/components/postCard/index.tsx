import { useUserAuth } from '@/context/UserAuthContext';
import type { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import image6 from '@/assets/image6.jpg';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateLikesOnPost } from '@/firebaseDb/postService';


interface IPostCard {
    data: DocumentResponse;
}

const PostCard: React.FC<IPostCard> = ({ data }) => {
  const { user } = useUserAuth();
  const isLikedByUser = user?.uid ? data.userLikes.includes(user.uid) : false;
  const [likesInfo, setLikesInfo] = React.useState<{
    likes: number,
    isLike: boolean
  }>({
    likes: data.likes,
    isLike: isLikedByUser
  });

  const updateLike = async (isVal: boolean) => {
    const updatedLikes = isVal ? likesInfo.likes + 1 : likesInfo.likes - 1;
    const updatedUserLikes = [...data.userLikes];

    if (isVal) {
        updatedUserLikes.push(user!.uid);
    } else {
        const index = updatedUserLikes.indexOf(user!.uid);
        if (index !== -1) {
            updatedUserLikes.splice(index, 1);
        }
    }

    setLikesInfo({
        likes: updatedLikes,
        isLike: isVal
    });

    data.userLikes = updatedUserLikes;

    await updateLikesOnPost(
        data.id,
        updatedUserLikes,
        updatedLikes
    );
  };


    return (
    <Card className='mb-6'>
        <CardHeader className='flex flex-col p-3'>
            <CardTitle className='text-center flex justify-start items-center'>
                <span className='mr-2 overflow-hidden bg-white'>
                    <img 
                    src={image6} 
                    className='w-10 h-10 border-2 border-slate-500 object-cover rounded-full'/>
                </span>
                <span>Guest User</span>
            </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
            <img src={data.photos ? data.photos[0].cdnUrl : "" }/>
        </CardContent>
        <CardFooter className='flex flex-col p-3'>
            <div className='flex justify-between w-full mb-3'>
                <HeartIcon className={cn("mr-3", "cursor-pointer", likesInfo.isLike ? "fill-red-500 stroke-red-500" : "fill-none")}
                onClick={() => updateLike(!likesInfo.isLike)}/>
                <MessageCircle className='mr-3'/>
            </div>
            <div className='w-full text-sm'>{likesInfo.likes} Likes</div>
            <div className='w-full text-sm'>
                <span>Guest User</span>: {data.caption}
            </div>
        </CardFooter>
    </Card>
  )
}

export default PostCard
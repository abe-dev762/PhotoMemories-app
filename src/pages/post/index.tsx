import React from 'react';
import Layout from '@/components/ui/layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/fileUploader';
import { useUserAuth } from '@/context/UserAuthContext';
import type { FileEntry, Post } from '@/types';

interface createPostProps {}




const createPost: React.FunctionComponent<createPostProps> = () => {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Upload file entry: ", fileEntry);
    console.log("The create post is: ", post);
  }
  

  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='border w-[50vw] pl-[4vw]'>
          <h3 className='bg-slate-800 text-lg text-center text-white p-2 px-4'>
            Post Your Memories
          </h3>
          <div className='p-8'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='caption'>
                  Photo Caption
                </Label>
                <Textarea 
                className='mb-8'
                id='caption'
                placeholder='What`s your photos story ?'
                value={post.caption}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                  setPost({ ...post, caption: e.target.value})
                }
                />
                <div className='flex flex-col mx-auto'>
                  <Label className='mb-4 pr-2' htmlFor='photo'>Photos</Label>
                </div>
                  <div className='mx-auto'>
                  <FileUploader 
                  fileEntry={fileEntry} onChange={setFileEntry}/>
                  <Button className='mt-8 w-32' type='submit'>Post</Button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default createPost;
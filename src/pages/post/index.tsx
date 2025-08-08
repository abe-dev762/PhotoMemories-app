import React from 'react';
import Layout from '@/components/ui/layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/fileUploader';
import { useUserAuth } from '@/context/UserAuthContext';
import type { FileEntry, PhotoMeta, Post } from '@/types';
import { createPost } from '@/firebaseDb/postService';
import { useNavigate } from 'react-router-dom';

interface CreatePostProps {}

const CreatePost: React.FunctionComponent<CreatePostProps> = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });
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

    if (fileEntry.files.length === 0) {
      console.warn("No files selected, please select at least one photo");
      return;
    }
    
    const photoMeta: PhotoMeta[] = fileEntry.files.map((file) => ({
      cdnUrl: file.cdnUrl ?? "",
      uuid: file.uuid ?? "",
    }));

    if (!user) {
      console.warn("No user found. Please log in to post.");
      return;
    }
    if (user != null) {
    const newPost: Post = {
      ...post,
      userId: user.uid,
      photos: photoMeta,
      date: new Date(),
      };

    console.log("The final post is: ", newPost);
    await createPost(newPost);
    navigate("/");

    } else {
      navigate("/login");
    }

    setPost({
      caption: "",
      photos: [],
      likes: 0,
      userLikes: [],
      userId: null,
      date: new Date(),
    });
    setFileEntry({ files: [] });

  };

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
                  onChange={(e) =>
                    setPost({ ...post, caption: e.target.value })
                  }
                />
                <div className='flex flex-col mx-auto'>
                  <Label className='mb-4 pr-2' htmlFor='photo'>
                    Photos
                  </Label>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
                  <Button
                    className='mt-8 w-32'
                    type='submit'
                    disabled={fileEntry.files.length === 0}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
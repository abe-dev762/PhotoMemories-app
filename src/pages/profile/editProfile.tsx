import FileUploader from '@/components/fileUploader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Layout from '@/components/ui/layout'
import { Textarea } from '@/components/ui/textarea'
import type { FileEntry, UserProfile } from '@/types'
import React from 'react'
import { useLocation } from 'react-router-dom'


interface IEditProfileProps {}

const EditProfile: React.FC<IEditProfileProps> = () => {
    const location = useLocation();
    const { id, userId, userBio, displayName, photoURL } = location.state;

    const initialUserVal = {
        userId,
        userBio,
        displayName,
        photoURL,
    };
    const [data, setData] = React.useState<UserProfile>(initialUserVal); 
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });

    const handleUpdateProfile = () => {

    };

    return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='border w-[50vw] pl-[4vw]'>
          <h3 className='bg-slate-800 text-lg text-center text-white p-2 px-4'>
            Edit Profile
          </h3>
          <div className='p-8'>
            <form onSubmit={handleUpdateProfile}>
              <div className='flex flex-col mx-auto'>
                  <Label className='mb-4 pr-2' htmlFor='photo'>
                    Profile pic
                  </Label>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
            
                </div>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='profilePicture'>
                  Profile picture 
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
                <Button
                    className='mt-8 w-32'
                    type='submit'
                    disabled={fileEntry.files.length === 0}
                  >
                    Post
                  </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditProfile
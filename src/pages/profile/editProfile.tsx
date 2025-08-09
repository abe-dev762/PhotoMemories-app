import FileUploader from '@/components/fileUploader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Layout from '@/components/ui/layout'
import { Textarea } from '@/components/ui/textarea'
import type { FileEntry, UserProfile } from '@/types'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import avatar from '@/assets/default-avatar.png';
import { Input } from '@/components/ui/input'
import { createUserProfile, updateUserProfile } from '@/firebaseDb/userService'


interface IEditProfileProps {}

const EditProfile: React.FC<IEditProfileProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, userId, userBio, displayName, photoURL } = location.state;

    const initialUserVal = {
        userId,
        userBio,
        displayName,
        photoURL,
    };
    const [data, setData] = React.useState<UserProfile>(initialUserVal); 
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });

    const handleUpdateProfile = async (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (id) {
          const response = await updateUserProfile(id, data);
        } else {
          const response = await createUserProfile(data);
        }
      } catch (error) {
        console.log(error)
      }
    };
    React.useEffect(() => {
      if(fileEntry.files.length > 0) {
        setData({ ...data, photoURL: fileEntry.files[0].cdnUrl || ""});
      }
    }, [fileEntry]);

    return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='border w-[50vw] pl-[4vw]'>
          <h3 className='bg-slate-800 text-lg text-center text-white p-2 px-4'>
            Edit Profile
          </h3>
          <div className='p-8'>
            <form onSubmit={handleUpdateProfile}>
              <div className='container flex flex-col justify-center items-center'>
                  <div className='py-2'>
                  <Label className='mb-4 pr-2' htmlFor='profilePicture'>
                    Profile picture
                  </Label>
                  </div>
                  <div className='mb-4'>
                    {fileEntry.files.length > 0 ? 
                    <img
                      className='w-28 h-28 rounded-full border-2 border-zinc-600 object-cover'
                      alt='avatar'
                      src={fileEntry.files[0].cdnUrl!}
                      onError={(e) => {
                      e.currentTarget.src = avatar
                    }}/> : 
                    <img
                      className='w-28 h-28 rounded-full border-2 border-zinc-600 object-cover'
                      alt='avatar'
                      src={data.photoURL ? data.photoURL : avatar}
                      onError={(e) => {
                      e.currentTarget.src = avatar
                    }}/> }
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center mb-4'>
                  <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false}/>
                </div>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='displayName'>
                  Display Name
                </Label>
                <Input 
                 className='mb-8'
                 id='displayName'
                 placeholder='Enter your username'
                 value={data.displayName}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, displayName: e.target.value })
                 }}
                />
                </div>
                <div className='flex flex-col'>
                  <Label className='mb-4' htmlFor='userBio'>
                    Profile Bio
                  </Label>
                  <Textarea
                    className='mb-8'
                    id='userBio'
                    placeholder='Tell the world about yourself'
                    value={data.userBio}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setData({ ...data, userBio: e.target.value })
                    }
                  />
                </div>
                <Button
                    className='mt-8 w-32 mr-8'
                    type='submit'
                  >
                    Save Change
                  </Button>
                  <Button
                    variant='destructive'
                    className='mt-8 w-32 mr-8'
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>
              
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditProfile
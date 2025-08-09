import FileUploader from '@/components/fileUploader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Layout from '@/components/ui/layout';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import avatar from '@/assets/default-avatar.png';
import type { FileEntry, UserProfile } from '@/types';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserProfile, updateUserProfile } from '@/firebaseDb/userService';
import { useUserProfile } from '@/context/UserProfileContext';


interface EditProfileProps{}


const EditProfile: React.FC<EditProfileProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, userId, userBio, displayName, photoURL } = location.state || {};

  const [data, setData] = React.useState<UserProfile>({
    userId: userId || '',
    userBio: userBio || '',
    displayName: displayName || '',
    photoURL: photoURL || '',
  });

  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });
  const [saving, setSaving] = React.useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) {
        await updateUserProfile(id, data);
      } else {
        await createUserProfile(data);
      }
      // No need to manually refresh context — onSnapshot will do it
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  React.useEffect(() => {
    if (fileEntry.files.length > 0) {
      setData((prev) => ({
        ...prev,
        photoURL: fileEntry.files[0].cdnUrl || "",
      }));
    }
  }, [fileEntry]);

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="border w-[50vw] pl-[4vw]">
          <h3 className="bg-slate-800 text-lg text-center text-white p-2 px-4">
            Edit Profile
          </h3>
          <div className="p-8">
            <form onSubmit={handleUpdateProfile}>
              <div className="container flex flex-col justify-center items-center">
                <Label className="mb-4 pr-2" htmlFor="profilePicture">
                  Profile picture
                </Label>
                <div className="mb-4">
                  <img
                    className="w-28 h-28 rounded-full border-2 border-zinc-600 object-cover"
                    alt="avatar"
                    src={
                      fileEntry.files.length > 0
                        ? fileEntry.files[0].cdnUrl!
                        : data.photoURL || avatar
                    }
                    onError={(e) => {
                      e.currentTarget.src = avatar;
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-4">
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false} />
              </div>

              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="displayName">
                  Display Name
                </Label>
                <Input
                  className="mb-8"
                  id="displayName"
                  placeholder="Enter your username"
                  value={data.displayName}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, displayName: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="userBio">
                  Profile Bio
                </Label>
                <Textarea
                  className="mb-8"
                  id="userBio"
                  placeholder="Tell the world about yourself"
                  value={data.userBio}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, userBio: e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-4 mt-8">
                <Button type="submit" className="w-32">
                  Save Change
                </Button>
                <Button
                  variant="destructive"
                  className="w-32"
                  type="button"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
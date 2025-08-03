import React from 'react';
import Layout from '@/components/ui/layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface createPostProps {}

const createPost: React.FunctionComponent<createPostProps> = (props) => {
  return (
    <Layout>
      <div className='flex justify-center items-center'>
        <div className='border w-[50vw] pl-[4vw]'>
          <h3 className='bg-slate-800 text-lg text-center text-white p-2 px-4'>
            Post Your Memories
          </h3>
          <div className='p-8'>
            <form>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='caption'>
                  Photo Caption
                </Label>
                <Textarea 
                className='mb-8'
                id='caption'
                placeholder='What`s your photos story ?'/>
                <div className='flex flex-col'>
                  <Label className='mb-4' htmlFor='photo'>Photos</Label>
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
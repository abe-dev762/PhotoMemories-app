import React from 'react'
import image1 from '@/assets/image1.jpg';
import image2 from '@/assets/image2.jpg';
import image3 from '@/assets/image3.jpg';
import image4 from '@/assets/image4.jpg';
import image5 from '@/assets/image5.jpg';
import image6 from '@/assets/image6.jpg';



interface IStoriesProps {
    
}

const Stories: React.FC<IStoriesProps> = () => {
  return <div className='flex justify-between'>
    <img src={image1} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
    <img src={image2} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
    <img src={image3} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
    <img src={image4} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
    <img src={image5} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
    <img src={image6} className='w-20 h-20 rounded-full border-3 border-slate-500 object-cover'/>
  </div>
}

export default Stories;
import React from 'react'
import homeIcon from '@/assets/icons/home.svg';
import addIcon from '@/assets/icons/add.svg';
import photosIcon from '@/assets/icons/photos.svg';
import profileIcon from '@/assets/icons/profile.svg';
import settingIcon from '@/assets/icons/setting.svg';
import notificationIcon from '@/assets/icons/notification.svg'
import logOutIcon from '@/assets/icons/logout.svg';
import { useUserAuth } from '@/context/UserAuthContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';


interface ISidebarProps {}

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: homeIcon
  },
  {
    name: "Add Photos",
    link: "/post",
    icon: addIcon
  },
  {
    name: "My Photos",
    link: "/myphotos",
    icon: photosIcon
  },
  {
    name: "Profile",
    link: "/profile",
    icon: profileIcon
  },
  {
    name: "Setting",
    link: "#",
    icon: settingIcon
  },
  {
    name: "Notification",
    link: "#",
    icon: notificationIcon
  },
];

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
  const { pathname } = useLocation();
  const { logOut } = useUserAuth();
  return (
    <nav className='flex flex-col relative h-screen max-w-sm w-full'>
      <div className='flex justify-center m-5'>
        <div className='text-white text-lg'>
          Photo Memories
        </div>
      </div>
        {navItems.map((item) => (
          <div className={cn(buttonVariants({ variant: "default" }),
            pathname === item.link ? 
            "bg-white text-gray-700 hover:bg-white rounded-none" : 
            "hover:bg-slate-900 hover:text-white bg-transparent rounded-none",
            "justify-start"
           )} key={item.name}>
            <Link to={item.link} className='flex'>
              <span><img 
              className='w-5 h-5 mr-2' 
              alt={item.name} 
              src={item.icon}
              style={{filter: `${
                pathname === item.link ? "invert(0)" : "invert(1)"
              }`}}/></span>
              <span>{item.name}</span>
            </Link>
          </div>
        ))}
        <div className={cn(buttonVariants({ variant: "default" }),
            pathname === "/login" ? 
            "bg-white text-gray-700 hover:bg-white rounded-none" : 
            "hover:bg-slate-900 hover:text-white bg-transparent rounded-none",
            "justify-start"
           )} >
            <Link to="/login" className='flex' onClick={logOut}>
              <span><img 
              className='w-5 h-5 mr-2' 
              alt='Log Out' 
              src={logOutIcon}
              style={{filter: `${
                pathname === "/login" ? "invert(0)" : "invert(1)"
              }`}}/></span>
              <span>Log Out</span>
            </Link>
          </div>
    </nav>
  )
}

export default Sidebar;
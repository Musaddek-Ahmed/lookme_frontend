import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io';
import { HiChevronDown } from "react-icons/hi2";
import { categories } from '../utils/data';


import logo from '../assets/logo.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-sky-600 hover:text-blue-600 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 text-blue-900 font-bold border-r-2  border-amber-400 transition-all duration-200 ease-in-out capitalize';




const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link 
        to="/" 
        className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-16" />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
          to="/"
          
          className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
          onClick={handleCloseSidebar}
          >
            <RiHomeFill/>
            Home
          </NavLink>
          <div className='flex items-center'>
          <h3 className='mt-2 pl-5 pr-2 text-sm font-bold 2xl:text-xl '>Discover Categories</h3>
          <HiChevronDown className='mt-3 font-bold'/>
          </div>
          
            {categories.slice(0, categories.length - 1).map((category)=>( 
             <NavLink 
             to={`/category/${category.name}`}
             
             className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
             onClick={handleCloseSidebar}
             key={category.name}
             >
              <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt='category' />
             {category.name}
             </NavLink> 
            ))}
          
        </div>
      </div>
      {user && (
        <Link
         to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-blue-900 rounded-lg shadow-lg mr-3 ml-3'
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile' />
          <p className='text-yellow-400 text-sm'>{user.userName}</p>
          <IoIosArrowForward className='text-yellow-400'/>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
import React from 'react';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';


const Pin = ({pin: {postedBy, image, _id, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false);
  
  const navigate = useNavigate();
  
  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item)=> item.postedBy === user?.googleId))?.length;
  const savePin = (id) => {
    if(!alreadySaved){


      client
       .patch(id)
       .setIfMissing({save: []})
       .insert('after', 'save[-1]', [{
        _key:uuidv4(),
        userId: user?.googleId,
        postedBy: {
       _type: 'postedBy',
       _ref: user?.googleId
        }
       }])
       .commit()
       .then(()=> {
        window.location.reload();

       })
    }
  }


  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
  }

  return (
    <div className='m-2'>
        <div
        onMouseEnter={()=> setPostHovered(true)}
        onMouseLeave={()=> setPostHovered(false)}
        onClick={()=> navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
          <img src={urlFor(image).width(850).url()} alt='user-post' className='rounded-lg w-full' />
          {postHovered && (
            <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{height: '100%'}}
            >
              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                  <a href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e)=> e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  
                  >
                    <MdDownloadForOffline/>
                  </a>
                </div>
                {alreadySaved ? (
                  <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-3 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                    {save?.length}Saved
                  </button>
                ):(
                  <button 
                  type='button'
                  onClick={(e) => {e.stopPropagation()
                  savePin(_id)}} 
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-3 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                    Save
                  </button>
                )}
              </div>
              <div className='flex justify-between items-center gap-1 w-full'>
                  {destination && (
                    <a
                    href={destination}
                    target='_blank'
                    rel='noreferrer'
                    className='bg-white flex items-center gap-2 text-black font-bold p-1 pl-2 pr-2 rounded-full opacity-70 hover:100 hover:shadow-md'>
                      <BsFillArrowUpRightCircleFill/>
                      {destination.slice(7, 17)}

                    </a>
                  )}
                  {postedBy?.id === user?.googleId && (
                    <button
                    type = 'button'
                    onClick = {(e) => {
                      e.stopPropagation()
                      deletePin(_id)
                    }}
                    className='bg-white p-2  opacity-70 hover:opacity-100 font-bold px-1 py-1 text-dark text-base rounded-3xl hover:shadow-md outlined-none'
                    >
                        <MdDelete />
                    </button>
                  )}
              </div>
            </div>
          )}

        </div> 
        <Link 
        to={`user-profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
        >
          <img src={postedBy?.image} alt="user-profile" className='w-7 h-7 rounded-full object-cover' />
          <p className='font-md text-sm capitalize'>{postedBy?.userName}</p>
        </Link> 
    </div>
  )
}

export default Pin
import React from 'react';
import {MutatingDots} from 'react-loader-spinner';


const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <MutatingDots
        type='Circles'
        color='#181174'
        secondaryColor='#f9b303'
        height={100}
        width={100}
        radius="12.5"
        className='m-5'
        />
        
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
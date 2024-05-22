import React from 'react'
// import GoogleLogin from 'react-google-login-ng'
import { useNavigate } from 'react-router-dom'
// import { GoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'google-login-react';
import shareVideo from '../assets/backVideo.mp4'
import logo from '../assets/logoWhite.png'
import { client } from '../client';

const Login = () => {
const navigate = useNavigate();

const responseGoogle = (res) => {
    localStorage.setItem('user', JSON.stringify(res));
    const { name, sub, picture } = res;
    // console.log("Google Sign-In Response:", res);
    const doc = {
      _id: sub,
      _type: 'user',
      username: name,
      image: picture,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('home', {replace: true})
      })
}
// const responseGoogle = (response) => {
//   console.log("Google Sign-In Response:", response);
//   // Access Google ID like this:
//   const googleId = response?.profileObj?.googleId;
//   console.log("Google ID:", googleId);
// };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full '>
        <video 
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className='shadow-2xl bg-white rounded-md'>
            {/* <GoogleLogin 
              // onSuccess={credentialResponse => {
              //   console.log(credentialResponse);
              // }}
              // onError={() => {
              //   console.log('Login Failed');
              // }}
            // clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
            /> */}
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                onSuccess={responseGoogle}
                onError={(err) => console.log(err)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser, uploadImage } from '../config/firebase/firebasemethods'
import Navbar from '../components/navBar';


const Register = () => {
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const profileImage = useRef();


  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const loginUserFromFirebase = async (event) => {
    event.preventDefault()
    setloading(true)

    const userProfileUrl = await uploadImage(profileImage.current.files[0], email.current.value)
    console.log(userProfileUrl);


    const registerUserData = await signUpUser({
      fullname: fullname.current.value,
      email: email.current.value,
      password: password.current.value,
      userProfileUrl: userProfileUrl
    })
    console.log('user register succesfully', registerUserData);
    navigate('/login')
    setloading(false)



  }


  return (
    <>
      {/* <Navbar  Register="Register"/> */}
      <div>
        <section className='container mx-auto p-4'>
          <div className='login-section max-w-md mx-auto mt-[160px] lg:mt-[100px] first:md:mt-[70px] bg-white shadow-lg p-6 rounded-lg'>
            <h1 className='text-center text-3xl font-bold'>Register</h1>
            <form onSubmit={loginUserFromFirebase} className='flex flex-col gap-4'>
              <input type="text" placeholder="Enter your full Name" ref={fullname} required
                className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <input type="email" placeholder="Enter your Email" ref={email} required
                className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <input type="password" placeholder="Enter your password" ref={password} required
                className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <input type="file" placeholder="Upload your profile Picture" ref={profileImage} required
                className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
              <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600' type="submit">Register</button>

            </form>
            <Link to='/login' className="text-center text-blue-500 hover:underline mt-4">
              ALREADY A USER? PLEASE LOGIN
            </Link>
          </div>
        </section>
      </div>

    </>

  );
};

export default Register;

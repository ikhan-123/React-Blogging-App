import { useForm } from "react-hook-form"
import React from 'react'
import { loginUser } from '../config/firebase/firebasemethods'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const navigate = useNavigate()


  const loginUserFromFirebase = async (data) => {
    console.log(data);
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password
      })
      console.log(userLogin);
      navigate('/DashBoard')

    } catch (error) {
      console.log(error);

    }

  }


  return (

    <>
      <section className="container mx-auto p-4">
        <div className="login-section mt-[200px] lg:mt-[100px] first:md:mt-[100px] max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
          <h1 className="text-center text-3xl font-bold">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(loginUserFromFirebase)}>
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input type="email" placeholder='Eter your Email' {...register("email", { required: true })} required
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <span className='text-danger'>This field is required</span>}

            <label htmlFor="email" className="text-lg font-medium">
              Password
            </label>
            <input type="password" placeholder='Enter your Password' {...register("password", { required: true })} required
              className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.password && <span className='text-danger'>This field is required</span>}

            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" type='submit'>login</button>
          </form>
          <Link to='/register' className="text-center text-blue-500 hover:underline mt-4" >
            NOT A USER? PLEASE REGISTER FIRST
          </Link>
        </div>
      </section>
    </>
  )
}

export default Login
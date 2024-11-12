import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, signOutUser } from '../config/firebase/firebasemethods'
import { onAuthStateChanged } from 'firebase/auth'

const Navbar = ({ profile, login, register, dashboard, username }) => {
  const [checkuser, setcheckuser] = useState(null)


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('If user are logged in?');
        setcheckuser(user)

      } else {
        console.log('User kahin kaam se chala giya');
        setcheckuser(false)

      }
    })
  }, [])
























  // // useNavigate
  // const navigate = useNavigate()

  // const logoutUser = async () => {
  //   const user = await signOutUser();
  //   // setIsUser(false)
  //   console.log(user);
  //   navigate('login')
  // }

  return (
    <>

      <section>
        <nav className="p-4 text-white mx-auto container flex justify-between items-center">
          <div>
            Personal Blogging App
          </div>
          <div>
            <ul className='flex gap-2 items-center'>
              <li> <Link to='/profile'></Link> </li>
              <li>{checkuser ? <AccountMenu /> : <Link to='/login'>{login}</Link>} </li>
              <li> <link to='register'>{register}</link></li>

            </ul>
          </div>
        </nav>
      </section>



    </>
  )
}

export default Navbar
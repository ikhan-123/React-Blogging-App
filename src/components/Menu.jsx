import * as React from 'react';
import { signOutUser } from '../Config/firebase/FirebaseMethod';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Config/firebase/FirebaseMethod';
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

export default function AccountMenu() {
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Get data from Firebase
    const [SingalUserData, setSingalUserData] = React.useState([]);

    React.useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(collection(db, "users"), where("id", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        setSingalUserData(doc.data());
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('User logged out');
            }
        });
    }, []);

    // Logout user
    function userLogout() {
        Swal.fire({
            title: 'Success!',
            text: 'You have logged out successfully',
            icon: 'success',
            confirmButtonText: 'Logout',
            confirmButtonColor: '#234e94'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/dashbord');
            }
        });
        signOutUser();
        console.log('User logged out');
        navigate('/login');
    }

    // Navigate functions
    function addAnotherAccount() {
        navigate('/register');
    }
    function profilePage() {
        navigate('/profile');
    }
    function dashbordPage() {
        navigate('/dashbord');
    }
    function allBlogsPage() {
        navigate('/');
    }

    return (
        <React.Fragment>
            <div className="flex items-center text-center">
                <button
                    onClick={handleClick}
                    className="ml-2 flex items-center focus:outline-none"
                >
                    <div className="w-8 h-8">
                        <img
                            alt="hero"
                            src={SingalUserData.userProfile}
                            className="rounded-full"
                        />
                    </div>
                </button>
            </div>

            {open && (
                <div
                    className="absolute mt-1.5 right-14 bg-white shadow-lg rounded-lg z-50"
                    onMouseLeave={handleClose}
                >
                    <div className="py-2 px-4">
                        <button
                            onClick={profilePage}
                            className="flex items-center space-x-2 py-2 px-3 w-full hover:bg-gray-100 focus:outline-none"
                        >
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={allBlogsPage}
                            className="flex items-center space-x-2 py-2 px-3 w-full hover:bg-gray-100 focus:outline-none"
                        >
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <span>All Blogs</span>
                        </button>
                        <button
                            onClick={dashbordPage}
                            className="flex items-center space-x-2 py-2 px-3 w-full hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17.75L9.75 6.25M14.25 17.75L14.25 6.25"></path>
                            </svg>
                            <span>Dashboard</span>
                        </button>
                        <div className="border-t my-2"></div>
                        <button
                            onClick={addAnotherAccount}
                            className="flex items-center space-x-2 py-2 px-3 w-full hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>Add another account</span>
                        </button>
                        <button
                            onClick={userLogout}
                            className="flex items-center space-x-2 py-2 px-3 w-full hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

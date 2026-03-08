import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {LogOut, Menu, User, X} from 'lucide-react'
import { assets } from '../assets/assets';
import Sidebar from './Sidebar';

const MenuBar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);

    const {user, clearUser} = useContext(AppContext);
    // console.log(user);

 useEffect(() => {
       const handleClickOutside = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
            setShowDropDown(false);
        }
    }

    if(showDropDown) {
        document.addEventListener("mousedown", handleClickOutside);
       
    }

     return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
 },[showDropDown])

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropDown(false);
        navigate("/login");
    }

    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30'>

        {/* Left side - Menu button and title */}
        <div className='flex items-center gap-5'>
            <button onClick={() => setOpenSideMenu(!openSideMenu)} className='block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors'>
                {
                    openSideMenu ? (
                        <X className="text-2xl" />
                    ) : (
                        <Menu className='text-2xl' />
                    )
                }

            </button>

            <div className='flex items-center gap-2'>
                <img src={assets.logo} alt="logo" className='h-10 w-10' />
                <span className='text-lg font-medium text-black truncate'>Money Manager</span>

            </div>

        </div>

        {/* Right side - Avatar photo  */}
        <div className='relative' ref={dropDownRef}>

            <button 
            onClick={() => setShowDropDown(!showDropDown)}
            className='flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2'>

                {
                    user?.profileImageUrl
 ? (
                        <img src={user.profileImageUrl} alt="profile" className='w-full h-full rounded-full' />
                    ) : (
                        <User alt="profile" className='w-10 h-10 p-2 rounded-full' />
                    )
                }

            </button>

            {
                showDropDown && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>

                        <div className='px-4 py-3 border-b border-gray-100'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full'>
                                    <User className='w-4 h-4 text-purple-600' />

                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-medium text-gray-800 truncate'>
                                        {user?.fullName || "User Name"}
                                    </p>
                                    <p className='text-sm text-gray-500 truncate'>
                                        {user?.email || "User Email"}
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className='py-1'>
                            <button 
                            type='button'
                            onClick={handleLogout}
                             className='flex items-center cursor-pointer active:scale-95 gap-3 w-full px-4 py-2 text-sm text-gray-700 hover: bg-gray-50 transition-all duration-200'>
                                <LogOut className='w-4 h-4 text-gray-500' />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )
            }

        </div>

        {/* Mobile side menu  */}
        {openSideMenu ? (
            <div className='fixed transform translate-x-0 ease-in-out duration-300 left-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25 shadow-sm'>
                <Sidebar activeMenu={activeMenu} />
            </div>
        ):(
            <div className='fixed transform -translate-x-full ease-in-out duration-300 left-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25 shadow-sm'>
                <Sidebar activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default MenuBar
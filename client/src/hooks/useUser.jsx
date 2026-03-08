// import React, { useContext, useEffect } from 'react'
// import { AppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import { axiosConfig } from '../util/config';
// import { API_ENPOINTS } from '../util/apiEndpoints';

// const useUser = () => {
//     const {user, setUser, clearUser} = useContext(AppContext);
//     const navigate = useNavigate();

//     useEffect(() => {

//         console.log("Entered useUser");
//         if(user) {
//             return;
//         }

//         let isMounted = true;

//         const fetchUserInfo = async () => {

//             try {

//                 const response = await axiosConfig.get(API_ENPOINTS.USER_INFO)
//                 if(isMounted && response.data) {
//                     setUser(response.data);
//                     console.log("User: ",response.data);
//                 }
                
//             } catch (error) {
//                 console.log("Failed to fetch user info : ",error);
//                 if(isMounted) {
//                     clearUser();
//                     navigate("/login");
//                 }
                
//             }
//         }

//         fetchUserInfo();

//         return () => {
//             isMounted = false;
//         }
//     },[user,setUser,navigate,clearUser])


  
// }

// export default useUser
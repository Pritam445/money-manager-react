// import React, { createContext, useState } from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {

//     // const [user, setUser] = useState(() => {
//     //   const storedUser = localStorage.getItem("user");
//     //   return storedUser ? JSON.parse(storedUser) : null;
//     // });

//     const [user, setUser] = useState(null);

//   // Sync user to localStorage when it changes
//   // useEffect(() => {
//   //   if (user) {
//   //     localStorage.setItem("user", JSON.stringify(user));
//   //   }
//   // }, [user]);

//   const clearUser = () => {
//     setUser(null);
//     // localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   const contextValue = {
//     user,
//     setUser,
//     clearUser,
//   };

//   return (
//     <AppContext.Provider value={contextValue}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import React, { createContext, useEffect, useState } from "react";
import { axiosConfig } from "../util/config";
import { API_ENPOINTS } from "../util/apiEndpoints";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosConfig.get(API_ENPOINTS.USER_INFO);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </AppContext.Provider>
  );
};
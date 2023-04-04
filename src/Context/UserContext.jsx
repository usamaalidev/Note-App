import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext(0);
console.log(UserContext);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}

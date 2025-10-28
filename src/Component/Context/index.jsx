import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [totoEarnToken, setTotoEarnToken] = useState(null);

  return (
    <UserContext.Provider value={{ totoEarnToken, setTotoEarnToken }}>
      {children}
    </UserContext.Provider>
  );
};

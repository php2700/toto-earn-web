import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loanToken, setLoanToken] = useState(null);

  return (
    <UserContext.Provider value={{ loanToken, setLoanToken }}>
      {children}
    </UserContext.Provider>
  );
};

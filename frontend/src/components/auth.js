import { createContext, useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import LoginButton from "./login"; 
import LogoutButton from "./logout"; 

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);
  console.log('..............',user)

  useEffect(() => {
    
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <LoginButton />

        </div>
      ) : (
        
        <LogoutButton/>

      )}
    </AuthContext.Provider>
  );
};
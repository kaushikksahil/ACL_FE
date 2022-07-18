import { useEffect, useState } from "react";
import { UserContext } from "./create";
import jwt_decode from "jwt-decode";

export const UserContxtProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState({});
  // useState React hook
  useEffect(() => {
    let token = localStorage.getItem("token");
    const user = jwt_decode(token);
    setUserData(user.data);
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

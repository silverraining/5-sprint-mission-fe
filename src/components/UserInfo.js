import { useAuth } from "@/contexts/AuthProvider";
import { useState, useEffect } from "react";
export default function UserInfo() {
  const [user, setUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    setUser(auth?.user);
  }, [auth]);

  if (!user) return <p>Loading...</p>;

  return <p>{user.name}</p>;
}

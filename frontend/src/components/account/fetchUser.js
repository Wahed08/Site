import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import LoadingSpinner from "../util/LoadingSpinner";
import UserAccount from "../account/account";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const userId = useParams().userId;

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const Data = await fetch(`http://localhost:5000/api/users/${userId}`);
        const responseData = await Data.json();
        setUser(responseData.users);

        if (!Data.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <Container>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && user && <UserAccount user={user} />}
    </Container>
  );
};

export default Users;

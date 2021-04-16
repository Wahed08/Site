import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import LoadingSpinner from "../util/LoadingSpinner";
import UserAccount from "../account/account";
import { AuthContext } from "../context/auth-context";

const Users = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [userAll, setUserAll] = useState([]);
  const userId = useParams().userId;
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const Data = await fetch(`http://localhost:5000/api/users/${userId}`);
        const DataAll = await fetch("http://localhost:5000/api/users/");

        const responseData = await Data.json();
        setUser(responseData.users);

        const responseDataAll = await DataAll.json();
        setUserAll(responseDataAll.usersAll);

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

  //handling User delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    });
    const noUser = userAll.filter((user) => user.id !== id);
    setUserAll(noUser);
    history.push('/');
    auth.logout();
  };

  return (
    <Container>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && user && (
        <UserAccount user={user} userId={userId} handleDelete={handleDelete} />
      )}
    </Container>
  );
};

export default Users;

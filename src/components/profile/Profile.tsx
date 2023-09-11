import React, { useContext } from "react";
import { tokenContext } from "../../context/TokenContext";
import { AuthorizedProfile } from "./AuthorizedProfile";
import { UnauthorizedProfile } from "./UnauthorizedProfile";

const Profile: React.FC = () => {
  const { user, setToken } = useContext(tokenContext);

  if (user) {
    return <AuthorizedProfile user={user} setToken={setToken} />;
  } else {
    return <UnauthorizedProfile setToken={setToken}/>;
  }
};

export default Profile;

import React, { useState, useEffect } from "react";
import Users from "./components/users";
// import api from "./api";
import API from "./api";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then((res) => setUsers(res));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((el) => el._id !== userId));
  };

  const handleFavorit = (userId) => {
    setUsers((prev) =>
      prev.map((el) =>
        el._id === userId ? { ...el, favorit: !el.favorit } : el
      )
    );
  };
  return (
    <div>
      {users && (
        <Users
          users={users}
          handleDelete={handleDelete}
          handleFavorit={handleFavorit}
        />
      )}
    </div>
  );
};

export default App;

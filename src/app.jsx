import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(
    api.users.fetchAll().map((el) => {
      const elem = [{ ...el, favorit: false }];
      return elem[0];
    })
  );

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
  console.log("list users", users);
  return (
    <div>
      <Users
        users={users}
        handleDelete={handleDelete}
        handleFavorit={handleFavorit}
      />
    </div>
  );
};

export default App;

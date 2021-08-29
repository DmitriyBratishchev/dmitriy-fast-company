import React from "react";
import HeaderSumUsers from "./tableUsers/headerSumUsers";
import RowUser from "./tableUsers/rowUser";

const Users = ({ handleDelete, handleFavorit, users }) => {
  let renderFavorit = () => {
    return users.filter((el) => el.favorit).length;
  };

  return (
    <div>
      <HeaderSumUsers sum={users.length} />
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">в избранном: {renderFavorit()}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <RowUser
                  key={user._id}
                  user={user}
                  handleDelete={handleDelete}
                  handleFavorit={handleFavorit}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

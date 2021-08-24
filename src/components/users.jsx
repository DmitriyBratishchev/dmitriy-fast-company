import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handelDelete = (userId) => {
    setUsers((prev) => prev.filter((el) => el._id !== userId));
  };
  // delUser();
  console.log("list users", users);
  const renderPhrase = () => {
    const n = users.length % 10;
    return n === 2 || n === 3 || n === 4
      ? "человека тусанёт"
      : "человек тусанут";
  };
  return (
    <div>
      <h2>
        {users.length ? (
          <span className="badge bg-primary">
            {users.length} {renderPhrase()} с тобой:
          </span>
        ) : (
          <span className="badge bg-danger">Никто с тобой не тусанёт</span>
        )}
      </h2>
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.profession.name}</td>
                    <td>
                      {user.qualities.map((qualite) => {
                        return (
                          <span
                            key={qualite._id}
                            className={`badge bg-${qualite.color} m-1`}
                          >
                            {qualite.name}
                          </span>
                        );
                      })}
                    </td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handelDelete(`${user._id}`)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

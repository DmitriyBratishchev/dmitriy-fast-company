import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import HeaderSumUsers from "./tableUsers/headerSumUsers";
import RowUser from "./tableUsers/rowUser";

const Users = ({ handleDelete, handleFavorit, users: allUsers }) => {
  const [ curentPage, setCurentPage ] = useState(1);
  const renderFavorit = () => {
    return allUsers.filter((el) => el.favorit).length;
  };

  const countUsers = allUsers.length;
  const pageSize = 4;

  const hendelPageChange = (pageIndex) => {
    console.log(pageIndex);
    setCurentPage(pageIndex);
  };

  const users = paginate(allUsers, curentPage, pageSize);

  return (
    <div>
      <HeaderSumUsers sum={countUsers} />
      {countUsers !== 0 && (
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
            {users.map((user) => (
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
      <Pagination
        itemsCount={countUsers}
        pageSize={pageSize}
        curentPage={curentPage}
        onPageChange={hendelPageChange}
      />
    </div>
  );
};

Users.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleFavorit: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;

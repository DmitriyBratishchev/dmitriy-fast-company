import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import HeaderSumUsers from "./tableUsers/headerSumUsers";
import RowUser from "./tableUsers/rowUser";
import GroupList from "./groupList";
import API from "../api";

const Users = ({ handleDelete, handleFavorit, users: allUsers }) => {
  const [curentPage, setCurentPage] = useState(1);
  const [professions, setProfessions] = useState(null);
  const [selectedProf, setSelectedProf] = useState();

  const pageSize = 4;

  useEffect(() => {
    API.professions.fetchAll().then((res) => setProfessions(res));
  }, []);

  useEffect(() => {
    setCurentPage(1);
  }, [selectedProf]);

  const renderFavorit = () => {
    return allUsers.filter((el) => el.favorit).length;
  };

  const hendelProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const hendelPageChange = (pageIndex) => {
    setCurentPage(pageIndex);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession.name === selectedProf)
    : allUsers;
  const countUsers = filteredUsers.length;
  const users = paginate(filteredUsers, curentPage, pageSize);
  const clearSelected = () => {
    setSelectedProf();
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={hendelProfessionSelect}
          />
          <button className="btn btn-secondary pt-2" onClick={clearSelected}>
            Сбросить фильтр
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={countUsers}
            pageSize={pageSize}
            curentPage={curentPage}
            onPageChange={hendelPageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleFavorit: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;

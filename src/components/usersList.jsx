import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import HeaderSumUsers from "./tableUsers/headerSumUsers";
import GroupList from "./groupList";
import API from "../api";
import UserTable from "./userTable";
import _ from "lodash";
import TextField from "./textField";
// import NavBar from "./navBar";

const UsersList = () => {
  const [curentPage, setCurentPage] = useState(1);
  const [professions, setProfessions] = useState(null);
  const [selectedProf, setSelectedProf] = useState();
  const [search, setSaerch] = useState("");
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [users, setUsers] = useState();
  const pageSize = 4;

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

  const handleChange = (e) => {
    setSaerch(e.target.value);
    console.log("e", e);
  };

  useEffect(() => {
    API.professions.fetchAll().then((res) => setProfessions(res));
  }, []);

  useEffect(() => {
    setCurentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    if (users && curentPage > Math.ceil(users.length / pageSize)) {
      setCurentPage(Math.ceil(users.length / pageSize));
    }
  }, [users]);

  const renderFavorit = () => {
    return users.filter((el) => el.favorit).length;
  };

  const hendelProfessionSelect = (item) => {
    // setSaerch("");
    setSelectedProf(item);
  };

  const hendelPageChange = (pageIndex) => {
    setCurentPage(pageIndex);
  };

  const hendleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    console.log("search", typeof search);
    const filteredUsers = selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : search !== ""
        ? users.filter((user) => user.name.includes(search))
        : users;

    const countUsers = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, curentPage, pageSize);
    const clearSelected = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {/* <NavBar /> */}
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
          <TextField
            name="search"
            value={!selectedProf ? search : ""}
            placeholder="Поиск..."
            onChange={handleChange}
            onFocus={clearSelected}
          />
          {countUsers !== 0 && (
            <UserTable
              users={usersCrop}
              renderFavorit={renderFavorit}
              onSort={hendleSort}
              selectedSort={sortBy}
              handleFavorit={handleFavorit}
              handleDelete={handleDelete}
            />
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
  } else {
    return <h1>Loading . . . </h1>;
  };
};

export default UsersList;

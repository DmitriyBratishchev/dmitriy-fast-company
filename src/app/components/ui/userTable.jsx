import React from "react";
import PropTypes from "prop-types";
// import RowUser from "./tableUsers/rowUser";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import Favorit from "../common/favorit";
import Qualities from "./qualites";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  renderFavorit,
  handleFavorit,
  handleDelete
}) => {
  const columns = {
    name: {
      iter: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    profession: { iter: "profession.name", name: "Профессия" },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    complitedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    favorit: {
      iter: "favorit",
      name: "В избранном",
      func: renderFavorit(),
      component: (user) => <Favorit handleFavorit={handleFavorit} user={user} />
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  renderFavorit: PropTypes.func.isRequired,
  handleFavorit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default UserTable;

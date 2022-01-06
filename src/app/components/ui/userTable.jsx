import React from "react";
import PropTypes from "prop-types";
import Favorit from "../common/favorit";
import Qualities from "./qualites";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  renderFavorit,
  handleFavorit
}) => {
  const columns = {
    name: {
      iter: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualitiesId={user.qualities} />
    },
    profession: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    complitedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    favorit: {
      iter: "favorit",
      name: "В избранном",
      func: renderFavorit(),
      component: (user) => <Favorit handleFavorit={ handleFavorit } user={ user } />
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
  handleFavorit: PropTypes.func.isRequired
};

export default UserTable;

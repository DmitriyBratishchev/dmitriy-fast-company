import React from "react";

const RowUser = ({ user, handleFavorit, handleDelete }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.profession.name}</td>
      <td>
        {user.qualities.map((qualite) => {
          return (
            <span key={qualite._id} className={`badge bg-${qualite.color} m-1`}>
              {qualite.name}
            </span>
          );
        })}
      </td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <i
          onClick={() => handleFavorit(user._id)}
          className={
            user.favorit ? "bi bi-bookmark-fill text-success" : "bi bi-bookmark"
          }
        ></i>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(`${user._id}`)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default RowUser;

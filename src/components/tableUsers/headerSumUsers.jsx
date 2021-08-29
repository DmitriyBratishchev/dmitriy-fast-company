import React from "react";
import { renderPhrase } from "../../particales/renderPhrase";

const HeaderSumUsers = ({ sum }) => {
  return (
    <h2>
      {sum ? (
        <span className="badge bg-primary">
          {sum} {renderPhrase(sum)} с тобой:
        </span>
      ) : (
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      )}
    </h2>
  );
};

export default HeaderSumUsers;

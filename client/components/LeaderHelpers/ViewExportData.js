import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSessions } from "../../store/allSessions";
import "./HomeLead.css";
import { formatDate, formatDateNew } from "../utils/formatDate";
import { fetchUsers } from "../../store/users";

export const ViewExportData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessions = useSelector((state) => state.sessions.allSessions);
  const loading = useSelector((state) => state.sessions.loading);
  const users = useSelector((state) => state.users.users) ?? [];

  useEffect(() => {
    dispatch(fetchAllSessions());
    dispatch(fetchUsers());
  }, [dispatch]);

  const getUser = (userId) => {
    return users?.find((u) => u.id === userId);
  };

  return (
    <div className="AllUsersMainContainer">
      <p className="columnTitle">View/Export Data</p>
      <div className="table-container">
        {loading ? (
          "Loading..."
        ) : (
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Station</th>
                <th>Level</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Units</th>
                <th>Technician</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(sessions) && sessions?.map((session) => {
                const user = getUser(session.userId);
                return (
                  <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{session.station}</td>
                    <td>{session.level}</td>
                    <td>{formatDateNew(session.startedRunAt)}</td>
                    <td>{formatDateNew(session.endedRunAt)}</td>
                    <td>{session.unitsCount}</td>
                    <td>{user ? `${user.username}` : session.userId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <button className="btn btn-red" onClick={() => navigate("/home")}>
        Go Back
      </button>
    </div>
  );
};

export default ViewExportData;

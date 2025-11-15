import React from "react";

const DeleteTask = ({ taskId, onClose, onTaskAdded }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      if (typeof onTaskAdded === "function") onTaskAdded();
      if (typeof onClose === "function") onClose();
      //   setTask("");
    } else {
      alert(data.message || "Error deleting task");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTask;

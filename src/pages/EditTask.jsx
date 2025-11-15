import { useEffect, useState } from "react";

const EditTask = ({ taskId, onClose, onTaskAdded }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const token = localStorage.getItem("token");
  // console.log(task);
  function formatDateTime(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    // Fetch current task data
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTask({
        ...data,
        startTime: formatDateTime(data.startTime),
        endTime: formatDateTime(data.endTime),
      });
      console.log(data);
    };

    fetchTask();
  }, [taskId, token]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  //handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check time validity
    if (new Date(task.endTime) < new Date(task.startTime)) {
      alert("End time cannot be earlier than start time!");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Task updated successfully!");
      setTask({ title: "", description: "" });
      if (typeof onTaskAdded === "function") onTaskAdded();
      if (typeof onClose === "function") onClose();
      //   setTask("");
    } else {
      alert(data.message || "Error updating task");
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div>
            <label htmlFor="tasktitle">Task title</label>
            <br />
            <input
              type="text"
              id="tasktitle"
              placeholder="Task Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              className="border p-px"
            />
          </div>
          <br />
          <div>
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              id="description"
              placeholder="Description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="border"
            ></textarea>
          </div>
          <br />
          <div>
            <label htmlFor="startTime">Start time</label>
            <br />
            <input
              type="datetime-local"
              name="startTime"
              id="startTime"
              value={task.startTime}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="endTime">End time</label>
            <br />
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={task.endTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <button
          type="submit"
          className="px-3 py-2 rounded text-white bg-blue-500 cursor-pointer hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTask;

import { useState } from "react";

const AddTask = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  //   console.log(description);

  console.log("start", startTime);
  console.log("end", endTime);

  const handleAdd = async (e) => {
    e.preventDefault();
    // Check time validity
    if (new Date(endTime) < new Date(startTime)) {
      alert("End time cannot be earlier than start time!");
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, startTime, endTime }),
    });

    const data = await res.json();
    if (res.ok) {
      setTitle("");
      setDescription("");
      if (typeof onTaskAdded === "function") onTaskAdded();
      if (typeof onClose === "function") onClose();
    }

    console.log(data);
  };

  return (
    <div className="">
      <form onSubmit={handleAdd}>
        <div className="">
          <div>
            <label htmlFor="tasktitle">Task title</label>
            <br />
            <input
              type="text"
              id="tasktitle"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border"
            ></textarea>
          </div>
          <br />
          <div>
            <label htmlFor="starttime">Start time</label>
            <br />
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border"
            />
          </div>
          <br />
          <div>
            <label htmlFor="endtime">End time</label>
            <br />
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border"
            />
          </div>
          <br />
        </div>
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

export default AddTask;

import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
// import { useNavigate } from "react-router";

// import { Link } from "react-router";

const Tasks = () => {
  // const navigate = useNavigate();
  const [tasks, setTask] = useState([]);
  const [open, setOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  function formatReadable(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // console.log(data);
      setTask(data);
      // setTask([])
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  //add action button
  const handleClick = (id) => {
    // console.log(id);
    setOpen(open === id ? null : id);
  };

  //edit task
  const handleEdit = (id) => {
    setTaskId(id);
    setEditTask(true);
    setOpen(null);
  };

  //log out
  // const logout = () => {
  //   if (!window.confirm("Are you sure you want to log out")) return;
  //   localStorage.clear();
  //   navigate("/login");
  // };
  const toggleComplete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedTask = await res.json();

    // Update tasks in state
    setTask((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  function getTaskStatus(tasks) {
    const now = new Date();
    const start = new Date(tasks.startTime);
    const end = new Date(tasks.endTime);

    if (tasks.completed) return "completed";
    if (start > now) return "not-started"; // NEW
    if (now >= start && now <= end) return "active";
    if (now > end) return "overdue";

    return "unknown";
  }

  function getStatusColor(status) {
    switch (status) {
      case "active":
        return "border-green-500";
      case "completed":
        return "border-yellow-500";
      case "overdue":
        return "border-red-500";
      case "not-started":
        return "border-purple-500"; // NEW color
      default:
        return "border-gray-300";
    }
  }

  const filteredTasks = tasks
    .filter((task) => {
      const status = getTaskStatus(task);

      if (filter === "all") return true;
      return status === filter;
    })
    .filter((task) => {
      // Search by title or description
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    });

  return (
    <div className="container relative">
      <div className=" ">
        <div className="bg-white p-4 min-h-screen ">
          <div className="flex gap-10 justify-between itmes-center pb-6 border-b border-gray-200 ">
            <div className="flex-none text-3xl font-bold ">Dashboard</div>
            <div className="grow">
              <input
                type="search"
                placeholder="Search tasks..."
                className="border rounded-full p-2 border-gray-200 focus:outline-gray-300 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-none size-10 bg-slate-100 rounded-full"></div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-xl font-semibold">My Tasks</div>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 rounded text-white bg-blue-500 cursor-pointer hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex mt-4 gap-12 border border-gray-200 py-2 px-3 rounded w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded ${filter === "active" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${filter === "completed" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("overdue")}
              className={`px-3 py-1 rounded ${filter === "overdue" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            >
              Overdue
            </button>
            <button
              onClick={() => setFilter("not-started")}
              className={`px-3 py-1 rounded ${filter === "not-started" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
            >
              Not Started
            </button>
          </div>

          <div className="grid gap-3 border mt-4 border-gray-200 rounded p-6">
            {tasks.length === 0 ? (
              <div className="text-gray-500  italic">
                You have not added any task yet
              </div>
            ) : (
              filteredTasks.map((task) => {
                const status = getTaskStatus(task);
                const borderColor = getStatusColor(status);
                return (
                  <div
                    key={task.id}
                    className={`border  px-3 py-4 relative rounded ${borderColor}`}
                  >
                    <div
                      className={`${open === task.id ? "grid gap-2 border border-gray-200 py-2 w-fit bg-white z-50  right-0 -top-15  absolute  rounded" : "hidden"}`}
                    >
                      <div
                        onClick={() => handleEdit(task.id)}
                        className="text-[0.70rem] italic text-sm text-gray-800 cursor-pointer p-3 py-px rounded hover:bg-gray-100"
                      >
                        Edit
                      </div>
                      <div className="text-[0.70rem] italic text-sm text-gray-800 cursor-pointer p-3 py-px rounded hover:bg-gray-100">
                        <DeleteTask
                          taskId={task.id}
                          onClose={() => setEditTask(false)}
                          onTaskAdded={fetchTasks}
                        />
                      </div>
                      {/* <div className="text-[0.70rem] italic text-gray-800  cursor-pointer p-3 py-px rounded hover:bg-gray-100">
                      Schedule
                    </div> */}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          className={`px-2 py-1 rounded text-white 
                        ${task.completed ? "bg-green-600" : "bg-gray-500"}`}
                          onClick={() => toggleComplete(task.id)}
                        >
                          {task.completed ? "Completed ✔" : "Mark Complete"}
                        </button>

                        <h2 className="capitalize font-semibold">
                          {task.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Status: {status}
                        </p>
                      </div>
                      <div
                        onClick={() => handleClick(task.id)}
                        className="cursor-pointer pb-4 tracking-[0.19rem]"
                      >
                        ...
                      </div>
                    </div>
                    <div className="">
                      <p className="first-letter:uppercase text-sm text-gray-500 mt-4 mb-4">
                        {task.description}
                      </p>
                      <div>
                        <p className="italic my-2">
                          Start time:{" "}
                          <span className="text-sm text-gray-500">
                            {formatReadable(task.startTime)}
                          </span>
                        </p>
                        <p className="italic">
                          End time:{" "}
                          <span className="text-sm text-gray-500">
                            {formatReadable(task.endTime)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/*Add task modal*/}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <AddTask
              onClose={() => setIsModalOpen(false)}
              onTaskAdded={fetchTasks}
            />
          </div>
        </div>
      )}

      {/*edit task modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
            <button
              onClick={() => setEditTask(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <EditTask
              taskId={taskId}
              onClose={() => setEditTask(false)}
              onTaskAdded={fetchTasks}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;

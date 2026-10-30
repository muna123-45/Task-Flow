import {
  LayoutDashboard,
  ListTodo,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  Bell,
  MoreVertical,
  CalendarDays,
  Target,
  Pencil,
  Trash2,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //add new task state.
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  });

  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  //create edit state
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  });

  const [editError, setEditError] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks from the backend
  async function fetchTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data.tasks);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch tasks. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleTaskChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  //create the api submit button
  async function handleCreateTask(e) {
    e.preventDefault();

    try {
      setSubmitting(true);
      setFormError("");

      const response = await api.post("/tasks", {
        ...formData,
        dueDate: formData.dueDate || null,
      });

      // Add the new task to the existing task list
      setTasks(function (previousTasks) {
        return [response.data.task, ...previousTasks];
      });

      // Reset the form
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        dueDate: "",
      });

      setShowTaskForm(false);
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Failed to create task. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  //create handle editClick function
  function handleEditClick(task) {
    setEditingTaskId(task._id);

    setEditFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
    });

    setEditError("");
    setShowEditForm(true);
  }

  //create handleEditChange function
  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  //create the update API function
  async function handleUpdateTask(e) {
    e.preventDefault();

    try {
      setUpdating(true);
      setEditError("");

      const response = await api.put(`/tasks/${editingTaskId}`, {
        ...editFormData,
        dueDate: editFormData.dueDate || null,
      });

      // Update the task in the dashboard
      setTasks(function (previousTasks) {
        return previousTasks.map(function (task) {
          return task._id === editingTaskId ? response.data.task : task;
        });
      });

      // Close the edit form
      setShowEditForm(false);
      setEditingTaskId(null);
    } catch (error) {
      setEditError(
        error.response?.data?.message ||
          "Failed to update task. Please try again.",
      );
    } finally {
      setUpdating(false);
    }
  }

  //create a delete handler
  async function handleDeleteTask(taskId) {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!isConfirmed) {
      return;
    }

    try {
      // Call the backend DELETE API
      await api.delete(`/tasks/${taskId}`);

      // Remove the deleted task from the frontend state
      setTasks(function (previousTasks) {
        return previousTasks.filter(function (task) {
          return task._id !== taskId;
        });
      });
    } catch (error) {
      console.error("Delete task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete task. Please try again.",
      );
    }
  }

  //Add a status change handler
  async function handleStatusChange(taskId, newStatus) {
    try {
      const response = await api.put(`/tasks/${taskId}`, {
        status: newStatus,
      });

      setTasks(function (previousTasks) {
        return previousTasks.map(function (task) {
          return task._id === taskId ? response.data.task : task;
        });
      });
    } catch (error) {
      console.error("Status update error:", error);

      alert(error.response?.data?.message || "Failed to update task status.");
    }
  }

  //create logout function
  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      return;
    }

    //remove jwt token
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  // Fetch tasks when the dashboard loads
  useEffect(function () {
    fetchTasks();
  }, []);

  // Calculate statistics from the actual tasks
  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Pending",
      value: tasks.filter((task) => task.status === "pending").length,
      icon: Clock3,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "In Progress",
      value: tasks.filter((task) => task.status === "in-progress").length,
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === "completed").length,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 md:flex">
      {/* Sidebar */}
      <aside className="w-full border-b border-gray-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-2 text-white">
            <CheckCircle2 size={25} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Task<span className="text-violet-600">Flow</span>
          </h1>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("Dashboard")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ${
              activeTab === "Dashboard"
                ? "bg-violet-600 text-white"
                : "text-gray-600 hover:bg-violet-50"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("My Tasks")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ${
              activeTab === "My Tasks"
                ? "bg-violet-600 text-white"
                : "text-gray-600 hover:bg-violet-50"
            }`}
          >
            <ListTodo size={20} />
            My Tasks
          </button>

          <button
            onClick={() => setActiveTab("Completed")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ${
              activeTab === "Completed"
                ? "bg-violet-600 text-white"
                : "text-gray-600 hover:bg-violet-50"
            }`}
          >
            <CheckCircle2 size={20} />
            Completed
          </button>
        </nav>

        <div className="mt-10 rounded-2xl bg-violet-50 p-4">
          <Target className="mb-3 text-violet-600" size={28} />

          <h3 className="font-semibold text-gray-900">Stay productive!</h3>

          <p className="mt-2 text-sm text-gray-500">
            Small steps every day lead to big results.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8">
        {/* Top Navbar */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Workspace / {activeTab}</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
              {activeTab === "Dashboard" ? "Dashboard Overview" : activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-100"
            >
              <Search size={20} />
            </button>

            <button
              aria-label="Notifications"
              className="rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-100"
            >
              <Bell size={20} />
            </button>

            <div className="flex items-center gap-3 rounded-xl bg-white p-2 pr-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                M
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">My Account</p>
                <p className="text-xs text-gray-500">TaskFlow User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 p-6 text-white md:p-8">
          <div>
            <p className="mb-2 text-sm text-violet-100">
              YOUR PRODUCTIVITY SPACE
            </p>

            <h2 className="text-2xl font-bold md:text-3xl">Welcome back! 👋</h2>

            <p className="mt-3 max-w-lg text-sm text-violet-100 md:text-base">
              Organize your tasks, track your progress, and achieve your goals
              one step at a time.
            </p>
          </div>

          <button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <Plus size={20} />
            Add New Task
          </button>
        </section>

        {/* create the add task form */}
        {showTaskForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Task
                </h2>

                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                {/* Task Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Task Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTaskChange}
                    placeholder="Enter task title"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleTaskChange}
                    placeholder="Enter task description"
                    rows="3"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleTaskChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleTaskChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleTaskChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Error Message */}
                {formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                  >
                    {submitting ? "Creating..." : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* create the Edit task form */}
        {showEditForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>

                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="text-2xl text-gray-400 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleUpdateTask} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Task Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={editFormData.dueDate}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                {/* Error */}
                {editError && (
                  <p className="text-sm text-red-500">{editError}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updating}
                    className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>

                    <h3 className="mt-3 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={25} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Task List */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Tasks</h3>

              <p className="mt-1 text-sm text-gray-500">
                Keep track of your daily activities.
              </p>
            </div>

            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              View All
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="py-8 text-center text-gray-500">
              Loading your tasks...
            </p>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="py-8 text-center">
              <p className="text-red-500">{error}</p>

              <button
                onClick={fetchTasks}
                className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && tasks.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No tasks yet. Create your first task!
            </p>
          )}

          {/* Actual Tasks */}
          {!loading && !error && tasks.length > 0 && (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-violet-200 hover:bg-violet-50/30 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-5 w-5 rounded-full border-2 ${
                        task.status === "completed"
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    />

                    <div>
                      <h4
                        className={`font-semibold ${
                          task.status === "completed"
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        {task.description || "No description"}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No due date"}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 font-medium ${
                            task.priority === "high"
                              ? "bg-red-50 text-red-600"
                              : task.priority === "medium"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-green-50 text-green-600"
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {task.status === "in-progress"
                        ? "In Progress"
                        : task.status === "completed"
                          ? "Completed"
                          : "Pending"}
                    </span>

                    <button
                      onClick={() => {
                        handleEditClick(task);
                      }}
                      aria-label={`Edit ${task.title}`}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        handleDeleteTask(task._id);
                      }}
                      aria-label={`Delete ${task.title}`}
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;

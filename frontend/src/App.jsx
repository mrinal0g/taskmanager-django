import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:8000/practice";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-tasks/`, {
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(`${API_BASE_URL}/check-auth/`, {
          withCredentials: true,
        });
        const authenticated = response.data.message;
        setIsLoggedIn(authenticated);
        if (authenticated) {
          await fetchTasks();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    }
    checkAuth();
  }, []);

  // --- NEW: Function to handle checking/unchecking a task ---
  async function handleToggleTask(taskId, currentStatus) {
    try {
      await axios.post(
        `${API_BASE_URL}/update-task/${taskId}/`,
        // Path variables
        {
          is_completed: !currentStatus, // Flip the current status
        },
        {
          withCredentials: true,
        },
      );

      // Refresh the list to reflect the new state from the database
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/`, user, {
        withCredentials: true,
      });
      if (response.data.message === "Login succesful") {
        setIsLoggedIn(true);
        await fetchTasks();
      }
      setUser({ username: "", password: "" });
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/sign-up/`, user, {
        withCredentials: true,
      });
      setUser({ username: "", password: "" });
      setIsSignup(false);
    } catch (error) {
      console.error("Error during sign up:", error);
      setUser({ username: "", password: "" });
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/logout/`,
        {},
        {
          withCredentials: true,
        },
      );
      setIsLoggedIn(false);
      setTasks([]);
      setUser({ username: "", password: "" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  async function handleSubmitTask(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/add-task/`,
        { title: title },
        { withCredentials: true },
      );
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  function handleTaskInput(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleDelete(taskId) {
    try {
      // localhost:8000 - API_BASE_URL
      // localhost:8000/delete-task/19
      const response = await axios.delete(
        `${API_BASE_URL}/delete-task/${taskId}/`,
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  if (isLoggedIn) {
    return (
      <main className="app-shell">
        <section className="task-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Task Manager</p>
              <h1>Welcome back</h1>
            </div>
            <button className="secondary-button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <form className="task-form" method="POST" onSubmit={handleSubmitTask}>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              placeholder="Add a new task"
              onChange={handleTaskInput}
            />
            <button className="primary-button">Add Task</button>
          </form>

          <div className="list-header">
            <h2>Your Tasks</h2>
            <span>{tasks.length} total</span>
          </div>

          <ul className="task-list">
            {tasks.length > 0 ? (
              // array.map - to render multiple elements
              tasks.map((task) => (
                <li className="task-item" key={task.id}>
                  {/* --- NEW: Checkbox to toggle completion --- */}
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() =>
                      handleToggleTask(task.id, task.is_completed)
                    }
                  />

                  {/* --- NEW: Strikethrough style if completed --- */}
                  <span
                    className={
                      task.is_completed ? "task-title completed" : "task-title"
                    }
                  >
                    {task.title}
                  </span>
                  <button
                    className="delete-button"
                    type="button"
                    aria-label={`Delete ${task.title}`}
                    onClick={() => handleDelete(task.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </li>
              ))
            ) : (
              <li className="empty-state">No tasks added yet.</li>
            )}
          </ul>
        </section>
      </main>
    );
  } else {
    return (
      <main className="app-shell auth-shell">
        <section className="auth-panel">
          <p className="eyebrow">Task Manager</p>
          <h1>{isSignup ? "Create your account" : "Login to continue"}</h1>
          <form
            className="auth-form"
            method="POST"
            onSubmit={isSignup ? handleSignUp : handleLogin}
          >
            <input
              type="text"
              name="username"
              value={user.username}
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleChange}
            />
            <button className="primary-button" type="submit">
              Submit
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Need an account? Sign up"}
            </button>
          </form>
        </section>
      </main>
    );
  }
};

export default App;

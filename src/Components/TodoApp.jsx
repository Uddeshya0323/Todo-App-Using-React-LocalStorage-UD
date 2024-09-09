import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
  FaPlay,
  FaPause,
  FaStop,
  FaGithub,
  FaLinkedin,
  FaLink
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoApp() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Quotes state
  const quotes = [
    "Don’t let yesterday take up too much of today.",
    "We don’t just sit around and wait for other people. We just make, and we do.",
    "Setting goals is the first step in turning the invisible into the visible.",
    "Learn as if you will live forever, live like you will die tomorrow.",
    "Either you run the day or the day runs you.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
      setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setCopyTasks(storedTasks);
  }, []);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + (Date.now() - startTime));
        setStartTime(Date.now());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newTask = {
        id: Date.now().toString(),
        text: input,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setCopyTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setInput("");
      toast.success("Task added successfully!");
    } else {
      toast.error("Please Enter a Task");
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setCopyTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!");
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setCopyTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task Completed Successfully!");
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTasks = copyTasks.filter((task) =>
      task.text.toLowerCase().includes(searchTerm)
    );
    setTasks(filteredTasks);
  };

  const handleUpdateTask = () => {
    if (updateTask && updateTask.text.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === updateTask.id ? updateTask : task
      );
      setTasks(updatedTasks);
      setCopyTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setUpdateTask(null);
      setShowModal(false);
      toast.success("Task Updated Successfully!");
    } else {
      toast.error("Task text cannot be empty.");
    }
  };

  const handleStopwatchToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setStopwatchTime((prevTime) => prevTime + (Date.now() - startTime));
    } else {
      setIsRunning(true);
      setStartTime(Date.now());
    }
  };

  const handleStopwatchReset = () => {
    setIsRunning(false);
    setStopwatchTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Filter tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-3xl bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200 p-6 rounded-lg shadow-md text-black relative">
        {/* Social Media Icons */}
        <div className="absolute top-4 right-4 flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 flex-wrap">
          <a
            href="https://github.com/Uddeshya0323"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-950 text-lg sm:text-xl md:text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/uddeshya-patel-a247611b2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-950 text-lg sm:text-xl md:text-2xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://uddeshya-personal-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-950 text-lg sm:text-xl md:text-2xl"
          >
            <FaLink />
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6 text-center">
          Task Manager
        </h1>

        {/* Rotating Quotes */}
        <div className="text-center mb-6">
          <blockquote className="italic text-base sm:text-lg font-serif font-thin">
            {quotes[currentQuoteIndex]}
          </blockquote>
        </div>

        <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 p-4 rounded-lg mb-6 shadow-md">
          <div className="flex justify-between mb-4">
            <div className="text-lg sm:text-xl font-semibold">
              {currentDate || "Loading date..."}
            </div>
            <div className="text-lg sm:text-xl font-semibold">
              {currentTime || "Loading time..."}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-bold mb-4">
              {formatTime(stopwatchTime)}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="primary"
                onClick={handleStopwatchToggle}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isRunning ? <FaPause /> : <FaPlay />}
              </Button>
              <Button
                variant="secondary"
                onClick={handleStopwatchReset}
                className="bg-gray-600 text-white hover:bg-gray-700"
              >
                <FaStop />
              </Button>
            </div>
          </div>
        </div>

        {/* Task Input */}
        <div className="flex flex-wrap mb-4">
          <input
            type="text"
            className="flex-1 min-w-0 p-2 border border-gray-300 rounded-l-md sm:w-64"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new task"
          />
          <Button
            onClick={handleAddTask}
            className="bg-green-600 text-white p-2 rounded-r-md flex items-center hover:bg-green-700 sm:w-32"
          >
            <FaPlus className="mr-2" /> Add Task
          </Button>
        </div>

        {/* Search */}
        <div className="flex flex-wrap mb-4">
          <input
            type="text"
            className="flex-1 min-w-0 p-2 border border-gray-300 rounded-l-md sm:w-64"
            onChange={handleSearch}
            placeholder="Search tasks"
          />
          <Button className="bg-blue-600 text-white p-2 rounded-r-md flex items-center hover:bg-blue-700 sm:w-32">
            <FaSearch className="mr-2" /> Search
          </Button>
        </div>

        {/* Task Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Tasks Card */}
          <div className="p-4 bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 border border-gray-300 rounded-lg shadow-md relative">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Pending Tasks</h2>
            {pendingTasks.length === 0 ? (
              <p>No pending tasks</p>
            ) : (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between mb-2 p-2 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border border-gray-300 rounded-md shadow-sm"
                >
                  <span>{task.text}</span>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleToggleComplete(task.id)}
                      className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      onClick={() => {
                        setUpdateTask(task);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                    >
                      <FaPencilAlt />
                    </Button>
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Completed Tasks Card */}
          <div className="p-4 bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 border border-gray-300 rounded-lg shadow-md relative">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Completed Tasks</h2>
            {completedTasks.length === 0 ? (
              <p>No completed tasks</p>
            ) : (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between mb-2 p-2 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 border border-gray-300 rounded-md shadow-sm"
                >
                  <span className="line-through text-green-600">{task.text}</span>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleToggleComplete(task.id)}
                      className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      onClick={() => {
                        setUpdateTask(task);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                    >
                      <FaPencilAlt />
                    </Button>
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Update Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100"
        >
          <Modal.Header closeButton className="bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200">
            <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100">
            <Form.Group controlId="taskText">
              <Form.Label>Update Task</Form.Label>
              <Form.Control
                type="text"
                value={updateTask?.text || ""}
                onChange={(e) =>
                  setUpdateTask({ ...updateTask, text: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg-gradient-to-r from-purple-200 via-blue-200 to-teal-200">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateTask}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </div>
  );
}

export default TodoApp;

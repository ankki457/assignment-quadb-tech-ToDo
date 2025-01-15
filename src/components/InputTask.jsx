import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/Task/taskSlice.js";
import { v4 as uuidv4 } from "uuid";

function InputTask() {
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    deadline: "",
    completed: false,
    important: false,
  });

  const dispatch = useDispatch();

  const handleSaveTask = () => {
    dispatch(addTask(newTask));
    setNewTask({
      id: uuidv4(),
      title: "",
      description: "",
      deadline: "",
      completed: false,
      important: false,
    });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <button
        className="py-2 px-4 bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white font-medium rounded-md shadow-md hover:from-indigo-600 hover:to-indigo-500 transition-all"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Task</h2>

            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              cols="10"
              rows="4"
              value={newTask.description}
              placeholder="Description"
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>

            <input
              type="date"
              placeholder="Deadline"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 mb-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newTask.completed}
                  onChange={(e) =>
                    setNewTask({ ...newTask, completed: e.target.checked })
                  }
                  className="mr-2 focus:ring-2 focus:ring-indigo-500"
                />
                Completed
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newTask.important}
                  onChange={(e) =>
                    setNewTask({ ...newTask, important: e.target.checked })
                  }
                  className="mr-2 focus:ring-2 focus:ring-indigo-500"
                />
                Important
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all"
                onClick={handleSaveTask}
              >
                Save Task
              </button>

              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputTask;

import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the Task interface to ensure each task has text and completion status
interface Task {
  text: string;
  completed: boolean;
}

// Task item component with drag-and-drop functionality
const TaskItem = ({ task, index, moveTask, toggleTask, removeTask }: any) => {
  const [{ isDragging }, ref] = useDrag({
    type: "TASK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <li
      ref={(node) => ref(drop(node))}
      className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition-all 
        ${isDragging ? "bg-yellow-200" : isOver ? "bg-blue-300" : "bg-gray-100"}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
        className="mr-3"
      />
      <span
        onClick={() => toggleTask(index)}
        className={`flex-grow text-lg ${task.completed ? "line-through text-gray-400" : ""}`}
      >
        {task.text}
      </span>
      <button
        onClick={() => removeTask(index)}
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
    </li>
  );
};

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.shiftKey) {
      toggleLastTaskCompletion();
    } else if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (index: number): void => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const toggleLastTaskCompletion = (): void => {
    if (tasks.length > 0) {
      toggleTask(tasks.length - 1);
    }
  };

  const removeTask = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const moveTask = (fromIndex: number, toIndex: number): void => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">To-Do List</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            className="border p-3 flex-grow rounded-lg text-lg"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add
          </button>
        </div>
        <div className="flex justify-around p-2 bg-gray-200 rounded-lg">
          {['all', 'active', 'completed'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1 rounded-lg text-lg transition ${filter === option ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {filteredTasks.map((t, index) => (
            <TaskItem
              key={index}
              task={t}
              index={index}
              moveTask={moveTask}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          ))}
        </ul>
      </div>
    </DndProvider>
  );
}

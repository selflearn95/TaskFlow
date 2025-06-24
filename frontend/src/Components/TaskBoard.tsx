import TaskColumn from "./TaskColumn";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchTasks } from "@/redux/Task/taskSlice";

type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TaskBoard = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);
  const filters = useAppSelector((state) => state.tasks.filters); 

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const columns = [
    {
      id: "todo" as TaskStatus,
      title: "To Do",
      color: "bg-orange-100 border-orange-200",
    },
    {
      id: "in-progress" as TaskStatus,
      title: "In Progress",
      color: "bg-blue-100 border-blue-200",
    },
    {
      id: "done" as TaskStatus,
      title: "Done",
      color: "bg-green-100 border-green-200",
    },
  ];

  // 🟢 Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 🟢 Get tasks by column after filtering
  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks
      .filter((task) => task.status === status)
      .map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          title={column.title}
          status={column.id}
          tasks={getTasksByStatus(column.id)}
          className={column.color}
        />
      ))}
    </div>
  );
};

export default TaskBoard;

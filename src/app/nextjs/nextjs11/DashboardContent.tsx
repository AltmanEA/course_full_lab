import { getUsers } from "./data";
import { getTasks } from "./data";

// TODO: Добавьте loading state используя useState и useEffect

export default function DashboardContent() {
  // Данные загружаются, но loading state не показывается
  const users = ["User 1", "User 2", "User 3"];
  const tasks = [
    { id: 1, title: "Task 1", status: "Pending" },
    { id: 2, title: "Task 2", status: "In Progress" },
    { id: 3, title: "Task 3", status: "Completed" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>

        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={index} className="p-3 bg-gray-50 rounded">
              {user}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="p-3 bg-gray-50 rounded">
              {task.title} — <span className="text-gray-500">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
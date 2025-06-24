
import TaskBoard from '@/Components/TaskBoard';
import Header from '@/Components/Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">Organize and track your tasks efficiently</p>
        </div>
        <TaskBoard />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import SearchFilter from "./SearchFilter";
import AddTaskDialog from "./AddTaskDialog";

const Header = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>
          </div>

          <div className="flex items-center space-x-4 flex-wrap">
            <SearchFilter />
            <Button
              onClick={() => setIsAddTaskOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </header>
  );
};

export default Header;

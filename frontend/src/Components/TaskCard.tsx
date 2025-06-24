import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Pen, Trash2 } from 'lucide-react';
import type { Task } from './TaskBoard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteTask, updateTask } from '@/redux/Task/taskSlice';
import EditTaskDialog from './EditTaskDialog';

interface TaskCardProps {
  task: Task;
}

type TaskStatus = 'todo' | 'in-progress' | 'done';

const TaskCard = ({ task }: TaskCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  
  const handleStatusChange = (newStatus: TaskStatus) => {
    dispatch(updateTask({ id: task.id, updates: { status: newStatus } }));
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };


  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'todo': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: TaskStatus): TaskStatus | null => {
    switch (currentStatus) {
      case 'todo': return 'in-progress';
      case 'in-progress': return 'done';
      case 'done': return null;
      default: return null;
    }
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <>
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 line-clamp-2">{task.title}</h3>
              <div className="flex space-x-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditOpen(true)}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Pen className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {task.description && (
  <p className="text-sm text-gray-700">{task.description}</p>
)}
            
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('-', ' ')}
              </Badge>
              
              {nextStatus && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange(nextStatus)}
                  className="text-xs"
                >
                  Move to {nextStatus.replace('-', ' ')}
                </Button>
              )}
            </div>
            
            <div className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
};

export default TaskCard;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import TaskCard from './TaskCard';
import type { Task, TaskStatus } from './TaskBoard';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  className?: string;
}

const TaskColumn = ({ title, status, tasks, className = '' }: TaskColumnProps) => {
  return (
    <Card className={`${className} border-2`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          {title}
          <span className="text-sm font-normal bg-white px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No tasks yet</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TaskColumn;
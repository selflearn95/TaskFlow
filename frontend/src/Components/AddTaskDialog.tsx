import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addTask } from '@/redux/Task/taskSlice';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTaskDialog = ({ open, onOpenChange }: AddTaskDialogProps) => {

  const [data,setData]=useState<{title:string;description:string;status:TaskStatus}>({
    title:'',
    description:'',
    status:'todo'
  })

  const dispatch = useAppDispatch();

  const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setData({
      ...data,
       [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!data.title.trim()) return;
  
    try {
      await dispatch(addTask({
        title: data.title.trim(),
        description: data.description.trim() || undefined,
        status: data.status,
      }));
    } catch (error) {
      console.error('Failed to dispatch addTask:', error);
    }
  
    setData({ title: '', description: '', status: 'todo' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Enter the task details to create a new task</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={handleChange}
              name='title'
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={data.status} onValueChange={(value:TaskStatus)=>setData((prev)=>({...prev,status:value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;

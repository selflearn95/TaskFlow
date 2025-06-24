import { Input } from '@/Components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';
import { Search } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setFilters } from '@/redux/Task/taskSlice';

type TaskStatus = 'todo' | 'in-progress' | 'done';

const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tasks.filters);

  const handleSearchChange = (value: string) => {
    dispatch(
      setFilters({
        search: value,
        status: filters.status,
      })
    );
  };

  const handleStatusFilterChange = (value: TaskStatus | 'all') => {
    dispatch(
      setFilters({
        search: filters.search,
        status: value,
      })
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>

      <Select value={filters.status} onValueChange={handleStatusFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilter;

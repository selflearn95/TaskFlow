import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    status: TaskStatus | 'all';
  };
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
  },
};

// Thunks
export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('https://taskflow-04k6.onrender.com/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as Task[];
});

const normalizeStatus = (status: TaskStatus) =>
  status === 'in-progress' ? 'in_progress' : status;

export const addTask = createAsyncThunk(
  'tasks/add',
  async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const token = localStorage.getItem('token');
    const res = await axios.post('https://taskflow-04k6.onrender.com/api/tasks', {
      ...taskData,
      status: normalizeStatus(taskData.status),
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      ...res.data,
      status: res.data.status === 'in_progress' ? 'in-progress' : res.data.status,
    } as Task;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`https://taskflow-04k6.onrender.com/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, updates }: { id: string; updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>> }) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`https://taskflow-04k6.onrender.com/api/tasks/${id}`, {
      ...updates,
      status: updates.status ? normalizeStatus(updates.status) : undefined,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      ...res.data,
      status: res.data.status === 'in_progress' ? 'in-progress' : res.data.status,
    } as Task;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ search: string; status: TaskStatus | 'all' }>
    ) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload.map(task => ({
          ...task,
          status: (task.status as string) === 'in_progress' ? 'in-progress' : task.status,
        }));
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load tasks';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        );
      });
  },
});

export const { setFilters } = taskSlice.actions;
export default taskSlice.reducer;

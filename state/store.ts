import {configureStore, createSlice} from '@reduxjs/toolkit';

export type State = {
  tasks: Task[];
};

export type Task = {
  id: number;
  title: string;
  desc: string;
  date: string;
  isOpen: boolean;
};

const todoList: State = {
  tasks: [
    {
      id: 0,
      title: 'First task',
      desc: 'Description',
      date: '22.02.2022',
      isOpen: true,
    },
    {
      id: 1,
      title: 'First closed Task',
      desc: 'Description',
      date: '22.02.2022',
      isOpen: false,
    },
  ],
};

const todoSlice = createSlice({
  initialState: todoList,
  name: 'TodoList',
  reducers: {
    createTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(item => item !== action.payload.id);
    },
    editTask(state, action) {
      state.tasks = state.tasks.map(item => {
        if (item.id !== action.payload.id) return item;
        const task = {...item};
        task.desc = action.payload.desc;
        task.title = action.payload.title;
        task.date = action.payload.date;
        return task;
      });
    },
    changeStatus(state, action) {
      state.tasks = state.tasks.map(item => {
        if (item.id !== action.payload.id) return item;
        const task = {...item, isOpen: !item.isOpen};

        return task;
      });
    },
  },
});

export const {createTask, removeTask, editTask, changeStatus} =
  todoSlice.actions;

export const store = configureStore({
  reducer: todoSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

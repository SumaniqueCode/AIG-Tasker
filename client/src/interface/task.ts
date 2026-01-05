export interface ITask {
  _id: string;
  title: string;
  description?: string;
  created_by: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}

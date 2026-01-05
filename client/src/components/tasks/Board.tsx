import { useState, useEffect } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "../../apis/task";
import { Stack, Button, Box, Typography, Container, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import type { ITask } from "../../interface/task";

const columns = ["todo", "in-progress", "done"] as const;

export default function Board() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks(userId);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (data: { title: string; description?: string }) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, { ...editingTask, ...data });
        toast.success("Task updated successfully!");
      } else {
        await createTask({ ...data, status: "todo", created_by: userId });
        toast.success("Task created successfully!");
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to save task");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleMove = async (task: ITask, newStatus: ITask["status"]) => {
    if (!newStatus || task.status === newStatus) return;
    setTasks((prev) =>prev.map((t) => t._id === task._id ? { ...t, status: newStatus } : t));

    try {
      await updateTask(task._id, { status: newStatus });
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? task : t))
      );
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight={700} color="primary">
              Task Board
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Manage your tasks efficiently
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowForm(true)}
            sx={{
              background: 'linear-gradient(45deg, #0247e7ff 0%, #002884 90%)', textTransform: "none", fontWeight: 600, px: 3, py: 1.25, borderRadius: 2, boxShadow: 3,
              "&:hover": { background: 'linear-gradient(45deg, #002884 0%, #0247e7ff 90%)', boxShadow: 6, transform: "translateY(-1px)", },
              transition: "all 0.3s ease",
            }}>
            Add New Task
          </Button>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress size={48} />
          </Box>
        ) : (
          <Stack direction="row" spacing={3}
            sx={{
              overflowX: "auto",
              pb: 2,
              "&::-webkit-scrollbar": {
                height: 8,
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: "grey.100",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "grey.400",
                borderRadius: 4,
                "&:hover": {
                  bgcolor: "grey.500",
                }
              }
            }}>
            {columns.map((col) => (
              <Column key={col} title={col} tasks={tasks.filter((t) => t.status === col)} onEdit={(task) => { setEditingTask(task); setShowForm(true); }} onDelete={handleDelete} onMove={handleMove} />
            ))}
          </Stack>
        )}
      </Stack>

      {showForm && (
        <TaskForm task={editingTask || undefined} onSave={handleSave} onClose={() => { setShowForm(false); setEditingTask(null); }} />
      )}
    </Container>
  );
}
import { Paper, Typography, Stack, Chip, Box } from "@mui/material";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import type { ITask } from "../../interface/task";

interface ColumnProps {
  title: string;
  tasks: ITask[];
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
  onMove: (task: ITask, newStatus: ITask["status"]) => void; // ✅ use status
}
export default function Column({ title, tasks, onEdit, onDelete, onMove }: ColumnProps) {
  const getColumnColor = (title: string) => {
    switch (title) {
      case "todo":
        return { bg: "#e3f2fd", border: "#1976d2" };
      case "in-progress":
        return { bg: "#fff3e0", border: "#ed6c02" };
      case "done":
        return { bg: "#e8f5e9", border: "#2e7d32" };
      default:
        return { bg: "#f5f5f5", border: "#9e9e9e" };
    }
  };
  const colors = getColumnColor(title);
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string; status: ITask["status"] }) => {
      if (item.status !== title) {
        onMove({ _id: item.id, status: item.status } as ITask, title as ITask["status"]);
      }
    },
  }));

  return (
    <Paper
      ref={drop as any}
      elevation={0}
      sx={{ p: 2, flex: 1, minWidth: 300, bgcolor: colors.bg, borderRadius: 2, border: `2px solid ${colors.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: "calc(100vh - 200px)",}}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Typography variant="h6" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 1, color: colors.border }}>
          {title.replace("-", " ")}
        </Typography>
        <Chip label={tasks.length} size="small" sx={{ bgcolor: "background.paper", fontWeight: 600, color: colors.border, minWidth: 32 }}/>
      </Stack>

      <Stack spacing={1.5}>
        {tasks.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center", color: "text.secondary", bgcolor: "background.paper", borderRadius: 2, border: "2px dashed", borderColor: "divider",}}>
            <Typography variant="body2">No tasks yet</Typography>
          </Box>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </Stack>
    </Paper>
  );
}

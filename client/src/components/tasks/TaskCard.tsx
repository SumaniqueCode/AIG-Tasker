import { Card, Typography, Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag } from "react-dnd";
import type { ITask } from "../../interface/task";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag as any} style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}>
      <Card
        sx={{
          mb: 2,
          px: 2,
          py: 1,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {task.title}
        </Typography>
        {task.description && <Typography variant="body2">{task.description}</Typography>}
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <IconButton size="small" color="warning" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(task._id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>
    </div>
  );
}

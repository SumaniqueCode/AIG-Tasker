import { Box, Modal, Typography, TextField, Button, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { ITask } from "../../interface/task";


interface TaskFormProps {
  onSave: (task: { title: string; description?: string }) => void;
  task?: ITask;
  onClose: () => void;
}

const taskValidationSchema = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters").trim(),
  description: Yup.string().max(500, "Description must not exceed 500 characters").trim(),
});

export default function TaskForm({ onSave, task, onClose }: TaskFormProps) {
  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await onSave({ title: values.title.trim(), description: values.description?.trim() });
      onClose();
    } catch (error) {
      toast.error("Failed to save task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose} aria-labelledby="task-form-title" closeAfterTransition>
      <Box
        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "90%", sm: 500 }, maxWidth: 500, bgcolor: "background.paper", borderRadius: 3, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)", p: 4, outline: "none", }}>
        <Typography id="task-form-title" variant="h5" component="h2" fontWeight={600} mb={3} color="primary">
          {task ? "Edit Task" : "Create New Task"}
        </Typography>

        <Formik initialValues={initialValues} validationSchema={taskValidationSchema} onSubmit={handleSubmit} validateOnChange={true} validateOnBlur={true}>
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <Form>
              <Stack spacing={3}>
                <Field name="title">
                  {({ field }: { field: any }) => (
                    <TextField {...field} label="Task Title" placeholder="Enter task title" fullWidth required error={touched.title && Boolean(errors.title)} helperText={touched.title && errors.title} disabled={isSubmitting} variant="outlined"
                      sx={{ "& .MuiOutlinedInput-root": { "&:hover fieldset": { borderColor: "primary.main" } } }} />
                  )}
                </Field>

                <Field name="description">
                  {({ field }: { field: any }) => (
                    <TextField {...field} label="Description" placeholder="Enter task description (optional)" fullWidth multiline rows={4} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} disabled={isSubmitting} variant="outlined"
                      sx={{ "& .MuiOutlinedInput-root": { "&:hover fieldset": { borderColor: "primary.main" } } }} />
                  )}
                </Field>

                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                  <Button variant="outlined" onClick={onClose} disabled={isSubmitting} sx={{ textTransform: "none", fontWeight: 500, px: 3, py: 1, }}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" disabled={isSubmitting || !isValid || !dirty} sx={{ textTransform: "none", fontWeight: 500, px: 3, py: 1, boxShadow: 2, "&:hover": { boxShadow: 4, }, }}>
                    {isSubmitting ? "Saving..." : task ? "Update Task" : "Create Task"}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
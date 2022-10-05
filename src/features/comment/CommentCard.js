import React from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import Popup from "../../components/extra/Popup";
import useAuth from "../../hooks/useAuth";

function CommentCard({ comment }) {
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Popup
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        comment={comment}
      />
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {user._id === comment.author._id ? (
            <Button
              onClick={() => {
                console.log(user._id);
                console.log(comment.author._id, "aaaa");
                handleClickOpen();
              }}
            >
              Delete
            </Button>
          ) : null}
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;

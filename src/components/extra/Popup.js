import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { deletePost } from "../../features/post/postSlice";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../features/comment/commentSlice";

export default function Popup({
  deletePostObject,
  handleClose,
  handleClickOpen,
  open,
  comment,
  post,
}) {
  const dispatch = useDispatch();

  const handleDeleteComment = (deleteCommentId) => {
    console.log(deleteCommentId, "deleteCommentId");
    dispatch(
      deleteComment({
        commentId: deleteCommentId._id,
        commentObject: deleteCommentId,
      })
    );
  };

  const handleDeletePost = (deletePostObject) => {
    dispatch(
      deletePost({ postId: deletePostObject._id, postObject: deletePostObject })
    );
  };

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              comment ? handleDeleteComment(comment) : handleDeletePost(post);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { useState } from "react";
import EditPostForm from "./EditPostForm";
import Popup from "../../components/extra/Popup";
import useAuth from "../../hooks/useAuth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuth();

  const [edit, setEdit] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = (deletePostObject) => {
    dispatch(
      deletePost({ postId: deletePostObject._id, postObject: deletePostObject })
    );
  };

  return (
    <Card>
      <Popup
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        post={post}
      />
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <IconButton>
              <MoreVertIcon
                sx={{ fontSize: 30 }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              ></MoreVertIcon>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {user._id === post.author._id ? (
                <div>
                  <MenuItem
                    onClick={() => {
                      setEdit(!edit);
                      handleMenuClose();
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDeletePost(post);
                      handleMenuClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                </div>
              ) : null}
            </Menu>
          </>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {edit ? (
          <>
            <Typography>{post.content}</Typography>
            {post.image && (
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  height: 300,
                  "& img": { objectFit: "cover", width: 1, height: 1 },
                }}
              >
                <img src={post.image} alt="post" />
              </Box>
            )}
          </>
        ) : (
          <EditPostForm
            postContent={post.content}
            postImage={post.image}
            postId={post._id}
            setEdit={setEdit}
            edit={edit}
          />
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;

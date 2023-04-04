import PropTypes from 'prop-types';
// material
import { Box, List } from '@mui/material';
//
import PostCommentItem from './PostCommentItem';

// ----------------------------------------------------------------------

PostCommentList.propTypes = {
  post: PropTypes.object.isRequired
};

export default function PostCommentList({ post }) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, children, users } = comment;
        const hasReply = children.length > 0;

        return (
          <Box key={id} sx={{}}>
            <PostCommentItem
              name={comment.user?.name}
              avatarUrl={comment.user?.avatar?.path}
              postedAt={comment.createdAt}
              message={comment.content}
            />
            {hasReply &&
              children.map((reply) => (
                <PostCommentItem
                  key={reply.id}
                  message={reply?.content}
                  postedAt={reply?.createdAt}
                  name={reply.user?.name}
                  avatarUrl={reply.user?.avatar?.path}
                  hasReply
                />
              ))}
          </Box>
        );
      })}
    </List>
  );
}

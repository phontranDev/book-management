import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

// material
import { Box, Divider, Grid, List, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { paramCase } from 'change-case';

//
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

import { PATH_DASHBOARD } from '../../../../routes/paths';

import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import { fDate } from '../../../../utils/formatTime';
import Markdown from '../../../Markdown';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object
};

const PostImgStyle = styled('img')({
  top: 0,
  width: '100px',
  height: '100px',
  objectFit: 'cover'
});

const LINES_TO_SHOW = 3;

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': LINES_TO_SHOW,
    '-webkit-box-orient': 'vertical'
  }
});

export default function Profile({ myProfile, posts }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>

      {posts?.length > 0 && (
        <Grid item xs={12} md={8}>
          <List disablePadding>
            {posts.map((post) => (
              <Box key={post.id} sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                  <Typography variant="caption"> {fDate(post.createdAt)}</Typography>
                  {post.published && (
                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                      <StarIcon color="warning" />
                      <Typography variant="caption">{post.published && 'Member Only'}</Typography>
                    </Stack>
                  )}
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                  <Stack sx={{ pr: 2 }}>
                    <Link
                      to={`${PATH_DASHBOARD.post.root}/${paramCase(post.slug)}`}
                      color="inherit"
                      component={RouterLink}
                    >
                      <Typography variant="h5">{post.title}</Typography>
                    </Link>
                    <ShowMoreText
                      /* Default options */
                      lines={3}
                      more=""
                      less="Show less"
                      className="content-css"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      truncatedEndingComponent="... "
                    >
                      <Markdown children={post.content} />
                    </ShowMoreText>
                  </Stack>
                  {post.coverImg && <PostImgStyle alt={post.title} src={`${post.coverImg}`} />}
                </Stack>

                <Divider
                  sx={{
                    mt: 5
                  }}
                />
              </Box>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}

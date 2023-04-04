import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination, Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPost } from '../../redux/slices/postSlice';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import {
  PostCommentList,
  PostHero,
  PostTags,
  PostCommentForm,
  PostShowMoreLess
} from '../../components/_dashboard/post';
import useAuth from '../../hooks/useAuth';

import { getProfile } from '../../redux/slices/userAppSlice';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function PostDetail() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { myProfile } = useSelector((state) => state.userAppSlice);
  const { post, error } = useSelector((state) => state.postSlice);

  useEffect(() => {
    dispatch(getPost(slug));
    dispatch(getProfile());
  }, [dispatch, slug]);

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!open) {
      const metaTag = document.querySelector(`script[data-name="speechify"]`);
      if (metaTag) {
        const element = document.getElementById('speechify-root');
        element?.remove();
      }
    }
  }, [open]);

  return (
    <Page title="Blog: Post Details | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Post', href: PATH_DASHBOARD.post },
            { name: slug }
          ]}
        />
        {post && (
          <Card>
            <PostHero handleOpen={handleOpen} open={open} post={post} />
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {(post.published && myProfile?.isSubscrite) || !post.published ? (
                <>
                  <div className="post-article">
                    <Markdown children={post?.content} />
                  </div>
                  {open && (
                    <Helmet>
                      <script data-name="speechify" async="canonical" src="/speechify.js" />
                    </Helmet>
                  )}
                </>
              ) : (
                <PostShowMoreLess content={post?.content} />
              )}

              <Box sx={{ my: 5 }}>
                <Divider />
                <PostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.commentCount})
                </Typography>
              </Box>

              <PostCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <PostCommentForm user={myProfile} post={post} />
            </Box>
          </Card>
        )}

        {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}

        {/* {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />} */}
      </Container>
    </Page>
  );
}

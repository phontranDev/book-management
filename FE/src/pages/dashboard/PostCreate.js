import { useEffect } from 'react';
// material
import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

// routes
import { useLocation, useParams } from 'react-router';
import { PATH_DASHBOARD } from '../../routes/paths';

// hooks
import useSettings from '../../hooks/useSettings';

// components

import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { PostNewForm } from '../../components/_dashboard/post';

import { getPost } from '../../redux/slices/postSlice';

// ----------------------------------------------------------------------

export default function PostCreate() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { slug } = useParams();
  const isEdit = pathname.includes('edit');

  const { post } = useSelector((state) => state.postSlice);

  useEffect(() => {
    if (slug && isEdit) {
      dispatch(getPost(slug));
    }
  }, [dispatch, slug, isEdit]);

  return (
    <Page title="Blog: New Post | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Post', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' }
          ]}
        />

        {isEdit && post ? <PostNewForm isEdit={isEdit} currentPost={post} /> : <PostNewForm />}
      </Container>
    </Page>
  );
}

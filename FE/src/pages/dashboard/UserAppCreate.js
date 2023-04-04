import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { getUserByName } from '../../redux/slices/userAppSlice';
import UserAppNewForm from '../../components/_dashboard/my-user/UserAppNewForm';

// ----------------------------------------------------------------------

export default function UserAppCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { user } = useSelector((state) => state.userAppSlice);
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && name) {
      dispatch(getUserByName(name));
    }
  }, [dispatch, isEdit, name]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? 'New user' : name }
          ]}
        />

        <UserAppNewForm isEdit={isEdit} currentUser={user} />
      </Container>
    </Page>
  );
}

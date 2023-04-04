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
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => paramCase(user.name) === name);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

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

        <UserNewForm isEdit={isEdit} currentUser={currentUser} />

        <div className="article">
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>
          <p>
            Handling errors are one of the most important aspects of any production-grade application. Anyone can code
            for the success cases. Only true professionals take care of the error cases. Today we will learn just that.
            Let’s dive in.
          </p>

          {open && (
            <Helmet>
              <script src={`${process.env.PUBLIC_URL}/speechify.js`} />
            </Helmet>
          )}
        </div>
        <button onClick={handleOpen}>Handle Open</button>
      </Container>
    </Page>
  );
}

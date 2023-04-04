import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BookNewForm } from '../../components/_dashboard/book';
import { getBookBySlug } from '../../redux/slices/bookSlice';

// ----------------------------------------------------------------------

const currentBook = {
  id: 1,
  name: 'Nike Air Max Up',
  slug: 'doraemon-truyen-ngan-tap-37',
  content: null,
  pageNumber: 188,
  published: false,
  imageUrl: 'https://res.cloudinary.com/phontran/image/upload/v1669637115/uyze4xmebfu9tesrsfl9.jpg',
  softFileUrl: null,
  author: {
    id: 1,
    name: 'Fujiko Fujio',
    email: null,
    phoneNumber: null,
    published: false,
    imageUrl: null
  },
  publisher: {
    id: 1,
    name: 'NXB Kim Đồng',
    address: '55 Quang Trung, Hai Bà Trưng Hà Nội 84',
    email: null,
    phoneNumber: null,
    published: false,
    logoUrl: null
  },
  category: {
    id: 4,
    name: 'Truyện Tranh',
    slug: 'truyen-tranh',
    createdAt: '2022-11-28T14:46:11.653Z',
    updatedAt: '2022-11-28T14:46:11.653Z'
  }
};

export default function BookCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.bookSlice);

  const { pathname } = useLocation();
  const { slug } = useParams();
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    if (slug) {
      dispatch(getBookBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (isEdit && slug) {
      dispatch(getBookBySlug(slug));
    }
  }, [dispatch, isEdit, slug]);

  return (
    <Page title="Book: Create a new book | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new book' : 'Edit book'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Book',
              href: PATH_DASHBOARD.book.root
            },
            { name: !isEdit ? 'New book' : slug }
          ]}
        />

        <BookNewForm isEdit={isEdit} currentBook={currentBook} />
      </Container>
    </Page>
  );
}

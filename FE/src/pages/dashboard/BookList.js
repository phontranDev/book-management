import { useEffect, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Container, Button, Stack, Grid, Skeleton, Box } from '@mui/material';

import { orderBy } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import CartWidget from '../../components/_dashboard/e-commerce/CartWidget';

import { getAllBooks, getBooksInitial, getMoreBooks } from '../../redux/slices/bookSlice';
import { BookCardComponent, BookListComponent } from '../../components/_dashboard/book';

import BooksSort from '../../components/_dashboard/book/BooksSort';
import BooksSearch from '../../components/_dashboard/book/BooksSearch';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' }
];

const applySort = (books, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(books, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(books, ['createdAt'], ['asc']);
  }
  return books;
};

const SkeletonLoad = (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {[...Array(4)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
        <Box sx={{ display: 'flex', mt: 1.5 }}>
          <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
          <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default function BookList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { books, hasMore, take } = useSelector((state) => state.bookSlice);
  const [filters, setFilters] = useState('latest');
  const sortedBooks = applySort(books, filters);

  const onScroll = useCallback(() => dispatch(getMoreBooks()), [dispatch]);

  useEffect(() => {
    dispatch(getBooksInitial(take));
  }, [dispatch, take]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <Page title="Books">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Books"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Books',
              href: PATH_DASHBOARD.book.root
            },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.book.newBook}
              startIcon={<Icon icon={plusFill} />}
            >
              New Book
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BooksSearch />
          <BooksSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <InfiniteScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={books.length}
          style={{ overflow: 'inherit' }}
        >
          <Grid container spacing={3}>
            {sortedBooks.map((book) => (
              <Grid key={book.id} item xs={12} sm={6} md={3}>
                <BookCardComponent book={book} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>

        <CartWidget />
      </Container>
    </Page>
  );
}

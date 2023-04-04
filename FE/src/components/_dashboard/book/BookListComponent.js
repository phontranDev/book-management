import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@mui/material';
import BookCardComponent from './BookCardComponent';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(12)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

BookListComponent.propTypes = {
  books: PropTypes.array.isRequired,
  isLoad: PropTypes.bool
};

export default function BookListComponent({ books, isLoad, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {books.map((book) => (
        <Grid key={book.id} item xs={12} sm={6} md={3}>
          <BookCardComponent book={book} />
        </Grid>
      ))}

      {isLoad && SkeletonLoad}
    </Grid>
  );
}

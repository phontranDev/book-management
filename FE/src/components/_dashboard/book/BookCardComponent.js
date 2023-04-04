import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';

// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const BookImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BookCardComponent.propTypes = {
  book: PropTypes.object
};

export default function BookCardComponent({ book }) {
  const { name, slug, image, published } = book;
  const linkTo = `${PATH_DASHBOARD.book.root}/${paramCase(slug)}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {published && (
          <StarIcon
            color="warning"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          />
        )}

        <BookImgStyle alt={name} src={image && `${process.env.REACT_APP_BASE_URL}/${image?.path}`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </Stack>
    </Card>
  );
}

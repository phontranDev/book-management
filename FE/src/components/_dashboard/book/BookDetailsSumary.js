import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@mui/material';

import { sentenceCase } from 'change-case';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
//
import { MIconButton } from '../../@material-extend';
import Label from '../../Label';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export default function BookDetailsSumary({ bookDetail }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, published, category, author, publisher, pageNumber, content, image, softFile } = bookDetail;
  return (
    <RootStyle>
      <Label
        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
        color={!published ? 'error' : 'success'}
        sx={{ textTransform: 'uppercase' }}
      >
        {sentenceCase(published ? 'Member Only' : 'Free')}
      </Label>
      <Typography variant="h5" paragraph sx={{ my: 3 }}>
        {name}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Typography variant="subtitle2" sx={{ mt: 0.5, mr: 5 }}>
          Category
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          {category?.name}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 3 }}>
        <Typography variant="subtitle2" sx={{ mt: 0.5, mr: 5 }}>
          Author
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          {author?.name}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{ my: 3 }}>
        <Typography variant="subtitle2" sx={{ mt: 0.5, mr: 5 }}>
          Page number
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          {pageNumber}
        </Typography>
      </Stack>
    </RootStyle>
  );
}

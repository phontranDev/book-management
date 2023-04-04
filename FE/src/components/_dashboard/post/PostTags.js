import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
// material
import { Box, Chip, Avatar, AvatarGroup, FormControlLabel, Checkbox } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

PostTags.propTypes = {
  post: PropTypes.object.isRequired,
  sx: PropTypes.object
};

export default function PostTags({ post, sx }) {
  const { likeCount, tags } = post;

  return (
    <Box sx={{ py: 3, ...sx }}>
      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.title} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Icon icon={heartFill} width={20} height={20} />}
              checkedIcon={<Icon icon={heartFill} width={20} height={20} />}
            />
          }
          label={fShortenNumber(likeCount)}
        />

        {/* <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
          {favoritePerson.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup> */}
      </Box>
    </Box>
  );
}

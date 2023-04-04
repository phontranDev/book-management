import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import ShowMoreText from 'react-show-more-text';
import Markdown from '../../Markdown';

import { PATH_DASHBOARD } from '../../../routes/paths';

function PostShowMoreLess({ content }) {
  const navigate = useNavigate();
  const linkTo = `${PATH_DASHBOARD.myUser.account}`;
  const handeNavigate = () => {
    navigate(linkTo);
  };
  return (
    <>
      <ShowMoreText
        /* Default options */
        lines={10}
        more=""
        less="Show less"
        className="content-css"
        anchorClass="show-more-less-clickable"
        expanded={false}
        truncatedEndingComponent="... "
      >
        <Markdown children={content} />
      </ShowMoreText>

      <Box
        className="hide-more-text"
        style={{
          height: 250,
          background: 'linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))',
          marginTop: '-240px',
          position: 'relative'
        }}
      >
        <></>
      </Box>
      <Box
        className="bg-upgrade"
        style={{
          padding: '32px',
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button onClick={handeNavigate} size="large" variant="contained">
          Upgrade
        </Button>
      </Box>
    </>
  );
}

export default PostShowMoreLess;

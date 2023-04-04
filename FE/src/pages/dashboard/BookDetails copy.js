import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';

import { Helmet } from 'react-helmet-async';

import { Worker, Viewer, PageChangeEvent } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';

// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import CartWidget from '../../components/_dashboard/e-commerce/CartWidget';

import { getAllBooks, getBookBySlug } from '../../redux/slices/bookSlice';

import { BookDetailsSumary } from '../../components/_dashboard/book';

import axios from '../../utils/axiosInstance';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

// ----------------------------------------------------------------------

const LargeImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%'
});

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function BookDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, setValue] = useState('1');
  const { book, error } = useSelector((state) => state.bookSlice);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const initialPage = localStorage.getItem('current-page') ? parseInt(localStorage.getItem('current-page'), 10) : 0;

  useEffect(() => {
    dispatch(getBookBySlug(slug));
  }, [dispatch, slug]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (e) => {
    localStorage.setItem('current-page', `${e.currentPage}`);
  };
  return (
    <>
      <Page title="Books: Book Details | Minimal-UI">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Book Details"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'E-Commerce',
                href: PATH_DASHBOARD.book
              },
              { name: book ? book.name : '' }
            ]}
          />

          <CartWidget />

          {book && (
            <>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6} lg={8}>
                    <LargeImgStyle alt="large image" src={`${process.env.REACT_APP_BASE_URL}/${book?.image?.path}`} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <BookDetailsSumary bookDetail={book} />
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{ my: 8 }}>
                <TabContext value={value}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                    <TabList onChange={handleChangeTab}>
                      <Tab disableRipple value="1" label="Description" />
                      <Tab
                        disableRipple
                        value="2"
                        label={`Review (${book?.reviews?.length || 0})`}
                        sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                      />
                      <Tab disableRipple value="3" label="Content" />
                    </TabList>
                  </Box>

                  <Divider />

                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <Markdown children={book.content} />
                    </Box>
                  </TabPanel>
                  <TabPanel value="3">
                    <>
                      <div className="post-article">
                        {book.softFile && (
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                            <div style={{ height: '750px' }}>
                              <Viewer
                                initialPage={initialPage}
                                onPageChange={handlePageChange}
                                plugins={[defaultLayoutPluginInstance]}
                                fileUrl={`${process.env.REACT_APP_BASE_URL}/local-files/${book?.softFile?.id}`}
                              />
                            </div>
                          </Worker>
                        )}
                      </div>

                      <Helmet>
                        <script data-name="speechify" async="canonical" src="/speechify.js" />
                      </Helmet>
                    </>
                  </TabPanel>
                </TabContext>
              </Card>
            </>
          )}

          {!book && SkeletonLoad}

          {error && <Typography variant="h6">404 Book not found</Typography>}
        </Container>
      </Page>
    </>
  );
}

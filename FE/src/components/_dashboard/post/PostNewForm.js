import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { paramCase } from 'change-case';
// utils
import fakeRequest from '../../../utils/fakeRequest';
//
import { QuillEditor } from '../../editor';
import { UploadSingleFile } from '../../upload';
//
import PostPreview from './PostPreview';

import { getAllTags } from '../../../redux/slices/tagSlice';

import axiosInstance from '../../../utils/axiosInstance';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function PostNewForm({ isEdit, currentPost }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tagSlice);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  useEffect(() => {
    if (tags.length > 0) {
      const convertTags = tags.map((tag) => tag.title);
      setTagOptions(convertTags);
    }
  }, [tags]);

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    // title: Yup.string().required('Title is required'),
    // description: Yup.string().required('Description is required'),
    // content: Yup.string().min(1000).required('Content is required'),
    // cover: Yup.mixed().required('Cover is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentPost?.title || '',
      content: currentPost?.content || '',
      cover: currentPost?.coverImg || '',
      tags: currentPost?.tags?.map((tag) => tag.title) || [],
      publish: currentPost?.published || false
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { cover, publish, ...data } = values;
        const createdBlog = {
          ...data,
          published: publish,
          slug: paramCase(data.title),
          coverImg: cover?.url || '',
          author: user.id
        };

        const response = await axiosInstance.post('/posts/save', createdBlog);
        if (response.status === 201) {
          resetForm();
          handleClosePreview();
          setSubmitting(false);
          enqueueSnackbar('Post success', { variant: 'success' });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axiosInstance.post('/cloudinary/upload', formData);

          if (response.status === 201) {
            setFieldValue('cover', {
              url: response.data?.secure_url,
              preview: URL.createObjectURL(file)
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Post Title"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      id="post-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <LabelStyle>Cover</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values.cover}
                      onDrop={handleDrop}
                      error={Boolean(touched.cover && errors.cover)}
                    />
                    {touched.cover && errors.cover && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.cover && errors.cover}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div>
                    <FormControlLabel
                      control={<Switch {...getFieldProps('publish')} checked={values.publish} />}
                      label="Publish"
                      labelPlacement="start"
                      sx={{ mb: 1, mx: 0, width: '100%', justifyContent: 'space-between' }}
                    />
                  </div>

                  {tagOptions.length > 0 && (
                    <Autocomplete
                      multiple
                      freeSolo
                      value={values.tags}
                      onChange={(event, newValue) => {
                        setFieldValue('tags', newValue);
                      }}
                      options={tagOptions}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={index} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <TextField {...params} label="Tags" />}
                    />
                  )}
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  onClick={handleOpenPreview}
                  sx={{ mr: 1.5 }}
                >
                  Preview
                </Button>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>

      <PostPreview formik={formik} openPreview={open} onClosePreview={handleClosePreview} />
    </>
  );
}

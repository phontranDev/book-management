import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  CardContent,
  CardHeader
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import slugInstance from 'slug';

import axiosInstance from '../../../utils/axiosInstance';

// utils
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile, UploadSingleFile } from '../../upload';

import { getAllAuthors } from '../../../redux/slices/authorSlice';
import { getAllPublishers } from '../../../redux/slices/publisherSlice';
import { getAllCategories } from '../../../redux/slices/categorySlice';

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

BookNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBook: PropTypes.object
};

export default function BookNewForm({ isEdit, currentBook }) {
  console.log(currentBook);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { authors } = useSelector((state) => state.authorSlice);
  const { publishers } = useSelector((state) => state.publisherSlice);
  const { categories } = useSelector((state) => state.categorySlice);

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!authors.length) {
      dispatch(getAllAuthors());
    }
  }, [dispatch, authors]);

  useEffect(() => {
    if (!publishers.length) {
      dispatch(getAllPublishers());
    }
  }, [dispatch, publishers]);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);

  const NewBookSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // images: Yup.array().min(1, 'Images is required'),
    // price: Yup.number().required('Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentBook?.name || '',
      content: currentBook?.content || '',
      pageNumber: currentBook?.pageNumber || 0,
      categoryName: currentBook?.category?.name || '',
      authorName: currentBook?.author?.name || '',
      publisherName: currentBook?.publisher?.name || '',
      published: currentBook?.published || false,
      image: currentBook?.image || null,
      softFile: currentBook?.softFile || null
    },
    validationSchema: NewBookSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        const { published, name, pageNumber, content, image, softFile } = values;
        const author = authors.find((a) => a.name === values.authorName);
        const category = categories.find((c) => c.name === values.categoryName);
        const publisher = publishers.find((p) => p.name === values.publisherName);
        const slug = slugInstance(name);
        const createdBook = {
          name,
          slug,
          pageNumber,
          content,
          published,
          image_Id: image?.id,
          softFile_Id: softFile?.id,
          author_Id: author?.id,
          publisher_Id: publisher?.id,
          category_Id: category?.id
        };

        const response = await axiosInstance.post('/books/save', createdBook);

        if (response.status === 201) {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          navigate(PATH_DASHBOARD.book.list);
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.name !== values?.image?.filename) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axiosInstance.post('/local-files/save-img', formData);
          if (response.status === 201) {
            setFieldValue('image', response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    [setFieldValue]
  );

  const handleDropMultiFile = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (values?.softFile?.filename !== file.name) {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axiosInstance.post('/local-files/save-pdf', formData);
          if (response.status === 201) {
            setFieldValue('softFile', response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    [setFieldValue]
  );

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  const handleRemoveAll = () => {
    setFieldValue('softFile', null);
  };

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
                    label="Book Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <div>
                    <LabelStyle>Content</LabelStyle>
                    <QuillEditor
                      simple
                      id="book-content"
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      error={Boolean(touched.content && errors.content)}
                    />
                    {touched.content && errors.content && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.content && errors.content}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <LabelStyle>Add Image</LabelStyle>
                    <UploadSingleFile
                      maxSize={3145728}
                      accept="image/*"
                      file={values?.image ? `${process.env.REACT_APP_BASE_URL}/${values?.image?.path}` : ''}
                      onDrop={handleDrop}
                      error={Boolean(touched.imageUrl && errors.imageUrl)}
                    />
                    {touched.imageUrl && errors.imageUrl && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.imageUrl && errors.imageUrl}
                      </FormHelperText>
                    )}
                  </div>

                  <div>
                    <LabelStyle>Add Book File</LabelStyle>
                    <UploadMultiFile
                      showPreview={false}
                      files={(values?.softFile && [values?.softFile?.filename]) || []}
                      onDrop={handleDropMultiFile}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                    />
                  </div>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Card sx={{ p: 3 }}>
                  <FormControlLabel
                    control={<Switch {...getFieldProps('published')} checked={values.published} />}
                    label="Publish"
                    sx={{ mb: 2 }}
                  />

                  <Stack spacing={3}>
                    <Autocomplete
                      autoHighlight
                      freeSolo
                      value={values.categoryName}
                      onChange={(event, newValue) => {
                        setFieldValue('categoryName', newValue);
                      }}
                      options={(categories.length > 0 && categories.map((category) => category.name)) || []}
                      renderInput={(params) => <TextField label="Categories" {...params} />}
                    />

                    <Autocomplete
                      autoHighlight
                      freeSolo
                      value={values.publisherName}
                      onChange={(event, newValue) => {
                        setFieldValue('publisherName', newValue);
                      }}
                      options={(publishers.length > 0 && publishers.map((publisher) => publisher.name)) || []}
                      renderInput={(params) => <TextField label="Publishers" {...params} />}
                    />

                    <Autocomplete
                      autoHighlight
                      freeSolo
                      value={values.authorName}
                      onChange={(event, newValue) => {
                        console.log(newValue);
                        setFieldValue('authorName', newValue);
                      }}
                      options={(authors.length > 0 && authors.map((author) => author.name)) || []}
                      renderInput={(params) => <TextField label="Authors" {...params} />}
                    />

                    <TextField
                      fullWidth
                      placeholder="0"
                      label="Page Number"
                      {...getFieldProps('pageNumber')}
                      error={Boolean(touched.pageNumber && errors.pageNumber)}
                      helperText={touched.pageNumber && errors.pageNumber}
                    />
                  </Stack>
                </Card>

                <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                  {!isEdit ? 'Create Product' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}

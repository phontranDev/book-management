import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import fakeRequest from '../../../utils/fakeRequest';
import axios from '../../../utils/axiosInstance';
import { getPost } from '../../../redux/slices/postSlice';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

export default function PostCommentForm({ user, post }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required')
  });

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const response = await axios.post('/post-comment/save', {
          postId: post.id,
          userId: user.id,
          content: values.comment
        });

        if (response) {
          dispatch(getPost(post.slug));
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Post success', { variant: 'success' });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Comment *"
              {...getFieldProps('comment')}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Post comment
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyles>
  );
}

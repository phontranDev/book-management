import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';

import shieldFill from '@iconify/icons-eva/shield-fill';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';

// material
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import Label from '../../../Label';

import axios from '../../../../utils/axiosInstance';
import { getPlan } from '../../../../redux/slices/plan';
import { getCards, getProfile } from '../../../../redux/slices/userAppSlice';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(1),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function PaymentSummary() {
  const dispatch = useDispatch();
  const { plan } = useSelector((state) => state.plan);
  const { cards } = useSelector((state) => state.payment);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getPlan();
    getCards();
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!cards.length) {
          enqueueSnackbar('Please add card', { variant: 'error' });
          return;
        }

        const response = await axios.post('/subscriptions/monthly', { stripePriceId: plan.stripePriceId });

        if (response) {
          dispatch(getProfile());
          setSubmitting(false);
          enqueueSnackbar('Upgrade success', { variant: 'success' });
        }
        console.log(values);
      } catch (err) {
        console.log(err.error);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    plan && (
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <RootStyle>
            <Typography variant="subtitle1" sx={{ mb: 5 }}>
              Summary
            </Typography>

            <Stack spacing={2.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
                  Subscription
                </Typography>
                <Label color="error" variant="filled">
                  {plan.name}
                </Label>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography component="p" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Billed Monthly
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="flex-end">
                <Typography sx={{ color: 'text.secondary' }}>$</Typography>
                <Typography variant="h2" sx={{ mx: 1 }}>
                  {plan.price}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ mb: 1, alignSelf: 'flex-end', color: 'text.secondary' }}
                >
                  /mo
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="p">
                  Total Billed
                </Typography>
                <Typography variant="h6" component="p">
                  {plan.price}
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
            </Stack>

            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
              * Plus applicable taxes
            </Typography>

            <LoadingButton
              loading={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 5, mb: 3 }}
            >
              Upgrade My Plan
            </LoadingButton>

            <Stack alignItems="center" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box component={Icon} icon={shieldFill} sx={{ width: 20, height: 20, color: 'primary.main' }} />
                <Typography variant="subtitle2">Secure credit card payment</Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                This is a secure 128-bit SSL encrypted payment
              </Typography>
            </Stack>
          </RootStyle>
        </Form>
      </FormikProvider>
    )
  );
}

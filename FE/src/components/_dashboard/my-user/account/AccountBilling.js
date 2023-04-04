import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
// material
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material';
// redux
import { useSelector } from '../../../../redux/store';
// utils
import fakeRequest from '../../../../utils/fakeRequest';

import useAuth from '../../../../hooks/useAuth';

//
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';

import { attackCardToUser, getCards, setDefaultCard } from '../../../../redux/slices/payment';
import { getPlan } from '../../../../redux/slices/plan';

import { PaymentSummary } from '../payment';

import axios from '../../../../utils/axiosInstance';

import { getProfile } from '../../../../redux/slices/userAppSlice';
// ----------------------------------------------------------------------

export default function AccountBilling() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { cards: cardsPayment, isLoading } = useSelector((state) => state.payment);
  const { myProfile } = useSelector((state) => state.userAppSlice);
  const { plan } = useSelector((state) => state.plan);

  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getPlan());
  }, [dispatch]);

  const NewCardSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const splitCardExpired = values.cardExpired.split('/');

        const data = {
          number: values.cardNumber,
          cvc: values.cardCvv,
          exp_month: parseFloat(splitCardExpired[0]),
          exp_year: parseFloat(`20${splitCardExpired[1]}`)
        };
        const response = await axios.post('/stripe/create-payment-method', data);

        if (response) {
          const data = {
            paymentMethodId: response.data.paymentMethod_Id
          };
          dispatch(attackCardToUser(data));
          await fakeRequest(500);
          handleCancel();
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('Add card success', { variant: 'success' });
        }
      } catch (err) {
        setSubmitting(false);
        enqueueSnackbar(err.error.message, { variant: 'error' });
      }
    }
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleSubscrite = async () => {
    try {
      const data = {
        stripePriceId: 'price_1M6QmnAOwQFyvQrL3BcnQQnc'
      };
      const response = await axios.post('/subscriptions/monthly', data);
      if (response) {
        dispatch(getProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {myProfile?.isSubscrite || (user?.isSubscrite && plan) ? (
            <Card sx={{ p: 3 }}>
              {plan && (
                <>
                  <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
                    Your Plan
                  </Typography>
                  <Typography variant="h4">{plan.name}</Typography>
                  <Box
                    sx={{
                      mt: { xs: 2, sm: 0 },
                      position: { sm: 'absolute' },
                      top: { sm: 24 },
                      right: { sm: 24 }
                    }}
                  >
                    <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                      Cancel plan
                    </Button>
                    <Button size="small" variant="outlined">
                      Upgrade plan
                    </Button>
                  </Box>
                </>
              )}
            </Card>
          ) : (
            <PaymentSummary />
          )}

          <AccountBillingPaymentMethod
            cards={cardsPayment}
            formik={formik}
            isOpen={open}
            onOpen={handleOpenAddCard}
            onCancel={handleCancel}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

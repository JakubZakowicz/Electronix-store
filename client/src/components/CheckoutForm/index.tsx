'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoFormSchema } from '@/src/utils/types';
import { personalInfoSchema } from '@/src/utils/validationSchemas';
import InputField from '../InputField';
import { personalInfoInputs } from '@/src/utils/personalInfoInputs';
import DefaultButton from '../DefaultButton';
import Payment from '../Payment';
import { useGetMe, useGetUser } from '@/src/api/auth';

const CheckoutForm = () => {
  const [isPayment, setIsPayment] = useState(false);

  const { data: me, isError, error } = useGetMe();

  if (isError && error?.response?.statusText !== 'Unauthorized')
    throw new Error(error.message);

  const {
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetUser(me?.userId);

  if (isUserError) throw new Error(userError.message);

  const defaultValues: any = {};

  personalInfoInputs.forEach(({ fieldName }) => {
    defaultValues[fieldName] = '';
  });

  const { control, handleSubmit, getValues, reset } =
    useForm<PersonalInfoFormSchema>({
      resolver: zodResolver(personalInfoSchema),
      defaultValues,
    });

  const onSubmit: SubmitHandler<PersonalInfoFormSchema> = () => {
    setIsPayment(true);
  };

  const editUserInfo = () => {
    setIsPayment(false);
  };

  useEffect(() => {
    const inputs: any = {};
    personalInfoInputs.forEach(({ fieldName }) => {
      inputs[fieldName] = user?.[fieldName];
    });
    reset(inputs);
  }, [user]);

  return (
    <>
      {isPayment ? (
        <Grid sx={{ position: 'relative' }} sm={12} lg={8}>
          <Typography variant="h1" fontSize="25px">
            User Information
          </Typography>
          <DefaultButton
            name="Edit"
            style={{
              position: 'absolute',
              top: '0',
              right: '0px',
              padding: '0 30px',
            }}
            onClick={editUserInfo}
          />
          <Box sx={{ marginTop: '30px' }}>
            {Object.keys(getValues()).map((key: any) => (
              <Box key={key} sx={{ marginTop: '10px' }}>
                {getValues(key)}
              </Box>
            ))}
          </Box>
          <Payment />
        </Grid>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h1" fontSize="25px">
            User Information
          </Typography>
          <Grid container marginTop="20px" rowSpacing={5} columnSpacing={10}>
            {personalInfoInputs.map(({ fieldName, labelName, type }) => (
              <Grid key={fieldName} item md={6}>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error },
                  }) => (
                    <InputField
                      label={labelName}
                      helperText={error ? error.message : null}
                      {...field}
                      type={type}
                    />
                  )}
                />
              </Grid>
            ))}
            <Grid
              item
              sm={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <DefaultButton
                name="Continue"
                style={{ marginTop: '10px' }}
                type="submit"
              />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;

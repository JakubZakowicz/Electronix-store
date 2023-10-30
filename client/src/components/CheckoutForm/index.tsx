'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoFormSchema } from '@/src/utils/types';
import { personalInfoSchema } from '@/src/utils/validationSchemas';
import InputField from '../InputField';
import { personalInfoInputs } from '@/src/utils/personalInfoInputs';
import DefaultButton from '../DefaultButton';
import Payment from '../Payment';

const CheckoutForm = () => {
  const [isPayment, setIsPayment] = useState(false);

  const { control, handleSubmit, getValues } = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: 'Sherlock',
      lastName: 'Holmes',
      email: 'sherlock.holmes@gmail.com',
      phoneNumber: '123456789',
      country: 'England',
      city: 'London',
      streetAddress: 'Baker Street 221B',
      postCode: '12-345'
    }
  });

  const onSubmit: SubmitHandler<PersonalInfoFormSchema> = () => {
    setIsPayment(true);
  };

  const editUserInfo = () => {
    setIsPayment(false);
  };

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

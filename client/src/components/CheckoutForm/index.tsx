'use client';

import React from 'react';
import { Grid, Button } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutFormSchema } from '@/src/utils/types';
import { checkoutSchema } from '@/src/utils/validationSchemat';
import InputField from '../InputField';
import { checkoutInputs } from './inputs';

const CheckoutForm = () => {
  const { control, handleSubmit } = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container marginTop="20px" rowSpacing={5} columnSpacing={10}>
        {checkoutInputs.map(({ fieldName, labelName }) => (
          <Grid key={fieldName} item md={6}>
            <Controller
              name={fieldName}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  labelName={labelName}
                  helperText={error ? error.message : null}
                  {...field}
                />
              )}
            />
          </Grid>
        ))}
        <Grid item sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            sx={{
              color: 'white',
              padding: '6px 50px',
              border: '1px solid white',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '0',
              marginTop: '10px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
          >
            Pay
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;

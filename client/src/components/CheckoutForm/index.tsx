'use client';

import React from 'react';
import { Grid } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoFormSchema } from '@/src/utils/types';
import { personalInfoSchema } from '@/src/utils/validationSchemas';
import InputField from '../InputField';
import { personalInfoInputs } from '@/src/utils/personalInfoInputs';
import DefaultButton from '../DefaultButton';

const CheckoutForm = () => {
  const { control, handleSubmit } = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit: SubmitHandler<PersonalInfoFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container marginTop="20px" rowSpacing={5} columnSpacing={10}>
        {personalInfoInputs.map(({ fieldName, labelName, type }) => (
          <Grid key={fieldName} item md={6}>
            <Controller
              name={fieldName}
              control={control}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
        <Grid item sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <DefaultButton name="Pay" style={{ marginTop: '10px' }} />
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;

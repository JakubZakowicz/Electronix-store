'use client';

import { personalInfoInputs } from '@/src/utils/personalInfoInputs';
import InputField from '@/src/components/InputField';
import { PersonalInfoFormSchema } from '@/src/utils/types';
import { personalInfoSchema } from '@/src/utils/validationSchemat';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const EditAccountDetails = () => {
  const { control, handleSubmit } = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit: SubmitHandler<PersonalInfoFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Typography
        variant="h1"
        fontSize={30}
        textAlign="center"
        marginBottom={7}
      >
        Edit account details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'center',
            margin: 'auto',
          }}
        >
          {personalInfoInputs.map(({ fieldName, labelName, type }) => (
            <Controller
              key={fieldName}
              name={fieldName}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label={labelName}
                  helperText={error ? error.message : null}
                  {...field}
                  type={type}
                />
              )}
            />
          ))}
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
            Update account details
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditAccountDetails;

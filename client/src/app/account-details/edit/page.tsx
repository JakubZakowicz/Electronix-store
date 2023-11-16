'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import { personalInfoInputs } from '@/src/utils/personalInfoInputs';
import InputField from '@/src/components/InputField';
import { PersonalInfoFormSchema } from '@/src/utils/types';
import { personalInfoSchema } from '@/src/utils/validationSchemas';
import { useGetMe, useGetUser, useUpdateUser } from '@/src/api/auth';
import DefaultButton from '@/src/components/DefaultButton';
import { pageRoutes } from '@/src/routes/pageRoutes';

const EditAccountDetails = () => {
  const { control, handleSubmit, reset } = useForm<PersonalInfoFormSchema>({
    resolver: zodResolver(personalInfoSchema),
  });

  const { data: me, isError, error } = useGetMe();

  if (isError) throw new Error(error.message);

  const {
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetUser(me?.userId);

  if (isUserError) throw new Error(userError.message);

  const {
    mutate: updateUser,
    isError: isUpdateUserError,
    error: updateUserError,
  } = useUpdateUser(me?.userId);

  const router = useRouter();

  useEffect(() => {
    reset(user);
  }, [user]);

  const onSubmit: SubmitHandler<PersonalInfoFormSchema> = (data) => {
    updateUser(data, {
      onSuccess: () => router.push(pageRoutes.accountDetails()),
    });
  };

  if (isUpdateUserError) throw new Error(updateUserError.message)

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
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <InputField
                  label={labelName}
                  helperText={error ? error.message : null}
                  InputLabelProps={{ shrink: !!field.value }}
                  {...field}
                  type={type}
                />
              )}
            />
          ))}
          <DefaultButton name="Update Account Details" type="submit" />
        </Box>
      </form>
    </Box>
  );
};

export default EditAccountDetails;

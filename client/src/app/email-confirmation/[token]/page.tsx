'use client';

import React from 'react';
import { useConfirmEmail } from '@/src/api/auth';
import ResultMessage from '@/src/components/ResultMessage';

interface EmailConfirmationProps {
  params: { token: string };
}

const EmailConfirmation = ({ params }: EmailConfirmationProps) => {
  const { token } = params;

  const {
    data: emailConfirmationResult,
    isError: isEmailConfirmationError,
    error: emailConfirmationError,
  } = useConfirmEmail(token);

  return (
    <>
      {emailConfirmationResult && (
        <ResultMessage message={emailConfirmationResult?.message} />
      )}
      {isEmailConfirmationError && (
        <ResultMessage
          isSuccess={false}
          message={
            (emailConfirmationError?.response?.data as { message: string })
              ?.message
          }
        />
      )}
    </>
  );
};

export default EmailConfirmation;

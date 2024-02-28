'use client'

import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Props {
  children: React.ReactNode;
}

const DarkThemeWrapper = ({ children }: Props) => {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  )
}

export default DarkThemeWrapper
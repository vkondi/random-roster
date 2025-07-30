'use client';

import { Box, Typography } from '@mui/material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: { xs: 2, sm: 4, lg: 8 },
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          fontWeight: 500,
        }}
      >
        Copyright © {currentYear} Vishwajeet Kondi. All rights reserved.
      </Typography>
    </Box>
  );
}; 
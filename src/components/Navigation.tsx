'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Groups', href: '/groups' },
  { name: 'Shuffle', href: '/shuffle' },
  { name: 'Sort', href: '/sort' },
  { name: 'Pairs', href: '/pairs' },
  { name: 'Random', href: '/random' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ px: { xs: 2, sm: 4, lg: 8 } }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          Random Roster
        </Typography>

        {/* Desktop navigation */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 6, gap: 2 }}>
          {navigation.map((item) => (
            <Button
              key={item.name}
              component={Link}
              href={item.href}
              color={pathname === item.href ? 'primary' : 'inherit'}
              sx={{
                fontWeight: pathname === item.href ? 600 : 500,
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open menu"
          edge="start"
          onClick={() => setMobileMenuOpen(true)}
          sx={{ ml: 'auto', display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile menu drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            display: { sm: 'none' },
            '& .MuiDrawer-paper': {
              width: '100%',
              maxWidth: 360,
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Random Roster
            </Typography>
            <IconButton color="inherit" onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ px: 2 }}>
            {navigation.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname === item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ListItemText 
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: pathname === item.href ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
} 
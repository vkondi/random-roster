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
  Menu,
  MenuItem,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
  Shuffle as ShuffleIcon,
  Sort as SortIcon,
  Group as GroupIcon,
  Casino as CasinoIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import { ThemeToggle } from '@/components/ThemeToggle';

const tools = [
  { name: 'Shuffle', href: '/shuffle', icon: ShuffleIcon },
  { name: 'Sort', href: '/sort', icon: SortIcon },
  { name: 'Pairs', href: '/pairs', icon: GroupIcon },
  { name: 'Random', href: '/random', icon: CasinoIcon },
  { name: 'All-in-One', href: '/all-in-one', icon: AppsIcon },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsMenuAnchor, setToolsMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();

  const handleToolsClick = (event: React.MouseEvent<HTMLElement>) => {
    setToolsMenuAnchor(event.currentTarget);
  };

  const handleToolsClose = () => {
    setToolsMenuAnchor(null);
  };

  const handleMobileToolsToggle = () => {
    setMobileToolsOpen(!mobileToolsOpen);
  };

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

        {/* Desktop navigation - right aligned */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto', gap: 2, alignItems: 'center' }}>
          <Button
            component={Link}
            href="/groups"
            color={pathname === '/groups' ? 'primary' : 'inherit'}
            sx={{
              fontWeight: pathname === '/groups' ? 600 : 500,
            }}
          >
            Groups
          </Button>
          <Button
            color={tools.some(tool => tool.href === pathname) ? 'primary' : 'inherit'}
            onClick={handleToolsClick}
            endIcon={<ExpandMore />}
            sx={{
              fontWeight: tools.some(tool => tool.href === pathname) ? 600 : 500,
            }}
          >
            Tools
          </Button>
          <ThemeToggle />
        </Box>

        {/* Tools dropdown menu */}
        <Menu
          anchorEl={toolsMenuAnchor}
          open={Boolean(toolsMenuAnchor)}
          onClose={handleToolsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {tools.map((tool) => (
            <MenuItem
              key={tool.name}
              component={Link}
              href={tool.href}
              onClick={handleToolsClose}
              selected={pathname === tool.href}
              sx={{ minWidth: 180 }}
            >
              <ListItemIcon>
                <tool.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{tool.name}</ListItemText>
            </MenuItem>
          ))}
        </Menu>

        {/* Mobile menu button */}
        <Box sx={{ ml: 'auto', display: { sm: 'none' }, alignItems: 'center', gap: 2 }}>
          <ThemeToggle />
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

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
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/groups"
                selected={pathname === '/groups'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Groups" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleMobileToolsToggle}>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                {mobileToolsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileToolsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {tools.map((tool) => (
                  <ListItemButton
                    key={tool.name}
                    component={Link}
                    href={tool.href}
                    selected={pathname === tool.href}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <tool.icon />
                    </ListItemIcon>
                    <ListItemText primary={tool.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
} 
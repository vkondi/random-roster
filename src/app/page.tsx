'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import { 
  Shuffle as ShuffleIcon, 
  Sort as SortIcon, 
  Group as GroupIcon,
  ArrowForward as ArrowForwardIcon,
  Casino as CasinoIcon,
} from '@mui/icons-material';

export default function Home() {
  const router = useRouter();
  const groups = useStore((state) => state.groups);

  useEffect(() => {
    // Only redirect to groups page if there are no groups and we're not coming from there
    if (groups.length === 0 && window.location.pathname === '/') {
      router.push('/groups');
    }
  }, [groups, router]);

  const features = [
    {
      name: 'Team Shuffler',
      description: 'Create random groups by splitting team members equally.',
      icon: ShuffleIcon,
      href: '/shuffle',
      color: 'primary.main',
    },
    {
      name: 'Team Sorting',
      description: 'Sort team members randomly for fair and unbiased ordering.',
      icon: SortIcon,
      href: '/sort',
      color: 'primary.main',
    },
    {
      name: 'Create Team Pairs',
      description: 'Create random pairs for buddy systems and pair programming.',
      icon: GroupIcon,
      href: '/pairs',
      color: 'primary.main',
    },
    {
      name: 'Select Random Members',
      description: 'Select random members for tasks and presentations.',
      icon: CasinoIcon,
      href: '/random',
      color: 'primary.main',
    },
    {
      name: 'Team Groups',
      description: 'Create and manage custom groups of team members.',
      icon: GroupIcon,
      href: '/groups',
      color: 'primary.main',
    },
    {
      name: 'All-in-One',
      description: 'Access all features in one place - shuffle, sort, pair, or select random members.',
      icon: ShuffleIcon,
      href: '/all-in-one',
      color: 'primary.main',
    },
  ];

  if (groups.length === 0) {
    return null; // Return null as we're redirecting
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Welcome to Random Roster
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Simplify team organization with our powerful tools
              </Typography>
            </Box>
            <ThemeToggle />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              component={Link}
              href={feature.href}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent sx={{ p: 3, flex: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <feature.icon sx={{ fontSize: 24, color: feature.color }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', mt: 'auto', pt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Get started
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Your Groups
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3, mt: 1 }}>
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GroupIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom={false}>
                        {group.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

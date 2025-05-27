import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '@/types';
import { MemberAvatar } from './MemberAvatar';
import { Box, Grid as MuiGrid, Paper, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface MemberListProps {
  members: TeamMember[];
  onRemove?: (id: string) => void;
  animate?: boolean;
}

export const MemberList = ({ members, onRemove, animate = false }: MemberListProps) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
      <AnimatePresence>
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            style={{ height: '100%' }}
          >
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  boxShadow: 1,
                  bgcolor: 'grey.50',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flexShrink: 0 }}>
                  <MemberAvatar seed={member.avatarSeed} size={32} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Member #{index + 1}
                  </Typography>
                </Box>
                {onRemove && (
                  <IconButton
                    onClick={() => onRemove(member.id)}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        bgcolor: 'error.lighter',
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}; 
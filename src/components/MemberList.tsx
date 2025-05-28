import { motion, AnimatePresence } from 'framer-motion';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TeamMember } from '@/types';
import { MemberAvatar } from './MemberAvatar';
import { Box, Paper, Typography, IconButton, TextField, Checkbox, Tooltip } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';

interface MemberListProps {
  members: TeamMember[];
  onRemove?: (id: string) => void;
  onEdit?: (id: string, newName: string) => void;
  onToggleExclusion?: (id: string) => void;
  animate?: boolean;
}

export const MemberList = ({ members, onRemove, onEdit, onToggleExclusion, animate = false }: MemberListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setEditName(member.name);
  };

  const handleSaveEdit = (id: string) => {
    if (onEdit && editName.trim()) {
      onEdit(id, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

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
                opacity: member.excluded ? 0.6 : 1,
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
                  {editingId === member.id ? (
                    <TextField
                      size="small"
                      fullWidth
                      value={editName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
                      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          handleSaveEdit(member.id);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {onToggleExclusion && (
                    <Tooltip title={member.excluded ? "Include in shuffle/sort" : "Exclude from shuffle/sort"}>
                      <Checkbox
                        size="small"
                        checked={member.excluded}
                        onChange={() => onToggleExclusion(member.id)}
                      />
                    </Tooltip>
                  )}
                  {onEdit && (
                    editingId === member.id ? (
                      <IconButton
                        onClick={() => handleSaveEdit(member.id)}
                        size="small"
                        color="primary"
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleStartEdit(member)}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )
                  )}
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
              </Box>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}; 
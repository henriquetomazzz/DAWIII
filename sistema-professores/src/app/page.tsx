'use client';
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { School, ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          gap: 3
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            bgcolor: 'primary.light', 
            borderRadius: '50%', 
            display: 'inline-flex' 
          }}
        >
          <School sx={{ fontSize: 60, color: 'white' }} />
        </Paper>

        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Portal Acadêmico
        </Typography>

        <Typography variant="h5" color="text.secondary" paragraph>
          Seja bem-vindo ao sistema de consulta e contato. 
          Selecione um dos professores abaixo para visualizar as disciplinas e enviar mensagens.
        </Typography>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          sx={{ mt: 4 }}
        >
          {[1, 2, 3].map((id) => (
            <Button
              key={id}
              variant="outlined"
              size="large"
              component={Link}
              href={`/professor/${id}`}
              endIcon={<ArrowForward />}
              sx={{ minWidth: 200 }}
            >
              Professor {id === 1 ? 'Alan Turing' : id === 2 ? 'Ada Lovelace' : 'Grace Hopper'}
            </Button>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
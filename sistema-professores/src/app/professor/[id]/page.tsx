'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Typography, Container, Card, Button, List, ListItem, 
  ListItemText, Divider, Modal, Box, Avatar, Stack 
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { professores } from '@/data/professores';
import TextField from '@mui/material/TextField'; 

export default function ProfessorPage() {
  const { id } = useParams();
  const router = useRouter();
  const professor = professores.find(p => p.id === id);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', assunto: '', mensagem: '' });

  if (!professor) return <Typography>Professor não encontrado.</Typography>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ mb: 4 }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar 
            alt={professor.nome} 
            src={professor.fotoUrl} 
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h4" component="h1">
            {professor.nome}
          </Typography>
        </Stack>

        <Button 
            onClick={() => router.push('/')} 
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />} // Coloca o ícone antes do texto
            sx={{ 
                height: '45px', 
                borderRadius: '4px',
                px: 2, // Adiciona um preenchimento nas laterais para o texto caber
                fontWeight: 'bold'
            }}
            >
            Voltar
        </Button>
      </Stack>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Disciplinas</Typography>
      <List>
        {professor.disciplinas.map((d, index) => (
          <ListItem key={index}>
            <ListItemText primary={d.nome} secondary={`${d.curso} - ${d.semestre}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      <Card component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 1250 }}>
        <Typography variant="h6" gutterBottom>Contato</Typography>
        <TextField 
          fullWidth label="Seu Nome" margin="normal" required
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
        />
        <TextField 
          fullWidth label="Assunto" margin="normal" required
          value={formData.assunto}
          onChange={(e) => setFormData({...formData, assunto: e.target.value})}
        />
        <TextField 
          fullWidth label="Mensagem" margin="normal" multiline rows={4} required
          value={formData.mensagem}
          onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Enviar</Button>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Typography variant="h6">Informações Enviadas</Typography>
          <Typography sx={{ mt: 2 }}><strong>Aluno:</strong> {formData.nome}</Typography>
          <Typography><strong>Assunto:</strong> {formData.assunto}</Typography>
          <Typography><strong>Mensagem:</strong> {formData.mensagem}</Typography>
          <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>Fechar</Button>
        </Box>
      </Modal>
    </Container>
  );
}
'use client';

import { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Box } from '@mantine/core';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import FallingOrbs from '../../../components/FallingOrbs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/${locale}/internal`);
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #020b1e 0%, #0a1936 100%)',
      color: '#fff'
    }}>
      <FallingOrbs />
      
      <Container size="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <Paper radius="md" p="xl" withBorder className="glass" w="100%" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Title order={2} ta="center" mt="md" mb="xl" c="white">
            Internal Access
          </Title>

        <form onSubmit={handleLogin}>
          <TextInput
            label="Email"
            placeholder="admin@markazalhijaz.org"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />

          {error && (
            <Text c="red" size="sm" ta="center" mt="md">
              {error}
            </Text>
          )}

          <Button fullWidth mt="xl" type="submit" loading={loading} className="btn-gold">
            Sign In
          </Button>
        </form>
        </Paper>
      </Container>
    </Box>
  );
}

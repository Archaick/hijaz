'use client';

import { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Box, Image, Group, ActionIcon } from '@mantine/core';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { IconHome } from '@tabler/icons-react';
import FallingOrbs from '../../../components/FallingOrbs';
import Link from 'next/link';

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
        <Paper radius="md" p="xl" withBorder className="glass" w="100%" style={{ borderColor: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative Background Logo */}
          <Image 
            src="/favicon.svg" 
            alt="" 
            w={200} 
            h={200} 
            style={{ 
              position: 'absolute', 
              top: -40, 
              left: -40, 
              opacity: 0.07, 
              zIndex: 0, 
              filter: 'brightness(0) invert(1)',
              transform: 'rotate(-15deg)',
              pointerEvents: 'none'
            }} 
          />

          <Group justify="flex-end" mb="lg" style={{ position: 'relative', zIndex: 2 }}>
            <Button 
              component={Link} 
              href={`/${locale}`} 
              variant="subtle" 
              color="gray" 
              size="xs" 
              leftSection={<IconHome size={16} />}
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Home
            </Button>
          </Group>

          <Title order={2} ta="center" mt="md" mb="xl" c="white" style={{ position: 'relative', zIndex: 1 }}>
            Internal Access
          </Title>

          <Box style={{ position: 'relative', zIndex: 1 }}>
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
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

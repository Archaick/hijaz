'use client';

import { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

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
    <Container size="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper radius="md" p="xl" withBorder className="glass" w="100%">
        <Title order={2} ta="center" mt="md" mb="xl">
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
  );
}

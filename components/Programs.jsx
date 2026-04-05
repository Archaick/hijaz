'use client';
import { Container, Grid, Box, Text, Title, Button, Badge } from '@mantine/core';
import {
  IconBook2, IconUsers, IconDeviceLaptop, IconWorldPin,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const programs = [
  { key: 'p1', icon: IconBook2,        color: 'var(--color-secondary)' },
  { key: 'p2', icon: IconUsers,        color: 'var(--color-tertiary)' },
  { key: 'p3', icon: IconDeviceLaptop, color: '#6ab5e0' },
  { key: 'p4', icon: IconWorldPin,     color: '#a78bfa' },
];

export default function Programs() {
  const t = useTranslations('programs');

  return (
    <Box
      component="section"
      id="programs"
      className="section"
      style={{
        background: 'light-dark(var(--color-surface-low), rgba(10,20,38,0.95))',
      }}
    >
      <Container size="xl">
        {/* Header */}
        <Box mb={64} style={{ maxWidth: 640 }}>
          <Text className="eyebrow-text" mb="md">
            {t('eyebrow')}
          </Text>
          <Title className="section-headline" mb="lg">
            {t('headline')}
          </Title>
          <Text size="lg" c="dimmed" style={{ lineHeight: 1.75, fontWeight: 300 }}>
            {t('subtext')}
          </Text>
        </Box>

        {/* Program cards */}
        <Grid gutter={{ base: 'md', md: 'xl' }}>
          {programs.map(({ key, icon: Icon, color }) => (
            <Grid.Col key={key} span={{ base: 12, sm: 6 }}>
              <Box
                className="program-card"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--mantine-color-body)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 4px 24px rgba(0,7,23,0.05)',
                }}
              >
                {/* Icon */}
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} stroke={1.5} />
                </Box>

                <Box style={{ flex: 1 }}>
                  <Title
                    order={3}
                    mb="xs"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {t(`${key}_title`)}
                  </Title>
                  <Text
                    size="sm"
                    c="dimmed"
                    style={{ lineHeight: 1.7, fontWeight: 300 }}
                  >
                    {t(`${key}_desc`)}
                  </Text>
                </Box>

                {/* CTA */}
                <Button
                  variant="subtle"
                  size="sm"
                  component="a"
                  href="#"
                  style={{
                    color,
                    padding: '0',
                    fontWeight: 600,
                    width: 'fit-content',
                    justifyContent: 'flex-start',
                  }}
                  rightSection={<span style={{ fontSize: '1rem' }}>→</span>}
                >
                  {t(`${key}_cta`)}
                </Button>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

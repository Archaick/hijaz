'use client';
import { Container, Grid, Box, Text, Title, ThemeIcon } from '@mantine/core';
import { IconCheck, IconBrain } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const pillars = [
  {
    key: 'pillar1',
    icon: IconCheck,
    color: 'var(--color-secondary)',
  },
  {
    key: 'pillar2',
    icon: IconBrain,
    color: 'var(--color-tertiary)',
  },
];

export default function Features() {
  const t = useTranslations('features');

  return (
    <Box
      component="section"
      id="about"
      className="section"
      style={{ background: 'var(--mantine-color-body)' }}
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
          <Text
            size="lg"
            c="dimmed"
            style={{ lineHeight: 1.75, fontWeight: 300 }}
          >
            {t('subtext')}
          </Text>
        </Box>

        {/* Pillars */}
        <Grid gutter={{ base: 'lg', md: 'xl' }}>
          {pillars.map(({ key, icon: Icon, color }) => (
            <Grid.Col key={key} span={{ base: 12, md: 6 }}>
              <Box
                className="program-card"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'light-dark(var(--color-surface-low), rgba(17,32,53,0.6))',
                  height: '100%',
                }}
              >
                {/* Icon badge */}
                <ThemeIcon
                  size={52}
                  radius="md"
                  mb="lg"
                  style={{
                    background: `${color}18`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={26} stroke={1.5} />
                </ThemeIcon>

                <Title
                  order={3}
                  mb="sm"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  {t(`${key}_title`)}
                </Title>
                <Text c="dimmed" style={{ lineHeight: 1.7, fontWeight: 300 }}>
                  {t(`${key}_desc`)}
                </Text>
              </Box>
            </Grid.Col>
          ))}
        </Grid>

        {/* Decorative divider */}
        <Box
          mt={80}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--color-secondary) 50%, transparent)',
            opacity: 0.25,
          }}
        />
      </Container>
    </Box>
  );
}

'use client';
import { Container, Grid, Box, Flex, Text, Title, Button, Badge } from '@mantine/core';
import {
  IconBook2, IconUsers, IconDeviceLaptop, IconWorldPin,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const otherPrograms = [
  { key: 'p2', icon: IconUsers,        color: 'var(--color-tertiary)' },
  { key: 'p3', icon: IconDeviceLaptop, color: '#6ab5e0' },
];

export default function Programs() {
  const t = useTranslations('programs');

  return (
    <Box
      component="section"
      id="programs"
      className="section"
      style={{
        background: 'light-dark(var(--color-surface-low), var(--color-primary))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
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
          {/* Stretched Markaz Tadarus Box */}
          <Grid.Col span={12}>
            <Box
              component="a"
              href="https://markaztadarus.com"
              target="_blank"
              className="program-card"
              style={{
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                background: 'light-dark(rgba(255,255,255,0.7), rgba(17,32,53,0.6))',
                border: '1px solid light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05))',
                boxShadow: '0 8px 32px rgba(0,7,23,0.1)',
                textDecoration: 'none',
                color: 'inherit',
                overflow: 'hidden',
                position: 'relative',
                backdropFilter: 'blur(12px)',
                display: 'block'
              }}
            >
              <Flex
                direction={{ base: 'column-reverse', md: 'row' }}
                align="center"
                gap={{ base: '1rem', md: '3rem' }}
              >
                <Box style={{ flex: 1, zIndex: 1, width: '100%' }}>
                  <Title
                    order={3}
                    mb="md"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {t('p1_title')}
                  </Title>
                  <Text size="lg" c="dimmed" mb="xl" style={{ lineHeight: 1.7, fontWeight: 300, maxWidth: 600 }}>
                    {t('p1_desc')}
                  </Text>
                  <Button
                    variant="subtle"
                    size="md"
                    className="nav-link-hover"
                    style={{
                      color: 'var(--color-secondary)',
                      padding: '0',
                      fontWeight: 600,
                      pointerEvents: 'none'
                    }}
                    rightSection={<span style={{ fontSize: '1.2rem' }}>→</span>}
                  >
                    {t('p1_cta')}
                  </Button>
                </Box>

                {/* Image container */}
                <Box
                  style={{
                    flex: 1,
                    width: '100%',
                    minHeight: 280,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    style={{
                      position: 'absolute',
                      width: '120%',
                      height: '120%',
                      background: 'radial-gradient(circle at center, rgba(249,195,64,0.1) 0%, transparent 60%)',
                      zIndex: 0
                    }}
                  />
                  <img 
                    src="/tadarus.png" 
                    alt="Markaz Tadarus" 
                    style={{ 
                      position: 'relative',
                      zIndex: 1,
                      width: '100%', 
                      maxHeight: '320px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                    }} 
                  />
                </Box>
              </Flex>
            </Box>
          </Grid.Col>

          {/* Other program boxes */}
          {otherPrograms.map(({ key, icon: Icon, color }) => (
            <Grid.Col key={key} span={{ base: 12, sm: 6 }}>
              <Box
                className="program-card"
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'light-dark(rgba(255,255,255,0.7), rgba(17,32,53,0.6))',
                  border: '1px solid light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05))',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 8px 32px rgba(0,7,23,0.1)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative'
                }}
              >
                {/* Icon */}
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: `${color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} stroke={1.75} />
                </Box>

                <Box style={{ flex: 1, zIndex: 1 }}>
                  <Title
                    order={3}
                    mb="xs"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {t(`${key}_title`)}
                  </Title>
                  <Text
                    size="md"
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
                    color: 'var(--color-secondary)',
                    padding: '0',
                    fontWeight: 600,
                    width: 'fit-content',
                    justifyContent: 'flex-start',
                    zIndex: 1
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

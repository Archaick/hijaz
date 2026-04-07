'use client';
import { Container, Box, Text, Title, Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconBuildingMosque } from '@tabler/icons-react';

export default function DonateCTA() {
  const t = useTranslations('donate');

  return (
    <Box
      component="section"
      id="donate"
      className="section"
    >
      <Container size="xl">
        <Box
          style={{
            background: 'light-dark(var(--color-surface-high), rgba(17, 32, 53, 0.4))',
            border: '1px solid light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05))',
            borderRadius: 'var(--radius-xl)',
            padding: '5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(16px)'
          }}
        >
          {/* Faint Mosque Graphic on the side */}
          <Box
            style={{
              position: 'absolute',
              insetInlineEnd: '4%',
              bottom: '-25%',
              opacity: 0.08,
              pointerEvents: 'none',
              zIndex: 0,
              color: 'light-dark(var(--color-primary), rgba(255,255,255,0.5))'
            }}
            display={{ base: 'none', md: 'block' }}
          >
            <IconBuildingMosque size={320} stroke={1} />
          </Box>

          <Box style={{ maxWidth: 760, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title
              className="display-headline"
              mb="md"
              style={{ color: 'light-dark(var(--color-primary), var(--color-secondary))' }}
            >
              {t('headline')}
            </Title>
            <Text
              size="xl"
              mb={48}
              style={{
                color: 'light-dark(var(--mantine-color-text), rgba(255,255,255,0.85))',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              {t('subtext')}
            </Text>
            <Button className="btn-gold" size="xl" radius="md" style={{ padding: '0 3rem' }}>
              {t('cta')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

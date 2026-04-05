'use client';
import { Container, Box, Text, Title, Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function DonateCTA() {
  const t = useTranslations('donate');

  return (
    <Box
      component="section"
      id="donate"
      className="section"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold radial glow */}
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          insetInlineStart: '60%',
          transform: 'translateY(-50%)',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(249,195,64,0.10) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Box style={{ maxWidth: 640 }}>
          <Text
            className="eyebrow-text"
            mb="lg"
            style={{ color: 'var(--color-secondary)' }}
          >
            {t('eyebrow')}
          </Text>
          <Title
            className="section-headline"
            mb="lg"
            style={{ color: '#ffffff' }}
          >
            {t('headline')}
          </Title>
          <Text
            size="lg"
            mb={48}
            style={{
              color: 'rgba(255,255,255,0.70)',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            {t('subtext')}
          </Text>
          <Button className="btn-gold" size="lg" radius="md">
            {t('cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

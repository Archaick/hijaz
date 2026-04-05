'use client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

export default function ColorSchemeToggle({ size = 'md', ...props }) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Tooltip label={computedColorScheme === 'light' ? 'Dark mode' : 'Light mode'} withArrow>
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="subtle"
        size={size}
        aria-label="Toggle color scheme"
        style={{ color: 'inherit' }}
        {...props}
      >
        {computedColorScheme === 'dark'
          ? <IconSun size={18} stroke={1.5} />
          : <IconMoon size={18} stroke={1.5} />
        }
      </ActionIcon>
    </Tooltip>
  );
}

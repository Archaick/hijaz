import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import '../globals.css';

const theme = createTheme({
  fontFamily: 'var(--font-body)',
  headings: { fontFamily: 'var(--font-display)' },
  defaultRadius: 'md',
  components: {
    Button: { defaultProps: { radius: 'md' } },
    Card:   { defaultProps: { radius: 'lg', padding: 'xl' } },
  },
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    id: 'Markaz Al Hijaz — Menguatkan Masyarakat dengan Nilai Islam',
    en: 'Markaz Al Hijaz — Empowering Communities with Islamic Values',
    ar: 'مركز الحجاز — تمكين المجتمعات بالقيم الإسلامية',
  };
  return {
    title: titles[locale] || titles.id,
    description: 'Markaz Al Hijaz — a nonprofit foundation dedicated to education, charity, and community initiatives across Indonesia.',
    icons: {
      icon: '/logo.svg',
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

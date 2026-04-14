import { setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Programs from '../../components/Programs';
import DonateCTA from '../../components/DonateCTA';
import Footer from '../../components/Footer';
import Stats from '../../components/Stats';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Programs />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}

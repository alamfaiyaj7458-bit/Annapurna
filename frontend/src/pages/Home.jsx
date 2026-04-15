import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Annapurna Marbles &amp; Sanitary | Premium Tiles &amp; Marble Showroom, Biratnagar
        </title>
        <meta
          name="description"
          content="Annapurna Marbles and Sanitary — Biratnagar's leading showroom for premium floor tiles, wall tiles, Italian marble, granite, sanitaryware and bathroom fittings. Authorised dealers for Jaguar, Hindware, Orient Ceramics."
        />
        <meta
          name="keywords"
          content="tiles Biratnagar, marble shop Biratnagar, sanitaryware Biratnagar, granite Nepal, bathroom fittings Biratnagar, Jaguar fittings Nepal, Hindware Nepal, Annapurna Marbles"
        />
        <meta
          property="og:title"
          content="Annapurna Marbles & Sanitary | Biratnagar"
        />
        <meta
          property="og:description"
          content="Premium tiles, marble, granite and sanitaryware showroom in Biratnagar, Nepal."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://annapurnamarbles.com.np" />
      </Helmet>

      <Navbar />

      <main>
        <Hero />
        <ProductGrid />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ServicesSection from './components/ServicesSection/ServicesSection';
import CTAStrip from './components/CTAStrip/CTAStrip';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <CTAStrip />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

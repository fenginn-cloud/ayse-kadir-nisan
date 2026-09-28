import { CalendarSection } from './components/CalendarSection';
import { CoupleSection } from './components/CoupleSection';
import { DateSection } from './components/DateSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LocationSection } from './components/LocationSection';
import { RSVPSection } from './components/RSVPSection';
import { useReveal } from './lib/useReveal';

export default function App() {
  useReveal();

  return (
    <div className="page">
      <a className="skip-link" href="#katilim">
        Katılım formuna geç
      </a>
      <main>
        <Hero />
        <DateSection />
        <CoupleSection />
        <RSVPSection />
        <LocationSection />
        <CalendarSection />
      </main>
      <Footer />
    </div>
  );
}

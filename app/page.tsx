import { fetchSalonData } from '@/lib/data';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default async function Home() {
  const data = await fetchSalonData();

  return (
    <main>
      <Navbar navigation={data.navigation} salonName={data.salon.name} />
      <HeroSection hero={data.hero} />
    </main>
  );
}

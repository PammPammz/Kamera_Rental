import Footer from '@/components/footer';
import Header from '@/components/header';
import CameraCollection from './camera-collection';
import HeroSection from './hero-section';
import HowItWorks from './how-it-works';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <CameraCollection />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
}

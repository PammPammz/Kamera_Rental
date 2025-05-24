import UserLayout from '@/layouts/user-layout';
import CameraCollection from './camera-collection';
import HeroSection from './hero-section';
import HowItWorks from './how-it-works';

export default function Home() {
    return (
        <UserLayout>
            <HeroSection />
            <CameraCollection />
            <HowItWorks />
        </UserLayout>
    );
}

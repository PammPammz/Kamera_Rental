import { Button } from '@/components/ui/button';
import { Inertia } from '@inertiajs/inertia';

export default function HeroSection() {
    return (
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Rent Professional Cameras</h1>
                            <p className="text-muted-foreground max-w-[600px] md:text-xl">
                                Get access to high-quality cameras and equipment for your photography needs without the high cost of ownership.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" onClick={() => Inertia.visit('/camera-equipments')}>
                                Browse Cameras
                            </Button>
                            <Button variant="outline" size="lg">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <img
                        src="https://picsum.photos/200"
                        alt="Professional camera equipment"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    />
                </div>
            </div>
        </section>
    );
}

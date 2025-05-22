export default function HowItWorks() {
    const steps = [
        {
            title: 'Choose Your Camera',
            description: 'Browse our collection and select the perfect camera for your needs.',
        },
        {
            title: 'Book Your Rental',
            description: 'Select your rental dates and complete the booking process.',
        },
        {
            title: 'Pickup or Delivery',
            description: 'Pick up your camera at our store or choose delivery to your location.',
        },
    ];

    return (
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                        <p className="text-muted-foreground max-w-[600px] md:text-xl">Renting a camera is easy with our simple 3-step process.</p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
                        {steps.map((step, idx) => (
                            <div className="space-y-2" key={idx}>
                                <div className="bg-primary text-primary-foreground inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

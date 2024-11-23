import Image from "next/image";

export function SocialProof() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Join 10,000+ Businesses Streamlining Support with AI
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="TechCorp Logo"
                className="h-8 w-auto dark:invert"
                width={120}
                height={32}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="RetailMate Logo"
                className="h-8 w-auto dark:invert"
                width={120}
                height={32}
              />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="EduConnect Logo"
                className="h-8 w-auto dark:invert"
                width={120}
                height={32}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">50+</span> Integrations
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">98%</span> Satisfaction
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">1000s</span> of
              Assistants Deployed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SocialProof;

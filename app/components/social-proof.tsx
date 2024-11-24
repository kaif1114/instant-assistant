import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Join 10,000+ Businesses Streamlining Support with AI
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Trusted by leading companies to enhance their customer experience
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-5">
          <Image
            src="/placeholder.svg"
            alt="TechCorp Logo"
            className="mx-auto h-12 w-auto dark:invert"
            width={120}
            height={48}
          />
          <Image
            src="/placeholder.svg"
            alt="RetailMate Logo"
            className="mx-auto h-12 w-auto dark:invert"
            width={120}
            height={48}
          />
          <Image
            src="/placeholder.svg"
            alt="EduConnect Logo"
            className="mx-auto h-12 w-auto dark:invert"
            width={120}
            height={48}
          />
          <Image
            src="/placeholder.svg"
            alt="FinTech Innovators Logo"
            className="mx-auto h-12 w-auto dark:invert"
            width={120}
            height={48}
          />
          <Image
            src="/placeholder.svg"
            alt="HealthPlus Logo"
            className="mx-auto h-12 w-auto dark:invert"
            width={120}
            height={48}
          />
        </div>
      </div>
    </section>
  );
}

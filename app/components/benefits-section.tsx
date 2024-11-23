import { Clock, Globe, MessageSquare, Paintbrush } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BenefitsSection() {
  const benefits = [
    {
      title: "No More Repeated Questions",
      description:
        "Your assistant handles FAQs and routine tasks, so you don't have to.",
      icon: MessageSquare,
    },
    {
      title: "Customizable in Minutes",
      description:
        "Tailor your assistant's tone, responses, and appearance to fit your brand.",
      icon: Paintbrush,
    },
    {
      title: "Works 24/7",
      description: "Never miss a query, even outside business hours.",
      icon: Clock,
    },
    {
      title: "Embed Anywhere",
      description:
        "Integrate seamlessly into your website, app, or share a unique link.",
      icon: Globe,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Let Your Assistant Handle the Repetitive Tasks
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="relative overflow-hidden">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;

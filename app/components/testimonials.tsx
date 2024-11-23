import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Testimonials() {
  const testimonials = [
    {
      name: "John D.",
      role: "Retail Business Owner",
      content:
        "It's like having an extra team member. Our assistant handles all repetitive questions, freeing up our staff.",
      avatar: "/placeholder.svg",
    },
    {
      name: "Sarah P.",
      role: "EdTech Founder",
      content:
        "Students love the instant answers, and I love that I didn't have to write a single line of code.",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto  max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Real Stories from Our Users
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="text-left">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;

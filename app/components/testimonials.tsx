import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Customer Support Manager",
    company: "TechCorp",
    content:
      "Instant Assistant has revolutionized our customer support. We've seen a 40% reduction in response times!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Bob Smith",
    role: "E-commerce Director",
    company: "ShopEasy",
    content:
      "Our sales have increased by 25% since implementing Instant Assistant. It's like having a 24/7 sales team.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Carol Davis",
    role: "HR Director",
    company: "InnovateCo",
    content:
      "Instant Assistant has streamlined our HR processes. Employee queries are resolved faster than ever before.",
    avatar: "/placeholder.svg",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FAFAFA] dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-5xl">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {testimonial.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

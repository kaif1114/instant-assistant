import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  const faqs = [
    {
      question: "What type of data can I use?",
      answer:
        "You can upload PDFs, documents, or provide text-based knowledge for your assistant to learn from.",
    },
    {
      question: "How do I customize my assistant?",
      answer:
        "Our platform provides simple tools to define tone, behavior, and functionality without coding.",
    },
    {
      question: "Can I use it on multiple platforms?",
      answer: "Yes! Embed it on websites, apps, or share via a unique link.",
    },
  ];

  return (
    <section
      id="faqs"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Have Questions? We've Got Answers
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
export default FAQ;

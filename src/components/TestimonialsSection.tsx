import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Elizabeth R.",
    location: "Riverside, CA",
    rating: 5,
    text: "Thank you for making my Medicare enrollment process easy. I appreciate the time you took to explain all of my options. I will recommend you to all of my Medicare friends!",
    planType: "Medicare Advantage"
  },
  {
    id: 2,
    name: "Robert M.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "The service was outstanding! They found me a plan that saved me over $200 per month compared to what I was paying. The agent was knowledgeable and patient with all my questions.",
    planType: "Medicare Supplement"
  },
  {
    id: 3,
    name: "Margaret S.",
    location: "Tampa, FL",
    rating: 5,
    text: "I was so confused about Medicare options until I called YourMedGuy. They made everything clear and helped me choose the perfect plan for my needs and budget. Highly recommended!",
    planType: "Prescription Drug Plan"
  },
  {
    id: 4,
    name: "James T.",
    location: "Dallas, TX",
    rating: 5,
    text: "Professional, courteous, and incredibly helpful. They took the stress out of choosing Medicare coverage and found me excellent benefits at a great price. Thank you!",
    planType: "Medicare Advantage"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Testimonials
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            Here's what our clients say about our service...
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardContent className="p-8 sm:p-12 lg:p-16 text-center space-y-8">
              {/* Quote Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed text-pretty max-w-3xl mx-auto">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center">
                <StarRating rating={currentTestimonial.rating} />
              </div>

              {/* Client Info */}
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentTestimonial.name}
                </h4>
                <p className="text-base sm:text-lg text-gray-600 font-medium uppercase tracking-wide">
                  {currentTestimonial.location}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {currentTestimonial.planType}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="p-2 rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="p-2 rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* All Testimonials Grid - Hidden on Mobile */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`bg-white border shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-blue-600 border-blue-600' : 'border-gray-200'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-6 space-y-4">
                <StarRating rating={testimonial.rating} />
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="space-y-1">
                  <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                  <p className="text-xs text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 
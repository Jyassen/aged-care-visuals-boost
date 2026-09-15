import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Elizabeth R.",
    location: "Brooklyn, NY",
    rating: 5,
    text: "Thank you for making my Medicare enrollment process easy. I appreciate the time you took to explain all of my options. I will recommend you to all of my Medicare friends!",
    planType: "Medicare Advantage"
  },
  {
    id: 2,
    name: "Robert M.",
    location: "Queens, NY",
    rating: 5,
    text: "The service was outstanding! They found me a plan that saved me over $200 per month compared to what I was paying. The agent was knowledgeable and patient with all my questions.",
    planType: "Medicare Supplement"
  },
  {
    id: 3,
    name: "Margaret S.",
    location: "Manhattan, NY",
    rating: 5,
    text: "I was so confused about Medicare options until I called YourMedGuy. They made everything clear and helped me choose the perfect plan for my needs and budget. Highly recommended!",
    planType: "Prescription Drug Plan"
  },
  {
    id: 4,
    name: "James T.",
    location: "Bronx, NY",
    rating: 5,
    text: "Professional, courteous, and incredibly helpful. They took the stress out of choosing Medicare coverage and found me excellent benefits at a great price. Thank you!",
    planType: "Medicare Advantage"
  }
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
        <div className="text-center space-y-4 sm:space-y-6 mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Trusted by New Yorkers Like You
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            Real stories from New York families we helped through Medicare.
          </p>

          {/* Aggregate rating badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full shadow-md border border-gray-200 px-5 py-2.5">
            <StarRating rating={5} />
            <span className="text-lg font-bold text-gray-900">4.9<span className="text-gray-400 font-medium">/5</span></span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-sm text-gray-600 font-medium">From verified YourMedGuy clients</span>
          </div>
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
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {getInitials(currentTestimonial.name)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-base sm:text-lg text-gray-600 font-medium uppercase tracking-wide">
                    {currentTestimonial.location}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    Verified client · {currentTestimonial.planType}
                  </p>
                </div>
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
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 leading-tight">{testimonial.name}</h5>
                    <p className="text-xs text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results disclaimer (compliance) */}
        <p className="text-xs text-gray-500 text-center max-w-3xl mx-auto mt-10 leading-relaxed">
          Individual results vary. Testimonials reflect the experiences of specific clients and are not a guarantee of future results or savings.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection; 
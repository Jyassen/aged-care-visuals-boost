import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-6 lg:space-y-8">
                {/* Icon */}
                <div className="flex justify-center lg:justify-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                    <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center lg:text-left space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
                    Join Our Newsletter List
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-pretty">
                    Twice each month we deliver Medicare tips and healthcare insights straight to your email inbox. 
                    Try it, we think you'll like it!
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    You can unsubscribe at any time.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Medicare enrollment deadlines and reminders</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Money-saving tips for prescription drugs</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Updates on Medicare policy changes</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Exclusive healthcare resources and guides</span>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="space-y-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-first-name" className="text-base font-medium text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        id="newsletter-first-name"
                        type="text"
                        placeholder="Enter your first name"
                        className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-last-name" className="text-base font-medium text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        id="newsletter-last-name"
                        type="text"
                        placeholder="Enter your last name"
                        className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newsletter-email" className="text-base font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email address"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Subscribe
                  </Button>
                </form>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We do not share your data with anybody, and only use it for its intended purpose. 
                    Your privacy is our priority.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection; 
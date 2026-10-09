import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { precallPath, type PrecallId } from "@/funnels/config";

type FunnelFormProps = {
  source: string;
  topic: string;
  precall: PrecallId;
  idPrefix?: string;
};

const EMPTY = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  bestTime: "",
};

export default function FunnelForm({ source, topic, precall, idPrefix = "funnel" }: FunnelFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const field = (name: string) => `${idPrefix}-${name}`;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!consent) {
      setSubmitStatus("consent");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source,
          pageUrl,
          message: `Funnel: ${topic}`,
        }),
      });

      if (!response.ok) {
        setSubmitStatus("error");
        return;
      }

      navigate(`${precallPath(precall)}?src=${encodeURIComponent(source)}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={field("firstName")} className="text-base font-medium text-gray-700">
            First Name
          </Label>
          <Input
            id={field("firstName")}
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={formData.firstName}
            onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={field("lastName")} className="text-base font-medium text-gray-700">
            Last Name
          </Label>
          <Input
            id={field("lastName")}
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={formData.lastName}
            onChange={(event) => setFormData((prev) => ({ ...prev, lastName: event.target.value }))}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={field("phone")} className="text-base font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id={field("phone")}
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={formData.phone}
            onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
            required
            autoComplete="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={field("email")} className="text-base font-medium text-gray-700">
            Email
          </Label>
          <Input
            id={field("email")}
            name="email"
            type="email"
            placeholder="your@email.com"
            className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={field("bestTime")} className="text-base font-medium text-gray-700">
          Best Time to Call
        </Label>
        <Select
          value={formData.bestTime}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, bestTime: value }))}
        >
          <SelectTrigger
            id={field("bestTime")}
            className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <SelectValue placeholder="Select preferred time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
            <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
            <SelectItem value="anytime">Anytime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id={field("consent")}
          checked={consent}
          onCheckedChange={(value) => {
            setConsent(value === true);
            if (value === true && submitStatus === "consent") setSubmitStatus("");
          }}
          className="mt-1"
        />
        <Label htmlFor={field("consent")} className="text-sm text-gray-500 font-normal leading-relaxed cursor-pointer">
          By checking this box, I agree to be contacted by a licensed insurance agent from YourMedGuy about Medicare
          plan options by phone, email, or text message, including at the number provided using automated technology.
          Consent is not a condition of purchase, and message/data rates may apply.
        </Label>
      </div>

      {submitStatus === "consent" && (
        <p className="text-sm font-medium text-red-600 text-center">
          Please agree to be contacted so a specialist can reach you.
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-sm font-medium text-red-600 text-center">
          Something went wrong. Please try again or call 888-355-1085.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Meet Your MedGuy"}
      </Button>
      <p className="text-xs text-center text-gray-500 leading-relaxed">
        Free consultation. Booking does not enroll you in a plan, and you do not have to change coverage on the call.
      </p>
    </form>
  );
}

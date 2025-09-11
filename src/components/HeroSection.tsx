import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Briefcase, MapPin, Brain } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

export const HeroSection = ({ onGetStarted, onLearnMore }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 py-20 lg:py-28">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Recommendations
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Internship
            </span>
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground lg:text-2xl max-w-3xl mx-auto">
            Get personalized internship recommendations through our AI-powered platform. 
            Part of the PM Internship Scheme to bridge the skill gap and provide quality opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={onLearnMore} className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">10,000+</h3>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">5,000+</h3>
              <p className="text-sm text-muted-foreground">Internship Opportunities</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">500+</h3>
              <p className="text-sm text-muted-foreground">Partner Companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </section>
  );
};
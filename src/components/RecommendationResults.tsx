import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2, 
  Star, 
  ExternalLink,
  Heart,
  Share2,
  Clock
} from "lucide-react";
import { useState } from "react";

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  skills: string[];
  sector: string;
  matchScore: number;
  applicationDeadline: string;
  startDate: string;
  type: "remote" | "onsite" | "hybrid";
  companySize: string;
  benefits: string[];
}

interface RecommendationResultsProps {
  internships: Internship[];
  onApply?: (internshipId: string) => void;
  onSave?: (internshipId: string) => void;
  onShare?: (internshipId: string) => void;
  onBack?: () => void;
}

export const RecommendationResults = ({ 
  internships, 
  onApply, 
  onSave, 
  onShare,
  onBack 
}: RecommendationResultsProps) => {
  const [savedInternships, setSavedInternships] = useState<Set<string>>(new Set());

  const handleSave = (internshipId: string) => {
    setSavedInternships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(internshipId)) {
        newSet.delete(internshipId);
      } else {
        newSet.add(internshipId);
      }
      return newSet;
    });
    onSave?.(internshipId);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "remote":
        return "🏠";
      case "hybrid":
        return "🔄";
      default:
        return "🏢";
    }
  };

  if (!internships || internships.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">No Recommendations Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any internships matching your criteria. 
            Try updating your preferences or skills.
          </p>
          <Button onClick={onBack}>Update Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Your Personalized Recommendations</h1>
        <p className="text-muted-foreground">
          Based on your profile, we found {internships.length} internship opportunities that match your interests and skills.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onBack}>
            Update Profile
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {internships.map((internship, index) => (
          <Card key={internship.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1} Best Match
                    </Badge>
                    <Badge 
                      className={`text-xs border ${getMatchScoreColor(internship.matchScore)}`}
                      variant="outline"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      {internship.matchScore}% Match
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{internship.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {internship.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {internship.location} {getTypeIcon(internship.type)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {internship.sector}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSave(internship.id)}
                  className={savedInternships.has(internship.id) ? "text-red-500" : ""}
                >
                  <Heart className={`w-4 h-4 ${savedInternships.has(internship.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <CardDescription className="text-base leading-relaxed">
                {internship.description}
              </CardDescription>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Stipend:</span>
                  <span>{internship.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Deadline:</span>
                  <span>{internship.applicationDeadline}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {internship.benefits && internship.benefits.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.benefits.map(benefit => (
                        <Badge key={benefit} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {internship.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Company Size: {internship.companySize} • Starts: {internship.startDate}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => onShare?.(internship.id)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" onClick={() => onApply?.(internship.id)}>
                    Apply Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4 pt-8">
        <p className="text-muted-foreground">
          Want to see more opportunities? Try updating your preferences or skills.
        </p>
        <Button variant="outline" onClick={onBack}>
          Refine Search
        </Button>
      </div>
    </div>
  );
};
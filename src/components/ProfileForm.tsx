import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, X } from "lucide-react";

export interface ProfileData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    year: string;
    cgpa: string;
  };
  skills: string[];
  interests: string[];
  preferences: {
    location: string[];
    sectors: string[];
    duration: string;
    stipend: string;
  };
}

interface ProfileFormProps {
  onSubmit?: (data: ProfileData) => void;
  isLoading?: boolean;
}

export const ProfileForm = ({ onSubmit, isLoading = false }: ProfileFormProps) => {
  const { toast } = useToast();
  const [currentSkill, setCurrentSkill] = useState("");
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: ""
    },
    education: {
      degree: "",
      field: "",
      institution: "",
      year: "",
      cgpa: ""
    },
    skills: [],
    interests: [],
    preferences: {
      location: [],
      sectors: [],
      duration: "",
      stipend: ""
    }
  });

  const skillSuggestions = [
    "JavaScript", "Python", "React", "Node.js", "Java", "SQL", "Machine Learning",
    "Data Analysis", "UI/UX Design", "Project Management", "Digital Marketing",
    "Content Writing", "Communication", "Leadership", "Problem Solving"
  ];

  const sectorOptions = [
    "Technology", "Healthcare", "Finance", "Education", "E-commerce",
    "Manufacturing", "Consulting", "Media", "Government", "NGO",
    "Startups", "Research & Development"
  ];

  const locationOptions = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune",
    "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Remote"
  ];

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const toggleInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const togglePreference = (type: 'location' | 'sectors', value: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: prev.preferences[type].includes(value)
          ? prev.preferences[type].filter(item => item !== value)
          : [...prev.preferences[type], value]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!profileData.personalInfo.name || !profileData.personalInfo.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and email address.",
        variant: "destructive"
      });
      return;
    }

    if (profileData.skills.length === 0) {
      toast({
        title: "Skills required",
        description: "Please add at least one skill.",
        variant: "destructive"
      });
      return;
    }

    onSubmit?.(profileData);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateEducation = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const updatePreferences = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-muted-foreground">Help us find the perfect internship opportunities for you</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profileData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Select onValueChange={(value) => updatePersonalInfo("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education Background</CardTitle>
            <CardDescription>Your current or most recent education details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Select onValueChange={(value) => updateEducation("degree", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's</SelectItem>
                    <SelectItem value="master">Master's</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  value={profileData.education.field}
                  onChange={(e) => updateEducation("field", e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={profileData.education.institution}
                  onChange={(e) => updateEducation("institution", e.target.value)}
                  placeholder="Your university/college name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Graduation Year</Label>
                <Select onValueChange={(value) => updateEducation("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 6 }, (_, i) => 2024 + i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add your technical and soft skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Type a skill and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(currentSkill);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addSkill(currentSkill)}
                size="icon"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Suggested Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map(skill => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {profileData.skills.length > 0 && (
              <div className="space-y-2">
                <Label>Your Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map(skill => (
                    <Badge key={skill} className="flex items-center gap-1">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer hover:bg-primary-foreground/20 rounded-full"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Interests & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Interests & Preferences</CardTitle>
            <CardDescription>Help us understand what you're looking for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Industry Sectors (Select multiple)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sectorOptions.map(sector => (
                  <div key={sector} className="flex items-center space-x-2">
                    <Checkbox
                      id={sector}
                      checked={profileData.interests.includes(sector)}
                      onCheckedChange={() => toggleInterest(sector)}
                    />
                    <Label htmlFor={sector} className="text-sm">{sector}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Preferred Locations</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {locationOptions.map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pref-${location}`}
                      checked={profileData.preferences.location.includes(location)}
                      onCheckedChange={() => togglePreference('location', location)}
                    />
                    <Label htmlFor={`pref-${location}`} className="text-sm">{location}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Preferred Duration</Label>
                <Select onValueChange={(value) => updatePreferences("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stipend">Expected Stipend</Label>
                <Select onValueChange={(value) => updatePreferences("stipend", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Unpaid/Certificate only</SelectItem>
                    <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                    <SelectItem value="20000-30000">₹20,000 - ₹30,000</SelectItem>
                    <SelectItem value="30000+">₹30,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto px-12">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Recommendations
          </Button>
        </div>
      </form>
    </div>
  );
};
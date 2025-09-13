import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProfileForm, ProfileData } from "@/components/ProfileForm";
import { RecommendationResults, Internship } from "@/components/RecommendationResults";
import { AuthForm } from "@/components/AuthForm";
import { useToast } from "@/hooks/use-toast";

type AppState = "landing" | "auth" | "profile" | "results" | "dashboard";

const Index = () => {
  const { toast } = useToast();
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  // Mock recommendations data
  const mockRecommendations: Internship[] = [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "TechVision Solutions",
      location: "Bangalore",
      duration: "6 months",
      stipend: "₹25,000/month",
      description: "Join our dynamic team as a Frontend Developer Intern and work on cutting-edge web applications using React, TypeScript, and modern development tools. You'll collaborate with senior developers to build user-friendly interfaces and gain hands-on experience in agile development methodologies.",
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science/IT",
        "Strong knowledge of HTML, CSS, JavaScript",
        "Familiarity with React.js and modern frontend frameworks",
        "Understanding of responsive web design principles",
        "Good communication skills and eagerness to learn"
      ],
      skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"],
      sector: "Technology",
      matchScore: 95,
      applicationDeadline: "Jan 30, 2024",
      startDate: "Feb 15, 2024",
      type: "hybrid",
      companySize: "50-200 employees",
      benefits: ["Mentorship Program", "Flexible Hours", "Learning Budget", "Team Events"]
    },
    {
      id: "2",
      title: "Data Analytics Intern",
      company: "DataInsights Corp",
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹20,000/month",
      description: "Dive into the world of data analytics and help transform raw data into actionable insights. Work with our data science team to analyze large datasets, create visualizations, and support business decision-making processes using Python, SQL, and modern analytics tools.",
      requirements: [
        "Background in Statistics, Mathematics, Computer Science, or related field",
        "Proficiency in Python or R for data analysis",
        "Experience with SQL databases",
        "Knowledge of data visualization tools (Tableau, Power BI, or similar)",
        "Strong analytical and problem-solving skills"
      ],
      skills: ["Python", "SQL", "Data Analysis", "Machine Learning", "Tableau"],
      sector: "Technology",
      matchScore: 88,
      applicationDeadline: "Feb 5, 2024",
      startDate: "Feb 20, 2024",
      type: "onsite",
      companySize: "200-500 employees",
      benefits: ["Industry Certification", "Data Science Bootcamp", "Networking Events"]
    },
    {
      id: "3",
      title: "Digital Marketing Intern",
      company: "Creative Marketing Hub",
      location: "Delhi",
      duration: "3 months",
      stipend: "₹15,000/month",
      description: "Get hands-on experience in digital marketing by working on real campaigns for diverse clients. Learn about SEO, social media marketing, content creation, and analytics while contributing to successful marketing strategies for growing businesses.",
      requirements: [
        "Pursuing degree in Marketing, Communications, or related field",
        "Basic understanding of digital marketing concepts",
        "Familiarity with social media platforms",
        "Good writing and communication skills",
        "Creative mindset and attention to detail"
      ],
      skills: ["Digital Marketing", "SEO", "Social Media", "Content Writing", "Analytics"],
      sector: "Marketing",
      matchScore: 82,
      applicationDeadline: "Jan 28, 2024",
      startDate: "Feb 10, 2024",
      type: "hybrid",
      companySize: "10-50 employees",
      benefits: ["Portfolio Development", "Industry Certifications", "Creative Freedom"]
    }
  ];

  const handleAuth = async (data: { email: string; name?: string; isLogin: boolean }) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAuthenticated(true);
    setIsLoading(false);
    
    toast({
      title: data.isLogin ? "Welcome back!" : "Account created successfully!",
      description: data.isLogin 
        ? "You have been signed in to your account." 
        : "Please complete your profile to get personalized recommendations.",
    });

    setCurrentState(data.isLogin ? "dashboard" : "profile");
  };

  const handleProfileSubmit = async (profileData: ProfileData) => {
    setIsLoading(true);
    
    // Simulate API call to ML service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRecommendations(mockRecommendations);
    setIsLoading(false);
    setCurrentState("results");
    
    toast({
      title: "Recommendations Generated!",
      description: `Found ${mockRecommendations.length} personalized internship recommendations for you.`,
    });
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case "home":
        setCurrentState("landing");
        break;
      case "login":
        setCurrentState("auth");
        break;
      case "signup":
        setCurrentState("auth");
        break;
      case "dashboard":
        if (isAuthenticated) {
          setCurrentState("dashboard");
        } else {
          setCurrentState("auth");
        }
        break;
      case "profile":
        if (isAuthenticated) {
          setCurrentState("profile");
        } else {
          setCurrentState("auth");
        }
        break;
      default:
        setCurrentState("landing");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentState("landing");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentState("profile");
    } else {
      setCurrentState("auth");
    }
  };

  const handleApplicationAction = (internshipId: string, action: string) => {
    const internship = recommendations.find(i => i.id === internshipId);
    if (internship) {
      toast({
        title: `${action} successful`,
        description: `Action completed for ${internship.title} at ${internship.company}`,
      });
    }
  };

  // Render current state
  const renderCurrentState = () => {
    switch (currentState) {
      case "auth":
        return <AuthForm onAuth={handleAuth} isLoading={isLoading} />;
      
      case "profile":
        return <ProfileForm onSubmit={handleProfileSubmit} isLoading={isLoading} />;
      
      case "results":
        return (
          <div>
            <Navigation 
              user={isAuthenticated ? { id: "1", name: "User", email: "user@example.com" } : null}
              onLogin={() => setCurrentState("auth")}
              onLogout={handleLogout}
            />
            <RecommendationResults 
              internships={recommendations}
              onApply={(id) => handleApplicationAction(id, "Application")}
              onSave={(id) => handleApplicationAction(id, "Save")}
              onShare={(id) => handleApplicationAction(id, "Share")}
              onBack={() => setCurrentState("profile")}
            />
          </div>
        );
      
      case "dashboard":
        import("./Dashboard").then(({ default: Dashboard }) => {
          // This would normally render the Dashboard component
          console.log("Dashboard component would render here");
        });
        setCurrentState("landing"); // Fallback for now
        return renderLandingPage();
      
      default:
        return renderLandingPage();
    }
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation 
        user={isAuthenticated ? { id: "1", name: "User", email: "user@example.com" } : null}
        onLogin={() => setCurrentState("auth")}
        onLogout={handleLogout}
      />
      
      <HeroSection 
        onGetStarted={handleGetStarted}
        onLearnMore={() => {
          const aboutSection = document.getElementById("about");
          aboutSection?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About PM Internship Scheme</h2>
            <p className="text-lg text-muted-foreground mb-8">
              The PM Internship Scheme is a government initiative designed to bridge the skill gap 
              by providing quality internship opportunities to students and recent graduates. 
              Our AI-powered platform makes it easier to find the perfect match based on your 
              skills, interests, and career goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-4">🎯 Personalized Matching</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your profile to recommend internships that align with your skills and interests.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-4">🏢 Quality Partners</h3>
                <p className="text-muted-foreground">
                  Partner with vetted companies offering meaningful internship experiences.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-4">📈 Career Growth</h3>
                <p className="text-muted-foreground">
                  Build valuable experience and expand your professional network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 InternshipAI - PM Internship Scheme. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  return renderCurrentState();
};

export default Index;

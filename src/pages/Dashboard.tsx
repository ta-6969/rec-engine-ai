import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { 
  Briefcase, 
  Heart, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  User,
  Settings,
  Bell,
  FileText,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const mockStats = {
    totalApplications: 12,
    savedInternships: 8,
    interviewsScheduled: 3,
    offersReceived: 1
  };

  const mockApplications = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      status: "interview",
      appliedDate: "2024-01-15",
      matchScore: 92
    },
    {
      id: 2,
      title: "Data Analyst Intern", 
      company: "DataViz Inc",
      status: "pending",
      appliedDate: "2024-01-12",
      matchScore: 88
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Creative Agency",
      status: "offered",
      appliedDate: "2024-01-10",
      matchScore: 85
    },
    {
      id: 4,
      title: "Backend Developer Intern",
      company: "StartupXYZ",
      status: "rejected",
      appliedDate: "2024-01-08",
      matchScore: 78
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "offered": return "bg-green-100 text-green-800 border-green-200";
      case "interview": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "offered": return <CheckCircle className="w-4 h-4" />;
      case "interview": return <Calendar className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage="dashboard" 
        isAuthenticated={true}
        onNavigate={(page) => console.log(`Navigate to ${page}`)}
        onLogout={() => console.log("Logout")}
      />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your internship applications and discover new opportunities
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalApplications}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Internships</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.savedInternships}</div>
                  <p className="text-xs text-muted-foreground">
                    Ready to apply
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.interviewsScheduled}</div>
                  <p className="text-xs text-muted-foreground">
                    Scheduled this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Offers</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.offersReceived}</div>
                  <p className="text-xs text-muted-foreground">
                    Congratulations! 🎉
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Your latest internship applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.slice(0, 3).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                          {getStatusIcon(app.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{app.title}</h4>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {app.matchScore}% match
                        </Badge>
                        <Badge variant="outline" className={`text-xs border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => setActiveTab("applications")}>
                    View All Applications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to help you find your perfect internship</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-6 flex flex-col items-center space-y-2">
                    <TrendingUp className="w-6 h-6" />
                    <span>Get New Recommendations</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
                    <User className="w-6 h-6" />
                    <span>Update Profile</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-2">
                    <Bell className="w-6 h-6" />
                    <span>Set Alerts</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Track the status of your internship applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                          {getStatusIcon(app.status)}
                        </div>
                        <div>
                          <h4 className="font-medium">{app.title}</h4>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                          <p className="text-xs text-muted-foreground">Applied on {app.appliedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs mb-1">
                            {app.matchScore}% match
                          </Badge>
                          <br />
                          <Badge variant="outline" className={`text-xs border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Internships</CardTitle>
                <CardDescription>Internships you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved internships yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start saving internships you're interested in to apply later
                  </p>
                  <Button>Browse Internships</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Edit Personal Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Resume & Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
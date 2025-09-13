import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  MapPin,
  Building2,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";
import { AdminDashboardData, UserProfile } from '@/types/api';
import { apiService } from '@/services/api';

export const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [submissions, setSubmissions] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadDashboardData();
    loadSubmissions();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const response = await apiService.getAdminDashboard();
    if (response.success && response.data) {
      setDashboardData(response.data);
    }
    setLoading(false);
  };

  const loadSubmissions = async (page: number = 1) => {
    const response = await apiService.getAllSubmissions(page, 20);
    if (response.success && response.data) {
      setSubmissions(response.data.submissions);
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
    loadSubmissions(currentPage);
  };

  const handleExport = () => {
    // Implement CSV export functionality
    console.log('Exporting data...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">PM Internship Recommendation Engine Analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="govt-accent" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Registered candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData?.totalSubmissions || 0}</div>
            <p className="text-xs text-muted-foreground">Profile submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Skills</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.popularSkills?.[0]?.skill || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Most requested skill</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData?.locationDistribution?.[0]?.location || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Most preferred location</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Skills</CardTitle>
                <CardDescription>Most requested skills by candidates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData?.popularSkills?.slice(0, 10).map((skill, index) => (
                  <div key={skill.skill} className="flex justify-between items-center">
                    <span className="text-sm">{skill.skill}</span>
                    <Badge variant="secondary">{skill.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Location Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Location Preferences</CardTitle>
                <CardDescription>Preferred locations by candidates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData?.locationDistribution?.slice(0, 10).map((location, index) => (
                  <div key={location.location} className="flex justify-between items-center">
                    <span className="text-sm">{location.location}</span>
                    <Badge variant="outline">{location.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest candidate profile submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.userId}>
                      <TableCell className="font-medium">{submission.userId}</TableCell>
                      <TableCell>{submission.education}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.skills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {submission.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{submission.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{submission.preferredLocation}</TableCell>
                      <TableCell>{new Date(submission.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sector Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Interest</CardTitle>
                <CardDescription>Interest distribution across sectors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData?.sectorDistribution?.map((sector, index) => (
                  <div key={sector.sector} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{sector.sector}</span>
                    </div>
                    <Badge className="govt-accent">{sector.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dashboardData?.recentSubmissions?.slice(0, 5).map((activity, index) => (
                  <div key={activity.id} className="flex items-center gap-3 pb-2 border-b last:border-b-0">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">
                        User {activity.userId} submitted profile
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
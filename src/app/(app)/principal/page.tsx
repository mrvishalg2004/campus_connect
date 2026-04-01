'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  AlertTriangle,
  Award,
  Building2 
} from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import StudentsList from "@/components/dashboard/StudentsList";

const kpiData = {
  totalStudents: 2450,
  totalFaculty: 145,
  overallAttendance: 87.5,
  overallPassRate: 89.2,
  facultyUtilization: 92.3,
};

const departmentRiskData = [
  { dept: 'Computer Science', attendance: 88, passRate: 92, accreditationScore: 85, risk: 'low' },
  { dept: 'Electronics', attendance: 75, passRate: 78, accreditationScore: 72, risk: 'medium' },
  { dept: 'Mechanical', attendance: 82, passRate: 85, accreditationScore: 80, risk: 'low' },
  { dept: 'Civil', attendance: 68, passRate: 72, accreditationScore: 65, risk: 'high' },
];

const attendanceTrend = [
  { month: 'Jul', attendance: 85 },
  { month: 'Aug', attendance: 86 },
  { month: 'Sep', attendance: 87 },
  { month: 'Oct', attendance: 88 },
  { month: 'Nov', attendance: 87.5 },
];

const passRateTrend = [
  { sem: 'Sem 1', rate: 85 },
  { sem: 'Sem 2', rate: 87 },
  { sem: 'Sem 3', rate: 88 },
  { sem: 'Sem 4', rate: 89.2 },
];

export default function PrincipalDashboard() {
  const atRiskDepartments = departmentRiskData.filter(d => d.risk === 'high' || d.risk === 'medium');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Executive Dashboard</h1>
        <p className="text-muted-foreground">College-level KPIs and predictive analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +5.2% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalFaculty}</div>
            <p className="text-xs text-muted-foreground">Across 8 departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.overallAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +1.5% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.overallPassRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +2.1% from last sem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Utilization</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.facultyUtilization}%</div>
            <p className="text-xs text-muted-foreground">Optimal range: 85-95%</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics - Risk Alert */}
      {atRiskDepartments.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Accreditation Risk Alert</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {atRiskDepartments.map((dept, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{dept.dept}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={dept.risk === 'high' ? 'destructive' : 'secondary'}>
                      Score: {dept.accreditationScore}% | {dept.risk} risk
                    </Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/principal/kpi">View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly college-wide attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 90]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pass Rate Trend</CardTitle>
            <CardDescription>Semester-wise pass rate progression</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={passRateTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sem" />
                  <YAxis domain={[80, 95]} />
                  <Tooltip />
                  <Bar dataKey="rate" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Notices & Events</CardTitle>
            <CardDescription>Manage college communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" asChild>
              <Link href="/principal/notices">Create Notice</Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/principal/events">Schedule Event</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Records & Reports</CardTitle>
            <CardDescription>Access student and faculty data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" asChild>
              <Link href="/principal/records">View Records</Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/principal/accreditation">Accreditation Reports</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grievances & Finance</CardTitle>
            <CardDescription>Handle submissions and budgets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" asChild>
              <Link href="/principal/grievances">View Grievances</Link>
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/principal/finance">Financial Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Students List Section */}
      <StudentsList />
    </div>
  );
}

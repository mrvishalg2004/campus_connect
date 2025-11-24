'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiPage() {
  const departmentData = [
    { name: 'Computer Science', passRate: 92, attendance: 89, placement: 85, research: 78 },
    { name: 'Mechanical', passRate: 88, attendance: 86, placement: 82, research: 72 },
    { name: 'Civil', passRate: 85, attendance: 83, placement: 75, research: 65 },
    { name: 'Electronics', passRate: 90, attendance: 87, placement: 84, research: 76 },
    { name: 'IT', passRate: 91, attendance: 88, placement: 86, research: 80 },
  ];

  const trendData = [
    { month: 'Aug', attendance: 85, passRate: 87, placement: 80 },
    { month: 'Sep', attendance: 86, passRate: 88, placement: 82 },
    { month: 'Oct', attendance: 87, passRate: 89, placement: 84 },
    { month: 'Nov', attendance: 87.5, passRate: 89.2, placement: 85 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Key Performance Indicators</h1>
        <p className="text-muted-foreground">Detailed metrics and analytics for all departments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">+1.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+3% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Output</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">-8 papers from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">Department Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Performance</CardTitle>
              <CardDescription>Compare metrics across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="passRate" fill="#8884d8" name="Pass Rate %" />
                  <Bar dataKey="attendance" fill="#82ca9d" name="Attendance %" />
                  <Bar dataKey="placement" fill="#ffc658" name="Placement %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {departmentData.map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{dept.name}</CardTitle>
                    <Badge variant={dept.passRate >= 90 ? "default" : dept.passRate >= 85 ? "secondary" : "destructive"}>
                      {dept.passRate >= 90 ? "Excellent" : dept.passRate >= 85 ? "Good" : "Needs Attention"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Pass Rate</span>
                      <span className="font-medium">{dept.passRate}%</span>
                    </div>
                    <Progress value={dept.passRate} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Attendance</span>
                      <span className="font-medium">{dept.attendance}%</span>
                    </div>
                    <Progress value={dept.attendance} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Placement</span>
                      <span className="font-medium">{dept.placement}%</span>
                    </div>
                    <Progress value={dept.placement} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Research Output</span>
                      <span className="font-medium">{dept.research}%</span>
                    </div>
                    <Progress value={dept.research} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track key metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#8884d8" name="Attendance %" strokeWidth={2} />
                  <Line type="monotone" dataKey="passRate" stroke="#82ca9d" name="Pass Rate %" strokeWidth={2} />
                  <Line type="monotone" dataKey="placement" stroke="#ffc658" name="Placement %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faculty Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.3%</div>
                <Progress value={92.3} className="mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Teaching Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5 hrs/wk</div>
                <p className="text-xs text-muted-foreground mt-2">Within optimal range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Research Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground mt-2">98 of 145 faculty</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

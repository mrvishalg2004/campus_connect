
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Check, X, Download, AlertTriangle, TrendingDown, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import StudentsList from "@/components/dashboard/StudentsList";

const attendanceData = [
  { name: 'Physics', value: 92 },
  { name: 'Chemistry', value: 88 },
  { name: 'Maths', value: 95 },
  { name: 'CS', value: 91 },
  { name: 'Biology', value: 68 }, // Low attendance - risk
];

const passFailData = [
  { name: 'Sem 1', pass: 85, fail: 15 },
  { name: 'Sem 2', pass: 88, fail: 12 },
  { name: 'Sem 3', pass: 90, fail: 10 },
  { name: 'Sem 4', pass: 92, fail: 8 },
];

const workloadData = [
    ['Mon', 'Dr. Reed', 4],
    ['Mon', 'Prof. Smith', 3],
    ['Tue', 'Dr. Reed', 2],
    ['Tue', 'Prof. Jones', 5],
    ['Wed', 'Prof. Smith', 4],
    ['Thu', 'Dr. Reed', 3],
    ['Thu', 'Prof. Jones', 4],
    ['Fri', 'Prof. Smith', 2],
].map(p => ({ day: p[0], faculty: p[1], hours: p[2] as number }));

const riskCourses = [
  { course: 'Biology (Sem 3)', type: 'Low Attendance', value: '68%', severity: 'high' },
  { course: 'Chemistry (Sem 2)', type: 'High Failure Rate', value: '28%', severity: 'medium' },
];

const leaveRequests = [
  { id: 1, faculty: 'Dr. Evelyn Reed', from: '2024-08-10', to: '2024-08-12', reason: 'Personal', status: 'Pending' },
  { id: 2, faculty: 'Prof. John Smith', from: '2024-08-15', to: '2024-08-15', reason: 'Medical', status: 'Pending' },
  { id: 3, faculty: 'Prof. Alan Jones', from: '2024-07-20', to: '2024-07-21', reason: 'Conference', status: 'Approved' },
];

export default function HodDashboard() {
  return (
    <>
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Across 4 semesters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.8%</div>
            <p className="text-xs text-muted-foreground">-2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskCourses.length}</div>
            <p className="text-xs text-muted-foreground">Courses need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {riskCourses.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Risk Alerts for Courses</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              {riskCourses.map((risk, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{risk.course}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'}>
                      {risk.type}: {risk.value}
                    </Badge>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/hod/analytics">View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 auto-rows-max">
            {/* Analytics Charts */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Avg. Department Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <ChartContainer config={{}} className="h-full w-full">
                            <BarChart data={attendanceData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pass/Fail Ratio</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <ChartContainer config={{}} className="h-full w-full">
                           <LineChart data={passFailData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="pass" stroke="hsl(var(--primary))" />
                                <Line type="monotone" dataKey="fail" stroke="hsl(var(--destructive))" />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Faculty Workload */}
            <Card>
                <CardHeader>
                    <CardTitle>Faculty Workload Heatmap</CardTitle>
                    <CardDescription>Weekly teaching hours distribution.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-6 gap-1 text-center text-xs">
                        <div></div>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => <div key={day} className="font-semibold">{day}</div>)}
                        {['Dr. Reed', 'Prof. Smith', 'Prof. Jones'].map(faculty => (
                            <>
                                <div key={faculty} className="text-right pr-2 font-semibold">{faculty}</div>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => {
                                    const item = workloadData.find(w => w.day === day && w.faculty === faculty);
                                    const hours = item ? item.hours : 0;
                                    const opacity = hours > 0 ? Math.min(hours / 5, 1) : 0;
                                    return (
                                        <div key={`${faculty}-${day}`} className="h-10 w-full rounded-md" style={{ backgroundColor: `hsla(var(--primary), ${opacity})` }} title={`${faculty}, ${day}: ${hours} hours`}></div>
                                    )
                                })}
                            </>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Leave Approvals */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Leave Approvals</CardTitle>
                        <CardDescription>Pending faculty leave requests.</CardDescription>
                    </div>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaveRequests.filter(r => r.status === 'Pending').map(request => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        <div className="font-medium">{request.faculty}</div>
                                        <div className="text-xs text-muted-foreground">{request.from} to {request.to}</div>
                                    </TableCell>
                                    <TableCell><Badge variant="destructive">{request.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Check className="h-4 w-4 text-green-500" /></Button>
                                        <Button variant="ghost" size="icon"><X className="h-4 w-4 text-red-500" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/hod/faculty">View All Approvals</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
    </div>

    {/* Students List Section */}
    <div className="mt-8">
      <StudentsList />
    </div>
    </>
  );
}


'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Calendar, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import StudentsList from "@/components/dashboard/StudentsList";

const timetable = [
  { time: '09:00 - 10:00', subject: 'Quantum Physics', class: 'BSc Physics - Sem 3', type: 'Lecture' },
  { time: '10:00 - 11:00', subject: 'Data Structures', class: 'BSc CS - Sem 3', type: 'Lab' },
  { time: '11:00 - 12:00', subject: 'Free', class: '', type: '' },
  { time: '12:00 - 13:00', subject: 'Advanced Algorithms', class: 'MSc CS - Sem 1', type: 'Lecture' },
];

const pendingAssignments = [
    { id: 1, title: 'Quantum Mechanics: Problem Set 2', class: 'BSc Physics - Sem 3', submitted: 28, total: 30, dueDate: '2 days ago' },
    { id: 2, title: 'DSA Assignment 3: Trees', class: 'BSc CS - Sem 3', submitted: 35, total: 35, dueDate: 'in 3 days' },
    { id: 3, title: 'Algorithm Design Paper', class: 'MSc CS - Sem 1', submitted: 12, total: 15, dueDate: 'in 5 days' },
];

export default function TeacherDashboard() {
  return (
    <>
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 auto-rows-max">
            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Avg. Class Attendance</CardDescription>
                        <CardTitle className="text-4xl">92.5%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">+1.5% from last week</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Avg. Doubt Response Time</CardDescription>
                        <CardTitle className="text-4xl">3.2 hrs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">-0.5hr from last week</div>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Assignments */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Assignment Reviews</CardTitle>
                    <CardDescription>Assignments that need your attention.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead className="text-center">Submissions</TableHead>
                                <TableHead className="text-right">Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingAssignments.map(assignment => (
                                <TableRow key={assignment.id}>
                                    <TableCell className="font-medium">{assignment.title}</TableCell>
                                    <TableCell>{assignment.class}</TableCell>
                                    <TableCell className="text-center">{assignment.submitted}/{assignment.total}</TableCell>
                                    <TableCell className="text-right">{assignment.dueDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button size="sm" variant="outline" className="ml-auto">
                        View All <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Timetable */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Today's Timetable</CardTitle>
                    <CardDescription>{new Date().toDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {timetable.map((slot, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground w-24">{slot.time}</div>
                            <div className="flex-1">
                                {slot.subject !== 'Free' ? (
                                    <>
                                        <p className="font-semibold">{slot.subject}</p>
                                        <p className="text-xs text-muted-foreground">{slot.class}</p>
                                    </>
                                ) : (
                                    <p className="text-muted-foreground italic">Free Slot</p>
                                )}
                            </div>
                            {slot.type && <Badge variant={slot.type === 'Lab' ? 'destructive' : 'secondary'}>{slot.type}</Badge>}
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/teacher/timetable">View Full Timetable</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>

    {/* Students List Section */}
    <div className="mt-8">
      <StudentsList />
    </div>
    </>
  );
}

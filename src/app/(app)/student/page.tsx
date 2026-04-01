
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowUpRight, BookOpen, MessageSquare, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import MarksChart from '@/components/dashboard/MarksChart';
import AiChatbot from '@/components/dashboard/AiChatbot';
import { mockStudentDashboard } from '@/lib/mock-data';

export default function StudentDashboard() {
  const { attendance, marks } = mockStudentDashboard;
  
  const averageAttendance = attendance.reduce((acc, month) => acc + month.value, 0) / attendance.length;
  
  const lastMark = marks[marks.length - 1];
  const overallPercentage = (marks.reduce((acc, mark) => acc + (mark.score/mark.total), 0) / marks.length) * 100;

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 xl:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg. Attendance</CardDescription>
              <CardTitle className="text-4xl">{averageAttendance.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +2% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Overall Marks</CardDescription>
              <CardTitle className="text-4xl">{overallPercentage.toFixed(1)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Last assessment: {lastMark.score}/{lastMark.total} on {lastMark.assessment}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Assignments Due</CardDescription>
              <CardTitle className="text-4xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                1 overdue
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unread Notices</CardDescription>
              <CardTitle className="text-4xl">5</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +1 from yesterday
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Attendance Trend</CardTitle>
                    <CardDescription>Your attendance over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AttendanceChart data={attendance} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Marks Distribution</CardTitle>
                    <CardDescription>Your performance across recent assessments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MarksChart data={marks} />
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4">
             <AiChatbot />
        </div>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Your most-used links, just a click away.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Link href="/student/chat/general">
                    <Button variant="outline" className="w-full justify-between">
                        Ask a Doubt <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Link>
                <Link href="/student/library">
                    <Button variant="outline" className="w-full justify-between">
                        Digital Library <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Link>
                <Link href="#">
                    <Button variant="outline" className="w-full justify-between">
                        View Assignments <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

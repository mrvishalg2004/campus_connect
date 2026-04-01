'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Users, Award, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProjectsPage() {
  const [showAllocationDialog, setShowAllocationDialog] = useState(false);
  const { toast } = useToast();

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Campus Assistant',
      students: ['Alice Johnson', 'Bob Smith'],
      guide: 'Dr. Reed',
      status: 'ongoing',
      progress: 65,
      milestones: { completed: 3, total: 5 },
    },
    {
      id: 2,
      title: 'Blockchain Voting System',
      students: ['Charlie Brown', 'Diana Prince'],
      guide: 'Prof. Wilson',
      status: 'ongoing',
      progress: 45,
      milestones: { completed: 2, total: 5 },
    },
  ];

  const seminars = [
    { id: 1, title: 'Machine Learning Trends 2024', date: '2024-12-15', speaker: 'Dr. Smith', attendees: 45 },
    { id: 2, title: 'Cloud Architecture Best Practices', date: '2024-12-20', speaker: 'Prof. Johnson', attendees: 38 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project & Seminar Oversight</h1>
          <p className="text-muted-foreground">Manage project allocations and seminar scheduling</p>
        </div>
        <Button onClick={() => setShowAllocationDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Allocate Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Seminars</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.5%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="seminars">Seminars</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Allocations</CardTitle>
              <CardDescription>Track project progress and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Guide</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Milestones</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <div className="text-sm">{project.students.join(', ')}</div>
                      </TableCell>
                      <TableCell>{project.guide}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={project.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {project.milestones.completed}/{project.milestones.total}
                      </TableCell>
                      <TableCell>
                        <Badge>{project.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seminars" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Seminars</CardTitle>
              <CardDescription>Upcoming department seminars and presentations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Speaker</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seminars.map((seminar) => (
                    <TableRow key={seminar.id}>
                      <TableCell className="font-medium">{seminar.title}</TableCell>
                      <TableCell>{seminar.date}</TableCell>
                      <TableCell>{seminar.speaker}</TableCell>
                      <TableCell>{seminar.attendees}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAllocationDialog} onOpenChange={setShowAllocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input placeholder="Project Title" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Guide" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. Reed</SelectItem>
                <SelectItem value="2">Prof. Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllocationDialog(false)}>Cancel</Button>
            <Button onClick={() => { 
              toast({ title: "Project allocated successfully" });
              setShowAllocationDialog(false);
            }}>Allocate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

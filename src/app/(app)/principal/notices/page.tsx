'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Send, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NoticesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const { toast } = useToast();

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'IT', 'Chemical'];
  const years = [1, 2, 3, 4];
  const roles = ['student', 'teacher', 'hod'];

  const notices = [
    {
      id: 1,
      title: 'Mid-Semester Examination Schedule',
      category: 'examination',
      priority: 'high',
      targetAudience: 'All Students',
      createdAt: '2024-11-20',
      status: 'active',
    },
    {
      id: 2,
      title: 'Faculty Development Workshop',
      category: 'academic',
      priority: 'medium',
      targetAudience: 'All Faculty',
      createdAt: '2024-11-18',
      status: 'active',
    },
  ];

  const handleCreate = () => {
    if (!title || !content || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notice Created Successfully",
      description: "The notice has been published to target audience",
    });
    setShowCreateDialog(false);
    setTitle('');
    setContent('');
    setCategory('');
    setSelectedDepts([]);
    setSelectedYears([]);
    setSelectedRoles([]);
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      urgent: 'destructive',
      high: 'destructive',
      medium: 'secondary',
      low: 'outline',
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notice Management</h1>
          <p className="text-muted-foreground">Create and manage college-wide circulars</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Notice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Published Notices</CardTitle>
          <CardDescription>Manage all college communications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Target Audience</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{notice.category}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(notice.priority)}</TableCell>
                  <TableCell>{notice.targetAudience}</TableCell>
                  <TableCell>{notice.createdAt}</TableCell>
                  <TableCell>
                    <Badge>{notice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Notice Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Notice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="examination">Examination</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content *</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter notice content..."
                rows={6}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">Target Audience</h4>

              <div className="space-y-2">
                <label className="text-sm font-medium">Departments</label>
                <div className="grid grid-cols-3 gap-2">
                  {departments.map((dept) => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={dept}
                        checked={selectedDepts.includes(dept)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDepts([...selectedDepts, dept]);
                          } else {
                            setSelectedDepts(selectedDepts.filter(d => d !== dept));
                          }
                        }}
                      />
                      <label htmlFor={dept} className="text-sm">{dept}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <div className="flex gap-4">
                  {years.map((year) => (
                    <div key={year} className="flex items-center space-x-2">
                      <Checkbox
                        id={`year-${year}`}
                        checked={selectedYears.includes(year)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedYears([...selectedYears, year]);
                          } else {
                            setSelectedYears(selectedYears.filter(y => y !== year));
                          }
                        }}
                      />
                      <label htmlFor={`year-${year}`} className="text-sm">Year {year}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Roles</label>
                <div className="flex gap-4">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={selectedRoles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRoles([...selectedRoles, role]);
                          } else {
                            setSelectedRoles(selectedRoles.filter(r => r !== role));
                          }
                        }}
                      />
                      <label htmlFor={`role-${role}`} className="text-sm capitalize">{role}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              <Send className="mr-2 h-4 w-4" />
              Publish Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

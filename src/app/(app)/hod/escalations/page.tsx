'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Flag, MessageSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EscalationsPage() {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedEscalation, setSelectedEscalation] = useState<any>(null);
  const { toast } = useToast();

  const escalations = [
    {
      id: 1,
      title: 'Inappropriate Chat Content',
      category: 'chat-abuse',
      priority: 'high',
      reportedBy: 'Student A',
      status: 'open',
      createdAt: '2024-11-20',
    },
    {
      id: 2,
      title: 'Grade Dispute - CS301',
      category: 'academic',
      priority: 'medium',
      reportedBy: 'Student B',
      status: 'assigned',
      assignedTo: 'Dr. Smith',
      createdAt: '2024-11-18',
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'secondary',
      low: 'outline',
    };
    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Escalation Center</h1>
        <p className="text-muted-foreground">Manage flagged issues and student concerns</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Escalations</CardTitle>
            <Flag className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escalations.filter(e => e.status === 'open').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escalations.filter(e => e.status === 'assigned').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved This Week</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 days</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Escalations</CardTitle>
          <CardDescription>Track and assign escalation tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalations.map((esc) => (
                <TableRow key={esc.id}>
                  <TableCell className="font-medium">{esc.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{esc.category}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(esc.priority)}</TableCell>
                  <TableCell>{esc.reportedBy}</TableCell>
                  <TableCell>{esc.assignedTo || 'Unassigned'}</TableCell>
                  <TableCell>
                    <Badge variant={esc.status === 'open' ? 'destructive' : 'secondary'}>
                      {esc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedEscalation(esc);
                        setShowAssignDialog(true);
                      }}
                    >
                      {esc.status === 'open' ? 'Assign' : 'View'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Escalation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-medium mb-2">Issue Details</h4>
              <p className="text-sm text-muted-foreground">{selectedEscalation?.title}</p>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Assign to Faculty/Admin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. Smith</SelectItem>
                <SelectItem value="2">Prof. Johnson</SelectItem>
                <SelectItem value="3">Admin Staff</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Add notes..." />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              toast({ title: "Escalation assigned successfully" });
              setShowAssignDialog(false);
            }}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

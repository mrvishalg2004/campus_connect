'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Check, X, Calendar as CalendarIcon, User, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface LeaveRequest {
  _id: string;
  facultyId: { name: string; email: string };
  startDate: string;
  endDate: string;
  reason: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  substituteTeacherId?: { name: string };
}

interface Faculty {
  _id: string;
  name: string;
  email: string;
  expertiseTags?: string[];
}

export default function FacultyManagementPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [availableFaculty, setAvailableFaculty] = useState<Faculty[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [substituteTeacher, setSubstituteTeacher] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeaveRequests();
    fetchAvailableFaculty();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      // Mock data for now
      setLeaveRequests([
        {
          _id: '1',
          facultyId: { name: 'Dr. Evelyn Reed', email: 'reed@university.edu' },
          startDate: '2024-12-10',
          endDate: '2024-12-12',
          reason: 'Personal emergency - family medical issue',
          type: 'personal',
          status: 'pending',
        },
        {
          _id: '2',
          facultyId: { name: 'Prof. John Smith', email: 'smith@university.edu' },
          startDate: '2024-12-15',
          endDate: '2024-12-15',
          reason: 'Medical appointment',
          type: 'sick',
          status: 'pending',
        },
        {
          _id: '3',
          facultyId: { name: 'Prof. Alan Jones', email: 'jones@university.edu' },
          startDate: '2024-11-20',
          endDate: '2024-11-21',
          reason: 'International conference on AI',
          type: 'conference',
          status: 'approved',
          substituteTeacherId: { name: 'Dr. Sarah Lee' },
        },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leave requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableFaculty = async () => {
    // Mock data
    setAvailableFaculty([
      { _id: '1', name: 'Dr. Sarah Lee', email: 'lee@university.edu', expertiseTags: ['AI', 'Machine Learning'] },
      { _id: '2', name: 'Prof. Mike Brown', email: 'brown@university.edu', expertiseTags: ['Databases', 'Web Dev'] },
      { _id: '3', name: 'Dr. Lisa White', email: 'white@university.edu', expertiseTags: ['Networks', 'Security'] },
    ]);
  };

  const handleApprove = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setShowApprovalDialog(true);
  };

  const handleReject = async (requestId: string) => {
    try {
      // API call would go here
      toast({
        title: "Leave Request Rejected",
        description: "The faculty member will be notified.",
      });
      fetchLeaveRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject leave request",
        variant: "destructive",
      });
    }
  };

  const handleSubmitApproval = async () => {
    try {
      if (!substituteTeacher) {
        toast({
          title: "Missing Information",
          description: "Please assign a substitute teacher",
          variant: "destructive",
        });
        return;
      }

      // API call would go here
      toast({
        title: "Leave Request Approved",
        description: "Substitute teacher has been assigned and notified.",
      });
      setShowApprovalDialog(false);
      setSubstituteTeacher('');
      setComments('');
      fetchLeaveRequests();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve leave request",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge>Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      sick: 'bg-red-100 text-red-800',
      personal: 'bg-blue-100 text-blue-800',
      conference: 'bg-green-100 text-green-800',
      emergency: 'bg-orange-100 text-orange-800',
    };
    return <Badge className={colors[type] || ''}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Faculty Management</h1>
          <p className="text-muted-foreground">Manage leave requests and staffing</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showCalendarView ? "default" : "outline"}
            onClick={() => setShowCalendarView(!showCalendarView)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Require your approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Faculty members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Substitutes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableFaculty.length}</div>
            <p className="text-xs text-muted-foreground">Faculty available</p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Review and approve faculty leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Substitute</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>
                      <div className="font-medium">{request.facultyId.name}</div>
                      <div className="text-xs text-muted-foreground">{request.facultyId.email}</div>
                    </TableCell>
                    <TableCell>{getTypeBadge(request.type)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(new Date(request.startDate), 'MMM dd')} - {format(new Date(request.endDate), 'MMM dd')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(request.endDate).getTime() - new Date(request.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate text-sm">{request.reason}</div>
                    </TableCell>
                    <TableCell>
                      {request.substituteTeacherId ? (
                        <div className="text-sm">{request.substituteTeacherId.name}</div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      {request.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(request)}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReject(request._id)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approve Leave Request</DialogTitle>
            <DialogDescription>
              Assign a substitute teacher for {selectedRequest?.facultyId.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-medium mb-2">Leave Details</h4>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>Duration: {selectedRequest && format(new Date(selectedRequest.startDate), 'PPP')} - {selectedRequest && format(new Date(selectedRequest.endDate), 'PPP')}</p>
                <p>Reason: {selectedRequest?.reason}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Substitute Teacher *</label>
              <Select value={substituteTeacher} onValueChange={setSubstituteTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Select available faculty" />
                </SelectTrigger>
                <SelectContent>
                  {availableFaculty.map((faculty) => (
                    <SelectItem key={faculty._id} value={faculty._id}>
                      <div>
                        <div>{faculty.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {faculty.expertiseTags?.join(', ')}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                System will auto-assign based on expertise tags and availability
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Comments (Optional)</label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApproval}>
              Approve & Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

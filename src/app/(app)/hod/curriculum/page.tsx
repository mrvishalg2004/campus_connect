'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, History, FileText, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SyllabusUpdate {
  _id: string;
  courseCode: string;
  courseName: string;
  documentType: string;
  currentVersion: string;
  submittedBy: { name: string };
  status: 'pending' | 'approved' | 'rejected' | 'revision-requested';
  effectiveDate?: string;
  changeLogs: Array<{ version: string; changes: string; effectiveDate: string }>;
}

export default function CurriculumPage() {
  const [syllabusUpdates, setSyllabusUpdates] = useState<SyllabusUpdate[]>([
    {
      _id: '1',
      courseCode: 'CS301',
      courseName: 'Data Structures',
      documentType: 'syllabus',
      currentVersion: '2.1',
      submittedBy: { name: 'Dr. Smith' },
      status: 'pending',
      changeLogs: [
        { version: '2.0', changes: 'Added Graph Algorithms module', effectiveDate: '2024-01-15' },
        { version: '1.0', changes: 'Initial syllabus', effectiveDate: '2023-08-01' },
      ],
    },
    {
      _id: '2',
      courseCode: 'CS401',
      courseName: 'Machine Learning Lab',
      documentType: 'lab-manual',
      currentVersion: '1.2',
      submittedBy: { name: 'Prof. Johnson' },
      status: 'approved',
      effectiveDate: '2024-12-01',
      changeLogs: [
        { version: '1.1', changes: 'Updated TensorFlow exercises', effectiveDate: '2024-06-01' },
      ],
    },
  ]);
  const [selectedUpdate, setSelectedUpdate] = useState<SyllabusUpdate | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const { toast } = useToast();

  const handleApprove = async () => {
    toast({
      title: "Document Approved",
      description: "The document has been approved and will be effective from the specified date.",
    });
    setShowReviewDialog(false);
  };

  const handleReject = async () => {
    toast({
      title: "Document Rejected",
      description: "The submitter has been notified.",
      variant: "destructive",
    });
    setShowReviewDialog(false);
  };

  const handleRequestRevision = async () => {
    toast({
      title: "Revision Requested",
      description: "The submitter has been asked to revise the document.",
    });
    setShowReviewDialog(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'approved':
        return <Badge>Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'revision-requested':
        return <Badge variant="outline">Revision Requested</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      syllabus: 'bg-blue-100 text-blue-800',
      'lab-manual': 'bg-green-100 text-green-800',
      'reference-material': 'bg-purple-100 text-purple-800',
    };
    return <Badge className={colors[type] || ''}>{type.replace('-', ' ')}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Curriculum & Resources</h1>
        <p className="text-muted-foreground">Review and approve syllabus updates and course materials</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {syllabusUpdates.filter(s => s.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Reviews</CardTitle>
          <CardDescription>Review and approve curriculum updates with version control</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syllabusUpdates.filter(s => s.status === 'pending').map((update) => (
                    <TableRow key={update._id}>
                      <TableCell>
                        <div className="font-medium">{update.courseCode}</div>
                        <div className="text-xs text-muted-foreground">{update.courseName}</div>
                      </TableCell>
                      <TableCell>{getDocTypeBadge(update.documentType)}</TableCell>
                      <TableCell>v{update.currentVersion}</TableCell>
                      <TableCell>{update.submittedBy.name}</TableCell>
                      <TableCell>{getStatusBadge(update.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUpdate(update);
                              setShowReviewDialog(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUpdate(update);
                              setShowHistoryDialog(true);
                            }}
                          >
                            <History className="h-4 w-4 mr-1" />
                            History
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="approved" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syllabusUpdates.filter(s => s.status === 'approved').map((update) => (
                    <TableRow key={update._id}>
                      <TableCell>
                        <div className="font-medium">{update.courseCode}</div>
                        <div className="text-xs text-muted-foreground">{update.courseName}</div>
                      </TableCell>
                      <TableCell>{getDocTypeBadge(update.documentType)}</TableCell>
                      <TableCell>v{update.currentVersion}</TableCell>
                      <TableCell>{update.effectiveDate}</TableCell>
                      <TableCell>{getStatusBadge(update.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUpdate(update);
                            setShowHistoryDialog(true);
                          }}
                        >
                          <History className="h-4 w-4 mr-1" />
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syllabusUpdates.map((update) => (
                    <TableRow key={update._id}>
                      <TableCell>
                        <div className="font-medium">{update.courseCode}</div>
                        <div className="text-xs text-muted-foreground">{update.courseName}</div>
                      </TableCell>
                      <TableCell>{getDocTypeBadge(update.documentType)}</TableCell>
                      <TableCell>v{update.currentVersion}</TableCell>
                      <TableCell>{getStatusBadge(update.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUpdate(update);
                            setShowHistoryDialog(true);
                          }}
                        >
                          <History className="h-4 w-4 mr-1" />
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Document</DialogTitle>
            <DialogDescription>
              {selectedUpdate?.courseCode} - {selectedUpdate?.courseName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-medium mb-2">Document Details</h4>
              <div className="text-sm space-y-1">
                <p>Type: {selectedUpdate?.documentType}</p>
                <p>Version: {selectedUpdate?.currentVersion}</p>
                <p>Submitted by: {selectedUpdate?.submittedBy.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Review Comments</label>
              <Textarea
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                placeholder="Add your review comments..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleRequestRevision}>
              Request Revision
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button onClick={handleApprove}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change History</DialogTitle>
            <DialogDescription>
              Version history for {selectedUpdate?.courseCode}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedUpdate?.changeLogs.map((log, index) => (
              <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">v{log.version}</Badge>
                  <span className="text-xs text-muted-foreground">{log.effectiveDate}</span>
                </div>
                <p className="text-sm">{log.changes}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import * as React from 'react';
import { Search, Printer, Download, Calendar as CalendarIcon, Filter, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { staff } from '@/lib/mock-data';

export default function StaffStatementPage() {
  const [selectedStaff, setSelectedStaff] = React.useState<string>(staff[0]?.id || '');

  const person = staff.find(s => s.id === selectedStaff);
  
  // Mock salary data
  const salaryEntries = [
    { date: '2024-01-05', type: 'Salary Payment', month: 'December 2023', amount: 25000, status: 'PAID' },
    { date: '2024-02-05', type: 'Salary Payment', month: 'January 2024', amount: 25000, status: 'PAID' },
    { date: '2024-02-15', type: 'Advance', month: 'February 2024', amount: 5000, status: 'PAID' },
    { date: '2024-03-05', type: 'Salary Payment', month: 'February 2024', amount: 20000, status: 'PAID' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Statement</h1>
          <p className="text-muted-foreground">View salary history, advances, and payment records.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Print Statement
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-full md:w-72">
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Staff Member" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" /> This Year
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {person ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Monthly Salary</p>
                  <p className="text-xl font-bold">৳ {person.salary.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Paid (YTD)</p>
                  <p className="text-xl font-bold text-emerald-600">৳ 75,000</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Pending Advance</p>
                  <p className="text-xl font-bold text-destructive">৳ 0</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-xs text-primary uppercase tracking-wider font-bold">Joined Date</p>
                  <p className="text-xl font-bold text-primary">{person.joiningDate}</p>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description / Month</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryEntries.map((entry, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs">{entry.date}</TableCell>
                        <TableCell className="text-sm font-medium">{entry.type}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{entry.month}</TableCell>
                        <TableCell className="text-right font-bold">৳ {entry.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                            {entry.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              Select a staff member to view statement
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

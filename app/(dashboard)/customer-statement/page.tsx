'use client';

import * as React from 'react';
import { Search, Printer, Download, Calendar as CalendarIcon, Filter } from 'lucide-react';
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
import { customers, invoices, transactions } from '@/lib/mock-data';

export default function CustomerStatementPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>(customers[0]?.id || '');

  const customer = customers.find(c => c.id === selectedCustomer);
  
  // Mock ledger data
  const ledgerEntries = [
    { date: '2024-01-01', type: 'Opening Balance', ref: '-', debit: 0, credit: 0, balance: 0 },
    { date: '2024-03-20', type: 'Invoice', ref: 'INV-2024-001', debit: 44500, credit: 0, balance: 44500 },
    { date: '2024-03-20', type: 'Payment', ref: 'Cash', debit: 0, credit: 30000, balance: 14500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Statement</h1>
          <p className="text-muted-foreground">View detailed ledger and payment history for customers.</p>
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
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" /> Date Range
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {customer ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Sales</p>
                  <p className="text-xl font-bold">৳ 44,500</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Paid</p>
                  <p className="text-xl font-bold text-emerald-600">৳ 30,000</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Current Due</p>
                  <p className="text-xl font-bold text-destructive">৳ 14,500</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-xs text-primary uppercase tracking-wider font-bold">Credit Limit</p>
                  <p className="text-xl font-bold text-primary">৳ {customer.creditLimit.toLocaleString()}</p>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Debit (Sale)</TableHead>
                      <TableHead className="text-right">Credit (Paid)</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ledgerEntries.map((entry, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs">{entry.date}</TableCell>
                        <TableCell className="text-sm font-medium">{entry.type}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{entry.ref}</TableCell>
                        <TableCell className="text-right">{entry.debit > 0 ? `৳ ${entry.debit.toLocaleString()}` : '-'}</TableCell>
                        <TableCell className="text-right">{entry.credit > 0 ? `৳ ${entry.credit.toLocaleString()}` : '-'}</TableCell>
                        <TableCell className="text-right font-bold">৳ {entry.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              Select a customer to view statement
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

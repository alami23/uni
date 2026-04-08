'use client';

import * as React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Receipt, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { bills } from '@/lib/mock-data';

export default function BillsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredBills = bills.filter(b => 
    b.payee.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.billNumber.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bills & Expenses</h1>
          <p className="text-muted-foreground">Track your business utility bills and other expenses.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Bill
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Bills (This Month)</CardDescription>
            <CardTitle className="text-2xl">৳ {bills.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid Amount</CardDescription>
            <CardTitle className="text-2xl text-emerald-600">৳ {bills.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Due Amount</CardDescription>
            <CardTitle className="text-2xl text-destructive">৳ {bills.reduce((sum, b) => sum + b.dueAmount, 0).toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by payee or bill #..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill # / Date</TableHead>
                  <TableHead>Payee / Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{bill.billNumber}</span>
                        <span className="text-xs text-muted-foreground">{bill.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{bill.payee}</span>
                        <span className="text-xs text-muted-foreground">{bill.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>৳ {bill.amount.toLocaleString()}</TableCell>
                    <TableCell>৳ {bill.paidAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={bill.status === 'PAID' ? 'default' : bill.status === 'PARTIAL' ? 'outline' : 'destructive'}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Receipt className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

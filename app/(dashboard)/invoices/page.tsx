'use client';

import * as React from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, FileText, Printer, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { invoices } from '@/lib/mock-data';
import Link from 'next/link';

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inv.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage and track all customer sales invoices.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pos-furniture">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Furniture Sale
            </Button>
          </Link>
          <Link href="/pos-wood">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Wood Sale
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice # or customer..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice # / Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{inv.invoiceNumber}</span>
                        <span className="text-xs text-muted-foreground">{inv.date}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{inv.customerName}</TableCell>
                    <TableCell>৳ {inv.grandTotal.toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-600">৳ {inv.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive font-medium">৳ {inv.dueAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === 'PAID' ? 'default' : inv.status === 'PARTIAL' ? 'outline' : 'destructive'}>
                        {inv.status}
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
                            <Eye className="h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Printer className="h-4 w-4" /> Print
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

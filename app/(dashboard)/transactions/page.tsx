'use client';

import * as React from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { transactions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const filteredTransactions = transactions.filter(t => 
    t.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View all income and expense history.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-xs">{t.date}</TableCell>
                    <TableCell>
                      <Badge variant={t.type === 'INCOME' ? 'default' : 'destructive'} className="text-[10px] h-5">
                        {t.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{t.referenceType}</span>
                        <span className="text-[10px] text-muted-foreground">{t.referenceNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{t.category}</TableCell>
                    <TableCell className="text-sm">{t.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        "font-bold",
                        t.type === 'INCOME' ? "text-emerald-600" : "text-destructive"
                      )}>
                        {t.type === 'INCOME' ? '+' : '-'} ৳ {t.amount.toLocaleString()}
                      </span>
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

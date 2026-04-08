'use client';

import * as React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Calendar as CalendarIcon,
  PieChart as PieChartIcon,
  FileText,
  Package,
  Users,
  Receipt
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Sat', sales: 4000, expense: 2400 },
  { name: 'Sun', sales: 3000, expense: 1398 },
  { name: 'Mon', sales: 2000, expense: 9800 },
  { name: 'Tue', sales: 2780, expense: 3908 },
  { name: 'Wed', sales: 1890, expense: 4800 },
  { name: 'Thu', sales: 2390, expense: 3800 },
  { name: 'Fri', sales: 3490, expense: 4300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieData = [
  { name: 'Furniture', value: 400 },
  { name: 'Wood', value: 300 },
  { name: 'Boards', value: 300 },
  { name: 'Hardware', value: 200 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Reports</h1>
          <p className="text-muted-foreground">Analyze your business performance and growth.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="h-4 w-4" /> This Month
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Total Revenue', value: '৳ 1.2M', icon: TrendingUp, color: 'text-emerald-500' },
          { title: 'Total Expense', value: '৳ 450K', icon: TrendingDown, color: 'text-destructive' },
          { title: 'Net Profit', value: '৳ 750K', icon: BarChart3, color: 'text-primary' },
          { title: 'Total Orders', value: '1,245', icon: Receipt, color: 'text-blue-500' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales vs Expenses</CardTitle>
            <CardDescription>Weekly comparison of cash flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-bold ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Sales Report', icon: FileText, desc: 'Detailed sales and invoice records' },
          { title: 'Inventory Report', icon: Package, desc: 'Stock levels and valuation' },
          { title: 'Customer Report', icon: Users, desc: 'Customer activity and balances' },
        ].map((report, i) => (
          <Card key={i} className="hover:bg-muted/50 transition-colors cursor-pointer group">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <report.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.desc}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

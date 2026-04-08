'use client';

import * as React from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  UserPlus, 
  Printer, 
  Save,
  X,
  Edit2,
  RotateCcw
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { products, customers } from '@/lib/mock-data';
import { Product, InvoiceItem } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function POSWoodPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [carNoFilter, setCarNoFilter] = React.useState('all');
  
  const [cart, setCart] = React.useState<InvoiceItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>('walk-in');
  const [discount, setDiscount] = React.useState(0);
  const [discountType, setDiscountType] = React.useState<'amount' | 'percent'>('amount');
  const [delivery, setDelivery] = React.useState(0);
  const [paidAmount, setPaidAmount] = React.useState(0);

  const woodProducts = products.filter(p => {
    if (p.type !== 'WOOD') return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.tag?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (carNoFilter !== 'all' && p.carNo !== carNoFilter) return false;
    return true;
  });

  const uniqueCarNos = Array.from(new Set(products.filter(p => p.type === 'WOOD' && p.carNo).map(p => p.carNo)));

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.rate }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.tag || product.name,
        quantity: 1,
        rate: product.price,
        total: product.price
      }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty, total: newQty * item.rate };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discountType === 'amount' ? discount : (subtotal * discount) / 100;
  const grandTotal = subtotal - discountAmount + delivery;
  const dueAmount = Math.max(0, grandTotal - paidAmount);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Order completed successfully!');
    handleReset();
  };

  const handleReset = () => {
    setCart([]);
    setDiscount(0);
    setDelivery(0);
    setPaidAmount(0);
    setSelectedCustomer('walk-in');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      {/* Left Area: Filters & Table */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search wood items..."
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-48 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="c1">Solid Wood</SelectItem>
                <SelectItem value="c2">Boards & Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-32 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Car No</label>
            <Select value={carNoFilter} onValueChange={setCarNoFilter}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueCarNos.map(car => (
                  <SelectItem key={car} value={car as string}>{car}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="flex-1 overflow-hidden border shadow-sm">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="bg-muted/30 sticky top-0 z-10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12 text-xs font-bold text-muted-foreground">NO</TableHead>
                  <TableHead className="w-16 text-xs font-bold text-muted-foreground">CAR</TableHead>
                  <TableHead className="w-24 text-xs font-bold text-muted-foreground">TREE NO</TableHead>
                  <TableHead className="w-20 text-xs font-bold text-muted-foreground">WIDTH</TableHead>
                  <TableHead className="w-20 text-xs font-bold text-muted-foreground">LENGTH</TableHead>
                  <TableHead className="w-24 text-xs font-bold text-muted-foreground">CFT</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground">TAG</TableHead>
                  <TableHead className="w-24 text-right text-xs font-bold text-muted-foreground">RATE</TableHead>
                  <TableHead className="w-24 text-center text-xs font-bold text-muted-foreground">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {woodProducts.map((product, index) => (
                  <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-xs text-muted-foreground font-medium">{index + 1}</TableCell>
                    <TableCell className="text-sm font-medium">{product.carNo || '-'}</TableCell>
                    <TableCell className="text-sm font-bold text-emerald-600">{product.treeNo || '-'}</TableCell>
                    <TableCell className="text-sm">{product.width || '-'}</TableCell>
                    <TableCell className="text-sm">{product.length || '-'}</TableCell>
                    <TableCell className="text-sm font-bold">{product.cft?.toFixed(5) || '0.00000'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{product.tag || product.name}</TableCell>
                    <TableCell className="text-sm font-bold text-orange-500 text-right">৳{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>

      {/* Right Area: Cart */}
      <Card className="w-full lg:w-[380px] flex flex-col shadow-sm border-muted">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-6 w-6" />
            Current Order
          </CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="pl-9 h-10 w-full border-muted-foreground/20">
                  <SelectValue placeholder="Walk-in Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk-in">Walk-in Customer</SelectItem>
                  {customers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button size="icon" className="h-10 w-10 bg-orange-500 hover:bg-orange-600 text-white shrink-0">
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-10 w-10 bg-red-50 hover:bg-red-100 text-red-500 border-red-100 shrink-0" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-50">
              <ShoppingCart className="h-16 w-16 mb-4" strokeWidth={1} />
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            <ScrollArea className="flex-1 px-4 py-2">
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.productId} className="flex flex-col gap-2 p-2 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">৳{item.rate} / unit</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md h-8">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-full w-8 rounded-none"
                          onClick={() => updateQuantity(item.productId, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-full w-8 rounded-none"
                          onClick={() => updateQuantity(item.productId, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold">৳{item.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>

        <div className="p-4 border-t bg-slate-50/50 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">৳{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Disc.</span>
              <div className="flex bg-muted rounded-md p-0.5">
                <button 
                  className={cn("px-2 py-0.5 text-xs rounded-sm transition-colors", discountType === 'amount' ? "bg-white shadow-sm font-medium" : "text-muted-foreground")}
                  onClick={() => setDiscountType('amount')}
                >
                  ৳
                </button>
                <button 
                  className={cn("px-2 py-0.5 text-xs rounded-sm transition-colors", discountType === 'percent' ? "bg-white shadow-sm font-medium" : "text-muted-foreground")}
                  onClick={() => setDiscountType('percent')}
                >
                  %
                </button>
              </div>
            </div>
            <Input 
              type="number" 
              className="h-8 w-24 text-right" 
              value={discount || ''} 
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Delivery</span>
            <Input 
              type="number" 
              className="h-8 w-24 text-right" 
              value={delivery || ''} 
              onChange={(e) => setDelivery(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <Separator className="my-2" />
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-base">Total</span>
            <span className="font-bold text-base">৳{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          
          <div className="flex items-center justify-between gap-4 pt-1">
            <span className="text-sm font-bold text-emerald-600">Paid</span>
            <Input 
              type="number" 
              className="h-9 w-32 text-right font-bold text-emerald-700 bg-emerald-50 border-emerald-100 focus-visible:ring-emerald-500" 
              value={paidAmount || ''} 
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm font-bold text-destructive">
            <span>Due</span>
            <span>৳{dueAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button variant="outline" className="gap-2 h-12 text-base font-medium" onClick={() => window.print()}>
              <Printer className="h-5 w-5" />
              Bill
            </Button>
            <Button className="gap-2 h-12 bg-orange-500 hover:bg-orange-600 text-white text-base font-medium" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


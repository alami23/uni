'use client';

import * as React from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart, 
  UserPlus, 
  Printer, 
  Save,
  X,
  Calendar as CalendarIcon
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { products, customers } from '@/lib/mock-data';
import { Product, InvoiceItem } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function POSFurniturePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cart, setCart] = React.useState<InvoiceItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>('walk-in');
  const [discount, setDiscount] = React.useState(0);
  const [deliveryCharge, setDeliveryCharge] = React.useState(0);
  const [paidAmount, setPaidAmount] = React.useState(0);
  const [deliveryDate, setDeliveryDate] = React.useState<Date>();

  const furnitureProducts = products.filter(p => 
    p.type === 'FURNITURE' && 
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        name: product.name,
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
  const grandTotal = subtotal - discount + deliveryCharge;
  const dueAmount = Math.max(0, grandTotal - paidAmount);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    toast.success('Furniture order saved successfully!');
    setCart([]);
    setDiscount(0);
    setDeliveryCharge(0);
    setPaidAmount(0);
    setDeliveryDate(undefined);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      {/* Product Selection Area */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search furniture by name, model or SKU..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <ScrollArea className="flex-1 border rounded-xl bg-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {furnitureProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:border-primary transition-all cursor-pointer group" onClick={() => addToCart(product)}>
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <Image 
                    src={`https://picsum.photos/seed/${product.id}/400/225`} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground border-none">
                    {product.stock} in stock
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[10px]">{product.sku}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{product.model}</span>
                  </div>
                  <CardTitle className="text-base mt-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                    {product.material} • {product.color} • {product.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">৳ {product.price.toLocaleString()}</span>
                    <Button size="sm" variant="secondary" className="h-7 px-2">Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Cart / Checkout Area */}
      <Card className="w-full lg:w-[400px] flex flex-col shadow-lg border-primary/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order Cart ({cart.length})
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCart([])} className="text-muted-foreground hover:text-destructive">
              Clear
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walk-in">Walk-in Customer</SelectItem>
                {customers.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP") : <span>Delivery Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={setDeliveryDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-6">
            <div className="space-y-4 py-2">
              {cart.map((item) => (
                <div key={item.productId} className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">৳ {item.rate.toLocaleString()} / unit</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 rounded-none"
                        onClick={() => updateQuantity(item.productId, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 rounded-none"
                        onClick={() => updateQuantity(item.productId, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-bold">৳ {item.total.toLocaleString()}</span>
                  </div>
                  <Separator className="mt-2" />
                </div>
              ))}
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                  <p>Cart is empty</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 p-6 bg-muted/30 border-t">
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>৳ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Discount</span>
              <Input 
                type="number" 
                className="h-7 w-24 text-right" 
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Delivery Charge</span>
              <Input 
                type="number" 
                className="h-7 w-24 text-right" 
                value={deliveryCharge} 
                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
              />
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">৳ {grandTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-sm font-medium">Advance Paid</span>
              <Input 
                type="number" 
                className="h-8 w-32 text-right font-bold text-emerald-600" 
                value={paidAmount} 
                onChange={(e) => setPaidAmount(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between text-sm font-medium text-destructive">
              <span>Due Balance</span>
              <span>৳ {dueAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button className="gap-2" onClick={handleCheckout}>
              <Save className="h-4 w-4" />
              Save Order
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

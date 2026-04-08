'use client';

import * as React from 'react';
import { Send, MessageSquare, History, Users, UserSquare2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function SMSPage() {
  const [message, setMessage] = React.useState('');
  
  const templates = [
    { title: 'Due Reminder', text: 'Dear [Customer], you have a pending due of [Amount] BDT. Please clear it soon. - Aranya Furniture' },
    { title: 'Delivery Ready', text: 'Dear [Customer], your order [Invoice] is ready for delivery. We will contact you soon. - Aranya Furniture' },
    { title: 'Payment Received', text: 'Dear [Customer], we have received your payment of [Amount] BDT. Thank you! - Aranya Furniture' },
  ];

  const handleSend = () => {
    if (!message) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('SMS sent successfully!');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SMS & Notifications</h1>
          <p className="text-muted-foreground">Send reminders and promotional messages to customers and staff.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>Send a new SMS to your contacts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Type</label>
                  <Select defaultValue="customer">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="all">All Contacts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Recipient</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All (Broadcast)</SelectItem>
                      <SelectItem value="1">Rahim Traders</SelectItem>
                      <SelectItem value="2">Noor Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Message Body</label>
                  <span className="text-[10px] text-muted-foreground">{message.length} / 160 characters</span>
                </div>
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[150px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t p-6">
              <div className="text-xs text-muted-foreground">
                Estimated cost: ৳ 0.40 per SMS
              </div>
              <Button className="gap-2" onClick={handleSend}>
                <Send className="h-4 w-4" />
                Send SMS
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4 p-3 rounded-lg border bg-muted/30">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">To: Rahim Traders</p>
                        <span className="text-[10px] text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        Dear Rahim Traders, your order INV-2024-001 is ready...
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] h-5">Sent</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Quick message templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((t, i) => (
                <button 
                  key={i} 
                  className="w-full text-left p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors group"
                  onClick={() => setMessage(t.text)}
                >
                  <p className="text-sm font-bold group-hover:text-primary">{t.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.text}</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">SMS Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৳ 450.00</div>
              <p className="text-xs opacity-80 mt-1">Approx. 1,125 SMS remaining</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full text-primary">Recharge Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';

export type ProductType = 'WOOD' | 'FURNITURE';

export interface Category {
  id: string;
  name: string;
  type: ProductType;
  description?: string;
  itemCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  categoryId: string;
  sku: string;
  price: number;
  costPrice: number;
  stock: number;
  reorderLevel: number;
  unit: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  // Wood specific
  thickness?: string;
  length?: string;
  width?: string;
  woodType?: string;
  carNo?: string;
  treeNo?: string;
  cft?: number;
  tag?: string;
  // Furniture specific
  model?: string;
  material?: string;
  color?: string;
  size?: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  address: string;
  area?: string;
  dueBalance: number;
  creditLimit: number;
  notes?: string;
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  designation: string;
  department: string;
  salary: number;
  joiningDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  nid?: string;
}

export interface InvoiceItem {
  productId: string;
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  deliveryDate?: string;
  customerId: string;
  customerName: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  transportCharge: number;
  tax: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  status: 'PAID' | 'PARTIAL' | 'DUE';
  notes?: string;
}

export interface Bill {
  id: string;
  billNumber: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'PAID' | 'UNPAID' | 'PARTIAL';
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  referenceType: 'SALE' | 'PURCHASE' | 'BILL' | 'SALARY' | 'ADJUSTMENT' | 'CUSTOMER_PAYMENT' | 'STAFF_PAYMENT';
  referenceNumber: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
}

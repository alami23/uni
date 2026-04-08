import { Category, Product, Customer, Staff, Invoice, Bill, Transaction } from '../types';

export const categories: Category[] = [
  { id: 'c1', name: 'Solid Wood', type: 'WOOD', itemCount: 12, status: 'ACTIVE' },
  { id: 'c2', name: 'Plywood', type: 'WOOD', itemCount: 8, status: 'ACTIVE' },
  { id: 'c3', name: 'Beds', type: 'FURNITURE', itemCount: 15, status: 'ACTIVE' },
  { id: 'c4', name: 'Dining Tables', type: 'FURNITURE', itemCount: 10, status: 'ACTIVE' },
  { id: 'c5', name: 'Sofas', type: 'FURNITURE', itemCount: 7, status: 'ACTIVE' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Teak Wood (Segun)',
    type: 'WOOD',
    categoryId: 'c1',
    sku: 'WD-SEG-01',
    price: 4500,
    costPrice: 3800,
    stock: 150,
    reorderLevel: 20,
    unit: 'CFT',
    woodType: 'Hardwood',
    status: 'ACTIVE'
  },
  {
    id: 'p2',
    name: 'King Size Bed - Royal',
    type: 'FURNITURE',
    categoryId: 'c3',
    sku: 'FN-BED-01',
    price: 45000,
    costPrice: 32000,
    stock: 5,
    reorderLevel: 2,
    unit: 'PCS',
    model: 'Royal-2024',
    material: 'Segun Wood',
    color: 'Antique Burnish',
    size: '6ft x 7ft',
    status: 'ACTIVE'
  },
  {
    id: 'p3',
    name: 'MDF Board 18mm',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'WD-MDF-18',
    price: 2800,
    costPrice: 2200,
    stock: 45,
    reorderLevel: 10,
    unit: 'Sheet',
    thickness: '18mm',
    status: 'ACTIVE'
  }
];

export const customers: Customer[] = [
  {
    id: 'cust1',
    name: 'Rahim Traders',
    mobile: '01711223344',
    address: 'Mirpur-10, Dhaka',
    area: 'Dhaka',
    dueBalance: 15000,
    creditLimit: 50000,
    createdAt: '2024-01-15'
  },
  {
    id: 'cust2',
    name: 'Noor Furniture House',
    mobile: '01822334455',
    address: 'Agrabad, Chattogram',
    area: 'Chattogram',
    dueBalance: 0,
    creditLimit: 100000,
    createdAt: '2024-02-10'
  }
];

export const staff: Staff[] = [
  {
    id: 's1',
    name: 'Alamin Hossain',
    phone: '01911223344',
    address: 'Gazipur',
    designation: 'Manager',
    department: 'Sales',
    salary: 25000,
    joiningDate: '2023-05-01',
    status: 'ACTIVE'
  },
  {
    id: 's2',
    name: 'Rakib Ahmed',
    phone: '01611223344',
    address: 'Dhaka',
    designation: 'Carpenter',
    department: 'Production',
    salary: 18000,
    joiningDate: '2023-08-15',
    status: 'ACTIVE'
  }
];

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-03-20',
    customerId: 'cust1',
    customerName: 'Rahim Traders',
    items: [
      { productId: 'p1', name: 'Teak Wood (Segun)', quantity: 10, rate: 4500, total: 45000 }
    ],
    subtotal: 45000,
    discount: 2000,
    transportCharge: 1500,
    tax: 0,
    grandTotal: 44500,
    paidAmount: 30000,
    dueAmount: 14500,
    status: 'PARTIAL'
  }
];

export const bills: Bill[] = [
  {
    id: 'b1',
    billNumber: 'BILL-001',
    date: '2024-03-01',
    payee: 'DESCO',
    category: 'Electricity',
    amount: 4500,
    paidAmount: 4500,
    dueAmount: 0,
    status: 'PAID'
  }
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '2024-03-20',
    type: 'INCOME',
    referenceType: 'SALE',
    referenceNumber: 'INV-2024-001',
    category: 'Sales',
    amount: 30000,
    paymentMethod: 'Cash'
  }
];

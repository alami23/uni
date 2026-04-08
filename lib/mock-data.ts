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
    name: 'Teak Wood',
    type: 'WOOD',
    categoryId: 'c1',
    sku: 'WD-101',
    price: 1200,
    costPrice: 1000,
    stock: 150,
    reorderLevel: 20,
    unit: 'CFT',
    carNo: '1',
    treeNo: '101',
    width: '24"',
    length: "12'",
    cft: 3.00000,
    tag: 'Premium grade Teak wood',
    status: 'ACTIVE'
  },
  {
    id: 'p4',
    name: 'Mahogany Plank',
    type: 'WOOD',
    categoryId: 'c1',
    sku: 'WD-102',
    price: 950,
    costPrice: 800,
    stock: 100,
    reorderLevel: 10,
    unit: 'CFT',
    carNo: '1',
    treeNo: '102',
    width: '12"',
    length: "8'",
    cft: 0.50000,
    tag: 'Standard mahogany plank',
    status: 'ACTIVE'
  },
  {
    id: 'p5',
    name: 'Pine Wood',
    type: 'WOOD',
    categoryId: 'c1',
    sku: 'WD-103',
    price: 650,
    costPrice: 500,
    stock: 200,
    reorderLevel: 30,
    unit: 'CFT',
    carNo: '2',
    treeNo: '103',
    width: '18"',
    length: "10'",
    cft: 1.40625,
    tag: 'Local pine wood',
    status: 'ACTIVE'
  },
  {
    id: 'p6',
    name: 'Plywood 18mm',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'WD-201',
    price: 1500,
    costPrice: 1200,
    stock: 50,
    reorderLevel: 15,
    unit: 'Sheet',
    carNo: '2',
    treeNo: '201',
    width: '20"',
    length: "6'",
    cft: 1.04167,
    tag: 'Waterproof 18mm plywood',
    status: 'ACTIVE'
  },
  {
    id: 'p7',
    name: 'MDF Board',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'WD-202',
    price: 45,
    costPrice: 35,
    stock: 300,
    reorderLevel: 50,
    unit: 'SFT',
    carNo: '3',
    treeNo: '202',
    width: '48"',
    length: "8'",
    cft: 8.00000,
    tag: 'Standard MDF board',
    status: 'ACTIVE'
  },
  {
    id: 'p8',
    name: 'Steel Screws',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'HW-301',
    price: 35,
    costPrice: 25,
    stock: 1000,
    reorderLevel: 200,
    unit: 'Box',
    carNo: '4',
    treeNo: '301',
    width: '0"',
    length: "0'",
    cft: 0.00000,
    tag: 'Steel screws',
    status: 'ACTIVE'
  },
  {
    id: 'p9',
    name: 'Door Hinges',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'HW-302',
    price: 450,
    costPrice: 350,
    stock: 150,
    reorderLevel: 30,
    unit: 'Pair',
    carNo: '5',
    treeNo: '302',
    width: '0"',
    length: "0'",
    cft: 0.00000,
    tag: 'Door hinges',
    status: 'ACTIVE'
  },
  {
    id: 'p10',
    name: 'Clear Varnish',
    type: 'WOOD',
    categoryId: 'c2',
    sku: 'HW-401',
    price: 850,
    costPrice: 700,
    stock: 80,
    reorderLevel: 20,
    unit: 'Ltr',
    carNo: '5',
    treeNo: '401',
    width: '0"',
    length: "0'",
    cft: 0.00000,
    tag: 'Clear varnish',
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

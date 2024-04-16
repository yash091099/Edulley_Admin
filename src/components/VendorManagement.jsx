import React, { useState } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

export default function VendorManagement() {
  const navigate = useNavigate();
const [newOrder,setNewOrder] = useState(false);
// columns in table | note:- order matters
  const columns = [
    { name: "Order id", enableSorting: true, searchingEnabled: true },
    { name: "Order Value(₹)", enableSorting: true, searchingEnabled: true },
    { name: "Items", enableSorting: true, searchingEnabled: true },
    { name: "PRICE/UNIT (₹)", enableSorting: true, searchingEnabled: true },
    { name: "Status", enableSorting: true, searchingEnabled: true },
  ];


//   provide the actual table body data
const data = [
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Created'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Paid'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Fullfilled'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Refund'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Created'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Refund'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Paid'
  },
  {
    'Order id': '#157614075142992',
    'Order date': '26-10-2023',
    'Order Value(₹)': '1280.00',
    'Items': 'Article 1, Article 2, Article 3,Article 1, A....',
    'Status': 'Paid'
  }
];


//   map the data to columns | note:- order matters*
  const mapping = [
    'Order id',
    'Order date',
    'Order Value(₹)',
    'Items',
    'Status'
  ]
  
  

  return (
      <div className='flex flex-col gap-[2.5rem] bg-white p-[2rem] rounded-[1rem]'>
        <h1 className='text-text text-[1.5rem] font-[600] tracking-[0.07813rem]'>Vendor Management</h1>
        <Table columns={columns} data={data} mapping={mapping} fun={()=>{navigate('/dashboard/view-vendor')}} />
      </div>
  )
}

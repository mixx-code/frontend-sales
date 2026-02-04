'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sales Dashboard
          </h1>
          <p className="text-gray-600">
            PT. Unggul Mitra Solusi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/barang">
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center hover:bg-blue-700 transition-colors cursor-pointer h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Barang</h3>
              <p className="text-blue-100">Kelola data barang</p>
            </div>
          </Link>
          
          <Link href="/pelanggan">
            <div className="bg-green-600 text-white rounded-lg p-8 text-center hover:bg-green-700 transition-colors cursor-pointer h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Pelanggan</h3>
              <p className="text-green-100">Kelola data pelanggan</p>
            </div>
          </Link>
          
          <Link href="/penjualan">
            <div className="bg-purple-600 text-white rounded-lg p-8 text-center hover:bg-purple-700 transition-colors cursor-pointer h-full flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Penjualan</h3>
              <p className="text-purple-100">Kelola transaksi</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Barang, CreateBarangRequest, UpdateBarangRequest } from '@/types';
import { 
  getBarang, 
  createBarang, 
  updateBarang, 
  deleteBarang 
} from '@/lib/services';
import { Button } from '@/components/atoms/Button';
import { BarangTable } from '@/components/organisms/BarangTable';
import { BarangForm } from '@/components/organisms/BarangForm';

export default function BarangPage() {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBarang, setEditingBarang] = useState<Barang | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBarang();
  }, []);


  const fetchBarang = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBarang();
      // Handle the actual API response structure: { success: true, data: { data: [...] } }
      const data = response?.data?.data || [];
      setBarangList(data);
    } catch (err) {
      setError('Gagal mengambil data barang');
      console.error('Error fetching barang:', err);
      setBarangList([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBarang(undefined);
    setShowForm(true);
  };

  const handleEdit = (barang: Barang) => {
    setEditingBarang(barang);
    setShowForm(true);
  };

  const handleDelete = async (kode: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data barang ini?')) return;

    try {
      setLoading(true);
      await deleteBarang(kode);
      await fetchBarang();
    } catch (err) {
      setError('Gagal menghapus data barang');
      console.error('Error deleting barang:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: CreateBarangRequest | UpdateBarangRequest) => {
    try {
      setLoading(true);
      setError(null);

      if (editingBarang) {
        await updateBarang(editingBarang.kode, data as UpdateBarangRequest);
      } else {
        await createBarang(data as CreateBarangRequest);
      }

      setShowForm(false);
      setEditingBarang(undefined);
      await fetchBarang();
    } catch (err) {
      setError(editingBarang ? 'Gagal mengupdate data barang' : 'Gagal menambah data barang');
      console.error('Error saving barang:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBarang(undefined);
  };

  const handleFormBack = () => {
    setShowForm(false);
    setEditingBarang(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Master Data Barang</h1>
          <p className="text-gray-600">Kelola data barang sistem</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!showForm ? (
          <>
            <div className="mb-6 flex justify-end">
              <Button
                onClick={handleCreate}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Tambah Barang
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Memuat data...</p>
                </div>
              ) : barangList.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Belum ada data barang
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mulai dengan menambah barang baru
                  </p>
                  <Button onClick={handleCreate}>
                    Tambah Barang Pertama
                  </Button>
                </div>
              ) : (
                <BarangTable
                  data={barangList}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </>
        ) : (
          <BarangForm
            barang={editingBarang}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            onBack={handleFormBack}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

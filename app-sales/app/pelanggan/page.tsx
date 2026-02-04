'use client';

import React, { useState, useEffect } from 'react';
import { Pelanggan, CreatePelangganRequest, UpdatePelangganRequest } from '@/types';
import { 
  getPelanggan, 
  createPelanggan, 
  updatePelanggan, 
  deletePelanggan 
} from '@/lib/services';
import { Button } from '@/components/atoms/Button';
import { SearchBar } from '@/components/molecules/SearchBar';
import { PelangganTable } from '@/components/organisms/PelangganTable';
import { PelangganForm } from '@/components/organisms/PelangganForm';

export default function PelangganPage() {
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [filteredPelanggan, setFilteredPelanggan] = useState<Pelanggan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPelanggan, setEditingPelanggan] = useState<Pelanggan | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPelanggan();
  }, []);

  useEffect(() => {
    const filtered = Array.isArray(pelangganList) ? pelangganList.filter(pelanggan =>
      pelanggan.id_pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pelanggan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pelanggan.domisili.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    setFilteredPelanggan(filtered);
  }, [pelangganList, searchTerm]);

  const fetchPelanggan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPelanggan();
      // Handle the actual API response structure: { success: true, data: { data: [...] } }
      const data = response?.data?.data || [];
      setPelangganList(data);
    } catch (err) {
      setError('Gagal mengambil data pelanggan');
      console.error('Error fetching pelanggan:', err);
      setPelangganList([]); // Ensure it's always an array
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPelanggan(undefined);
    setShowForm(true);
  };

  const handleEdit = (pelanggan: Pelanggan) => {
    setEditingPelanggan(pelanggan);
    setShowForm(true);
  };

  const handleDelete = async (id_pelanggan: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data pelanggan ini?')) return;

    try {
      setLoading(true);
      await deletePelanggan(id_pelanggan);
      await fetchPelanggan();
    } catch (err) {
      setError('Gagal menghapus data pelanggan');
      console.error('Error deleting pelanggan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: CreatePelangganRequest | UpdatePelangganRequest) => {
    try {
      setLoading(true);
      setError(null);

      if (editingPelanggan) {
        await updatePelanggan(editingPelanggan.id_pelanggan, data as UpdatePelangganRequest);
      } else {
        await createPelanggan(data as CreatePelangganRequest);
      }

      setShowForm(false);
      setEditingPelanggan(undefined);
      await fetchPelanggan();
    } catch (err) {
      setError(editingPelanggan ? 'Gagal mengupdate data pelanggan' : 'Gagal menambah data pelanggan');
      console.error('Error saving pelanggan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPelanggan(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Master Data Pelanggan</h1>
          <p className="text-gray-600">Kelola data pelanggan sistem</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!showForm ? (
          <>
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="w-full sm:w-96">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Cari berdasarkan ID, nama, atau domisili..."
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Tambah Pelanggan
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Memuat data...</p>
                </div>
              ) : filteredPelanggan.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data pelanggan'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm 
                      ? 'Coba ubah kata kunci pencarian' 
                      : 'Mulai dengan menambah pelanggan baru'
                    }
                  </p>
                  {!searchTerm && (
                    <Button onClick={handleCreate}>
                      Tambah Pelanggan Pertama
                    </Button>
                  )}
                </div>
              ) : (
                <PelangganTable
                  data={filteredPelanggan}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </>
        ) : (
          <PelangganForm
            pelanggan={editingPelanggan}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

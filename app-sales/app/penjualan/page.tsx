'use client';

import React, { useState, useEffect } from 'react';
import { 
  Penjualan, 
  ItemPenjualan, 
  CreatePenjualanRequest, 
  UpdatePenjualanRequest,
  CreateItemPenjualanRequest,
  UpdateItemPenjualanRequest,
  Pelanggan,
  Barang
} from '@/types';
import { 
  getPenjualan, 
  createPenjualan, 
  updatePenjualan, 
  deletePenjualan,
  getItemPenjualan,
  createItemPenjualan,
  updateItemPenjualan,
  deleteItemPenjualan,
  getPelanggan,
  getBarang
} from '@/lib/services';
import { Button } from '@/components/atoms/Button';
import { PenjualanDetail } from '@/components/molecules/PenjualanDetail';
import { PenjualanTable } from '@/components/organisms/PenjualanTable';
import { PenjualanForm } from '@/components/organisms/PenjualanForm';
import { ItemPenjualanTable } from '@/components/organisms/ItemPenjualanTable';
import { ItemPenjualanForm } from '@/components/organisms/ItemPenjualanForm';
import { ItemPenjualanManager } from '@/components/organisms/ItemPenjualanManager';

export default function PenjualanPage() {
  const [penjualanList, setPenjualanList] = useState<Penjualan[]>([]);
  const [itemPenjualanList, setItemPenjualanList] = useState<ItemPenjualan[]>([]);
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([]);
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [showPenjualanForm, setShowPenjualanForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingPenjualan, setEditingPenjualan] = useState<Penjualan | undefined>();
  const [editingItem, setEditingItem] = useState<ItemPenjualan | undefined>();
  const [selectedPenjualan, setSelectedPenjualan] = useState<Penjualan | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPenjualan();
    fetchPelanggan();
    fetchBarang();
  }, []);


  const fetchPenjualan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPenjualan();
      const data = response?.data?.data || [];
      setPenjualanList(data);
    } catch (err) {
      setError('Gagal mengambil data penjualan');
      console.error('Error fetching penjualan:', err);
      setPenjualanList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPelanggan = async () => {
    try {
      const response = await getPelanggan();
      const data = response?.data?.data || [];
      setPelangganList(data);
    } catch (err) {
      console.error('Error fetching pelanggan:', err);
    }
  };

  const fetchBarang = async () => {
    try {
      const response = await getBarang();
      const data = response?.data?.data || [];
      setBarangList(data);
    } catch (err) {
      console.error('Error fetching barang:', err);
    }
  };

  const fetchItemPenjualan = async (nota: string) => {
    try {
      setLoading(true);
      const response = await getItemPenjualan();
      const allItems = response?.data?.data || [];
      const filteredItems = allItems.filter((item: ItemPenjualan) => item.nota === nota);
      setItemPenjualanList(filteredItems);
    } catch (err) {
      console.error('Error fetching item penjualan:', err);
      setItemPenjualanList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePenjualan = () => {
    setEditingPenjualan(undefined);
    setShowPenjualanForm(true);
  };

  const handleEditPenjualan = (penjualan: Penjualan) => {
    setEditingPenjualan(penjualan);
    setShowPenjualanForm(true);
  };

  const handleDeletePenjualan = async (id_nota: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data penjualan ini? Semua item akan terhapus juga.')) return;

    try {
      setLoading(true);
      await deletePenjualan(id_nota);
      await fetchPenjualan();
    } catch (err) {
      setError('Gagal menghapus data penjualan');
      console.error('Error deleting penjualan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewItems = (penjualan: Penjualan) => {
    setSelectedPenjualan(penjualan);
    fetchItemPenjualan(penjualan.id_nota);
  };

  const handleCreateItem = () => {
    if (!selectedPenjualan) return;
    setEditingItem(undefined);
    setShowItemForm(true);
  };

  const handleEditItem = (item: ItemPenjualan) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  const handleDeleteItem = async (nota: string, kode_barang: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    try {
      setLoading(true);
      setError(null);
      console.log('Deleting item:', { nota, kode_barang });
      await deleteItemPenjualan(nota, kode_barang);
      if (selectedPenjualan) {
        await fetchItemPenjualan(selectedPenjualan.id_nota);
        await fetchPenjualan(); // Refresh untuk update subtotal
      }
    } catch (err) {
      setError('Gagal menghapus item penjualan');
      console.error('Error deleting item penjualan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePenjualanFormSubmit = async (data: CreatePenjualanRequest | UpdatePenjualanRequest) => {
    try {
      setLoading(true);
      setError(null);

      if (editingPenjualan) {
        await updatePenjualan(editingPenjualan.id_nota, data as UpdatePenjualanRequest);
      } else {
        await createPenjualan(data as CreatePenjualanRequest);
      }

      setShowPenjualanForm(false);
      setEditingPenjualan(undefined);
      await fetchPenjualan();
    } catch (err) {
      setError(editingPenjualan ? 'Gagal mengupdate data penjualan' : 'Gagal menambah data penjualan');
      console.error('Error saving penjualan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemFormSubmit = async (data: CreateItemPenjualanRequest | UpdateItemPenjualanRequest) => {
    if (!selectedPenjualan) return;

    try {
      setLoading(true);
      setError(null);

      if (editingItem) {
        await updateItemPenjualan(editingItem.nota, editingItem.kode_barang, data as UpdateItemPenjualanRequest);
      } else {
        await createItemPenjualan(data as CreateItemPenjualanRequest);
      }

      setShowItemForm(false);
      setEditingItem(undefined);
      await fetchItemPenjualan(selectedPenjualan.id_nota);
      await fetchPenjualan(); // Refresh untuk update subtotal
    } catch (err) {
      setError(editingItem ? 'Gagal mengupdate item penjualan' : 'Gagal menambah item penjualan');
      console.error('Error saving item penjualan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedPenjualan(undefined);
    setItemPenjualanList([]);
  };

  const handleFormBack = () => {
    setShowPenjualanForm(false);
    setEditingPenjualan(undefined);
  };

  const handleItemFormBack = () => {
    setShowItemForm(false);
    setEditingItem(undefined);
  };

  if (selectedPenjualan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <PenjualanDetail 
              penjualan={selectedPenjualan} 
              onBack={handleBackToList} 
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <ItemPenjualanManager
            itemPenjualanList={itemPenjualanList}
            loading={loading}
            onCreateItem={handleCreateItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            showItemForm={showItemForm}
          >
            {showItemForm ? (
              <ItemPenjualanForm
                item={editingItem}
                barangList={barangList}
                nota={selectedPenjualan.id_nota}
                onSubmit={handleItemFormSubmit}
                onCancel={() => {
                  setShowItemForm(false);
                  setEditingItem(undefined);
                }}
                onBack={handleItemFormBack}
                loading={loading}
              />
            ) : (
              <ItemPenjualanTable
                data={itemPenjualanList}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}
          </ItemPenjualanManager>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Master Data Penjualan</h1>
          <p className="text-gray-600">Kelola data transaksi penjualan</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!showPenjualanForm ? (
          <>
            <div className="mb-6 flex justify-end">
              <Button
                onClick={handleCreatePenjualan}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Tambah Penjualan
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Memuat data...</p>
                </div>
              ) : penjualanList.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Belum ada data penjualan
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mulai dengan menambah penjualan baru
                  </p>
                  <Button onClick={handleCreatePenjualan}>
                    Tambah Penjualan Pertama
                  </Button>
                </div>
              ) : (
                <PenjualanTable
                  data={penjualanList}
                  onEdit={handleEditPenjualan}
                  onDelete={handleDeletePenjualan}
                  onViewItems={handleViewItems}
                />
              )}
            </div>
          </>
        ) : (
          <PenjualanForm
            penjualan={editingPenjualan}
            pelangganList={pelangganList}
            onSubmit={handlePenjualanFormSubmit}
            onCancel={() => {
              setShowPenjualanForm(false);
              setEditingPenjualan(undefined);
            }}
            onBack={handleFormBack}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

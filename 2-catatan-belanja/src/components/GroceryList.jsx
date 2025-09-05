import { useState } from 'react';
import Item from './Item';

// Komponen utama GroceryList menerima props: items, onDeleteItem, onToggleItem, dan onClearItems
export default function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }) {
    // State untuk menyimpan pilihan pengurutan
    const [sortBy, setSortBy] = useState('input');

    // Fungsi untuk mengurutkan items sesuai pilihan sortBy
    const getSortedItems = () => {
        if (sortBy === 'name') {
            // Urutkan berdasarkan nama barang (alfabet)
            return [...items].sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortBy === 'checked') {
            // Urutkan berdasarkan status ceklis (false dulu, lalu true)
            return [...items].sort((a, b) => a.checked - b.checked);
        }
        // Default: urutan input (tidak diurutkan)
        return items;
    };

    const sortedItems = getSortedItems();

    return (
        <>
            {/* Daftar belanja */}
            <div className="list">
                <ul>
                    {/* Render setiap item menggunakan komponen Item */}
                    {sortedItems.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            onDeleteItem={onDeleteItem}
                            onToggleItem={onToggleItem}
                        />
                    ))}
                </ul>
            </div>
            {/* Bagian aksi: pengurutan dan hapus semua */}
            <div className="actions">
                {/* Dropdown untuk memilih pengurutan */}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Urutkan berdasarkan urutan input</option>
                    <option value="name">Urutkan berdasarkan nama barang</option>
                    <option value="checked">Urutkan berdasarkan ceklis</option>
                </select>
                {/* Tombol untuk menghapus semua item */}
                <button onClick={onClearItems}>Bersihkan Daftar</button>
            </div>
        </>
    );
}

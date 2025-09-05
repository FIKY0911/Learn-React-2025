import { useState } from 'react';

// Komponen Form menerima fungsi onAddItem sebagai prop
export default function Form({ onAddItem }) {
    // State untuk nama barang dan jumlah barang
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Fungsi untuk menangani submit form
    function handleSubmit(e) {
        e.preventDefault(); // Mencegah reload halaman

        if (!name) return; // Jika nama kosong, tidak melakukan apa-apa

        // Membuat objek item baru
        const newItem = {
            name,
            quantity,
            checked: false,
            id: Date.now(), // ID unik berdasarkan waktu
        };

        onAddItem(newItem); // Memanggil fungsi dari prop untuk menambah item

        setName(''); // Reset nama barang
        setQuantity(1); // Reset jumlah barang
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>Hari ini belanja apa kita?</h3>
            {/* Pilihan jumlah barang dari 1 sampai 20 */}
            <select
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
            >
                {/* Membuat option dengan map, lebih singkat */}
                {[...Array(20)].map((_, i) => (
                    <option value={i + 1} key={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            {/* Input nama barang */}
            <input
                type="text"
                placeholder="nama barang..."
                value={name}
                onChange={e => setName(e.target.value)}
            />
            {/* Tombol submit */}
            <button type="submit">Tambah</button>
        </form>
    );
}

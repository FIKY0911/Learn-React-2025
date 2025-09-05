// Komponen Footer menerima props 'items' yang merupakan array daftar belanjaan
export default function Footer({ items }) {
    // Jika daftar belanjaan kosong, tampilkan pesan khusus
    if (items.length === 0) return <footer className="stats">Daftar belanjaan masih kosong!</footer>;

    // Hitung total barang di daftar belanjaan
    const totalItems = items.length;
    // Hitung jumlah barang yang sudah dibeli (checked = true)
    const checkedItems = items.filter((item) => item.checked).length;
    // Hitung persentase barang yang sudah dibeli, dibulatkan ke bilangan bulat terdekat
    const percentage = Math.round((checkedItems / totalItems) * 100);

    // Tampilkan informasi jumlah barang, barang yang sudah dibeli, dan persentasenya
    return (
        <footer className="stats">
            Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah dibeli ({percentage}%)
        </footer>
    );
}

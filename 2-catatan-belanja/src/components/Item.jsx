// Komponen Item menerima tiga props: item (objek), onDeleteItem (fungsi), dan onToggleItem (fungsi)
export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    // Setiap item ditampilkan sebagai elemen <li>
    <li key={item.id}>
      {/* Checkbox untuk menandai apakah item sudah dicek.
          checked: status dari item.checked
          onChange: memanggil fungsi onToggleItem dengan id item */}
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleItem(item.id)}
      />
      {/* Menampilkan nama dan jumlah item.
          Jika item.checked true, teks dicoret (line-through) */}
      <span style={item.checked ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.name}
      </span>
      {/* Tombol untuk menghapus item.
          onClick: memanggil fungsi onDeleteItem dengan id item */}
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}

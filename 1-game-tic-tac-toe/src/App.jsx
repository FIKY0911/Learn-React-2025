import { useState } from 'react'; // Import useState dari React

// Komponen Square: tombol kotak pada papan
function Square({ value, onClick }) {
  // Render tombol dengan nilai dan event klik
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Komponen Board: papan permainan
function Board({ squares, onClick, status }) {
  // Render status dan 9 kotak papan
  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((value, i) => (
          <Square key={i} value={value} onClick={() => onClick(i)} />
        ))}
      </div>
    </>
  );
}

// Komponen utama Game: mengelola state dan logika permainan
export default function Game() {
  // State: sejarah langkah & langkah saat ini
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  // Mendapatkan papan saat ini & giliran pemain
  const squares = history[step];
  const xIsNext = step % 2 === 0;

  // Fungsi untuk menangani klik kotak
  function handleClick(i) {
    // Jika sudah ada pemenang atau kotak terisi, abaikan klik
    if (squares[i] || calculateWinner(squares)) return;
    // Salin papan & isi kotak dengan 'X' atau 'O'
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Update sejarah & langkah
    const nextHistory = history.slice(0, step + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
  }

  // Fungsi untuk melompat ke langkah tertentu
  function jumpTo(move) {
    setStep(move);
  }

  // Status permainan: pemenang atau giliran berikutnya
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  // Daftar tombol untuk melompat ke setiap langkah
  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
        {move ? `Go to move #${move}` : 'Go to game start'}
      </button>
    </li>
  ));

  // Render papan dan info permainan
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} status={status} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Fungsi untuk menentukan pemenang
function calculateWinner(squares) {
  // Kombinasi garis kemenangan
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
    [0, 4, 8], [2, 4, 6],            // Diagonal
  ];
  // Cek setiap kombinasi
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Kembalikan pemenang
    }
  }
  return null; // Tidak ada pemenang
}

/* eslint-disable react/prop-types */
import { useState } from 'react'; // Import hook useState dari React

// Komponen Square untuk menampilkan tombol kotak individual
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}> // Tombol dengan event click
      {value} // Menampilkan nilai X atau O
    </button>
  );
}

// Komponen Board untuk menampilkan papan permainan
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) { // Fungsi untuk menangani klik pada kotak
    if (squares[i] || calculateWinner(squares)) return; // Cek apakah kotak sudah terisi atau ada pemenang

    const nextSquares = squares.slice(); // Buat salinan array untuk immutability
    nextSquares[i] = xIsNext ? 'X' : 'O'; // Tentukan nilai X atau O berdasarkan giliran
    onPlay(nextSquares); // Kirim perubahan ke komponen induk
  }

  const winner = calculateWinner(squares); // Cek apakah ada pemenang
  let status = '';
  if (winner) {
    status = 'Winner: ' + winner; // Tampilkan pemenang jika ada
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Tampilkan giliran pemain
  }

  return (
    <>
      <div className="status">{status}</div> // Tampilkan status permainan
      <div className="board"> // Container untuk papan permainan
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> // Kotak indeks 0
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} /> // Kotak indeks 1
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} /> // Kotak indeks 2
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> // Kotak indeks 3
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} /> // Kotak indeks 4
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} /> // Kotak indeks 5
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} /> // Kotak indeks 6
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} /> // Kotak indeks 7
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} /> // Kotak indeks 8
      </div>
    </>
  );
}

export default function Game() { // Komponen utama permainan
  const [history, setHistory] = useState([Array(9).fill(null)]); // State untuk menyimpan sejarah langkah
  const [currentMove, setCurrentMove] = useState(0); // State untuk langkah saat ini
  const xIsNext = currentMove % 2 === 0; // Tentukan giliran berdasarkan langkah
  const currentSquares = history[currentMove]; // Dapatkan state papan saat ini

  function jumpTo(nextMove) { // Fungsi untuk melompat ke langkah tertentu
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) { // Fungsi untuk menangani langkah baru
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Buat sejarah baru
    setHistory(nextHistory); // Update sejarah
    setCurrentMove(nextHistory.length - 1); // Pindah ke langkah terakhir
  }

  const moves = history.map((squares, move) => { // Buat daftar langkah yang bisa diklik
    let description = move > 0 ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}> // List item untuk setiap langkah
        <button onClick={() => jumpTo(move)}>{description}</button> // Tombol untuk melompat ke langkah
      </li>
    );
  });

  return (
    <div className="game"> // Container utama permainan
      <div className="game-board"> // Container papan permainan
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> // Render papan
      </div>
      <div className="game-info"> // Container informasi permainan
        <ol>{moves}</ol> // Daftar langkah-langkah
      </div>
    </div>
  );
}

function calculateWinner(squares) { // Fungsi untuk mengecek pemenang
  const lines = [ // Definisi kombinasi garis pemenang
    [0, 1, 2], // Baris atas
    [3, 4, 5], // Baris tengah
    [6, 7, 8], // Baris bawah
    [0, 3, 6], // Kolom kiri
    [1, 4, 7], // Kolom tengah
    [2, 5, 8], // Kolom kanan
    [0, 4, 8], // Diagonal kiri atas ke kanan bawah
    [2, 4, 6], // Diagonal kanan atas ke kiri bawah
  ];

  for (let i = 0; i < lines.length; i++) { // Loop setiap kombinasi
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // Cek apakah ada pemenang
      return squares[a]; // Kembalikan pemenang (X atau O)
    }
  }

  return false; // Tidak ada pemenang
}

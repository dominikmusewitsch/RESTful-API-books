"use client";

import { useEffect, useState, FormEvent } from "react";
import { Book } from "./types";
import { fetchBooks, createBook, updateBook, deleteBook } from "./booksApi";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState<number | "">("");

  // Bücher initial laden
  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
        alert("Fehler beim Laden der Bücher");
      }
    }
    loadBooks();
  }, []);

  // Neues Buch hinzufügen
  async function handleAddBook(e: FormEvent) {
    e.preventDefault();
    if (!title || !author || !publishedYear) return;

    try {
      const newBook = await createBook({
        title,
        author,
        publishedYear: Number(publishedYear),
      });
      setBooks([...books, newBook]);
      setTitle("");
      setAuthor("");
      setPublishedYear("");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Erstellen des Buches");
    }
  }

  // Bestehendes Buch aktualisieren
  async function handleUpdate(bookId: string) {
    if (!title || !author || !publishedYear) return;

    try {
      const updatedBook = await updateBook(bookId, {
        title,
        author,
        publishedYear: Number(publishedYear),
      });
      setBooks(books.map((b) => (b.id === bookId ? updatedBook : b)));
      setEditingId(null);
      setTitle("");
      setAuthor("");
      setPublishedYear("");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Aktualisieren des Buches");
    }
  }

  // Buch löschen
  async function handleDelete(bookId: string) {
    if (!confirm("Willst du dieses Buch wirklich löschen?")) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen des Buches");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        📚 Bücher Übersicht
      </h1>

      {/* Formular in einer Card */}
      <div className="max-w-md mx-auto mb-10 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Neues Buch hinzufügen</h2>
        <form onSubmit={handleAddBook} className="space-y-4">
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Erscheinungsjahr"
            value={publishedYear}
            onChange={(e) => setPublishedYear(Number(e.target.value))}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Buch hinzufügen
          </button>
        </form>
      </div>

      {/* Bücher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded-xl shadow-md bg-white"
          >
            {editingId === book.id ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titel"
                  className="border p-1 mb-1 w-full rounded"
                />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Autor"
                  className="border p-1 mb-1 w-full rounded"
                />
                <input
                  type="number"
                  value={publishedYear}
                  onChange={(e) => setPublishedYear(Number(e.target.value))}
                  placeholder="Erscheinungsjahr"
                  className="border p-1 mb-2 w-full rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(book.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded flex-1"
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                      setAuthor("");
                      setPublishedYear("");
                    }}
                    className="bg-gray-300 px-3 py-1 rounded flex-1"
                  >
                    Abbrechen
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
                <p className="text-gray-700 mb-1">Autor: {book.author}</p>
                <p className="text-gray-500 mb-3">
                  Erscheinungsjahr: {book.publishedYear}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(book.id);
                      setTitle(book.title);
                      setAuthor(book.author);
                      setPublishedYear(book.publishedYear);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex-1"
                  >
                    Löschen
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

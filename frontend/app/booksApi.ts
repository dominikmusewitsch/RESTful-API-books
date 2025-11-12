"use client";

import { Book } from "./types";

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/books`);
  if (!res.ok) throw new Error("Fehler beim Laden der Bücher");
  return res.json();
}

export async function createBook(book: Omit<Book, "id">) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Buch konnte nicht erstellt werden");
  return res.json();
}

export async function updateBook(id: string, book: Partial<Book>) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Buch konnte nicht aktualisiert werden");
  return res.json();
}

export async function deleteBook(id: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Buch konnte nicht gelöscht werden");
  return true;
}

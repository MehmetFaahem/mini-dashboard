"use client";
import { useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Modal from "@/components/Modal";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone: string;
  website: string;
  address: { city: string };
};

export default function UsersPage() {
  const url = useMemo(() => "https://jsonplaceholder.typicode.com/users", []);
  const { data, loading, error } = useFetch<User[]>(url);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Click a row to view details
          </p>
        </div>
      </div>

      {loading && <div className="text-sm">Loading users…</div>}
      {error && (
        <div className="text-sm text-red-600">
          Failed to load users: {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left font-medium p-3">Name</th>
              <th className="text-left font-medium p-3">Email</th>
              <th className="text-left font-medium p-3">Company</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((u) => (
              <tr
                key={u.id}
                className="border-t border-white/10 hover:bg-white/5 cursor-pointer"
                onClick={() => setSelectedUser(u)}
              >
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-[var(--accent)]">{u.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name}
      >
        {selectedUser ? (
          <div className="space-y-1">
            <div>
              <span className="font-medium">Email:</span> {selectedUser.email}
            </div>
            <div>
              <span className="font-medium">Company:</span>{" "}
              {selectedUser.company?.name}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {selectedUser.phone}
            </div>
            <div>
              <span className="font-medium">City:</span>{" "}
              {selectedUser.address?.city}
            </div>
            <div>
              <span className="font-medium">Website:</span>{" "}
              {selectedUser.website}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

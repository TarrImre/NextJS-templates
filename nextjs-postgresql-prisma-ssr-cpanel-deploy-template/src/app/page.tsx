"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Unknown error");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => {
        setDbError(err.message || "Database not connected. Please set up your PostgreSQL database and run migrations.");
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          User List
        </h1>
        {dbError && (
          <div className={styles.error}>
            {dbError}
          </div>
        )}
        {users.length > 0 ? (
          <ul className={styles.userList}>
            {users.map((user: any) => (
              <li key={user.id} className={styles.userItem}>
                <strong>{user.name}</strong> <span>({user.email})</span>
              </li>
            ))}
          </ul>
        ) : (
          !dbError && <p className={styles.noUsers}>No users found. Please create a user.</p>
        )}
      </div>
    </main>
  );
}

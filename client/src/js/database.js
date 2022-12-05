import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const todosDb = await openDB("jate", 1);
  const tx = todosDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ content });
  await request;
};

export const getDb = async () => {
  const todosDb = await openDB("jate", 1);
  const tx = todosDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  await request;
};

initdb();

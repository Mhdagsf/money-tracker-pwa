import Dexie from 'dexie';

const db = new Dexie('KeuanganDB');

db.version(1).stores({
  transactions: '++id, type, category, date, createdAt',
});

export default db;

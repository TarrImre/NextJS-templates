
## Next.js + PostgreSQL + Prisma SSR cPanel Deploy Template

Ez a projekt egy Next.js alkalmazás, amely PostgreSQL adatbázist és Prisma ORM-et használ. Kifejezetten cPaneles deployra, SSR támogatással, egyszerű fejlesztői és éles környezet közötti váltással.

### Fő funkciók
- Next.js SSR (Server Side Rendering)
- PostgreSQL adatbázis Prisma ORM-mel
- API endpointok (pl. `/api/users`)
- Egyszerű seedelés, migráció, fejlesztői és éles környezet támogatás
- cPanel kompatibilis (kisbetűs modellek, engine beállítások)

---

## Telepítés és fejlesztés

1. **Környezeti változók**
   - Állítsd be a `.env` fájlban a `DATABASE_URL`-t.
   - cPanelen a környezeti változót a felületen is be kell állítani!

2. **Prisma generálás és migráció**
   ```sh
   npm run db:generate   # Prisma kliens generálása
   npm run db:push       # Táblák létrehozása az adatbázisban
   npm run seed          # Példa adatok feltöltése
   ```

3. **Fejlesztői szerver indítása**
   ```sh
   npm run dev
   ```

4. **Adatbázis mentés (helyi gépen)**
   ```sh
   pg_dump -h localhost -p 5432 -U postgres -F p --encoding=UTF8 --clean --if-exists --create -f clean_backup.sql nextjs_prisma_dev
   ```

---

## Migrációk, seedelés, Prisma Studio

- Új migráció:
  ```sh
  npx prisma migrate dev --name "update-table-names-to-lowercase"
  ```
- Reset (minden törlése, újra seed):
  ```sh
  npx prisma migrate reset
  ```
- Prisma Studio (webes admin):
  ```sh
  npx prisma studio
  ```

---

## Fontos tudnivalók

- A `schema.prisma`-ban a modellek kisbetűsek, mert a phpPgAdmin csak így támogatja.
- A `binaryTargets = ["native", "debian-openssl-1.1.x"]` és `engineType = "binary"` beállítások szükségesek, mert a szerver Linuxon fut, de a fejlesztés Windows alatt történik.
- Ha jogosultsági hibát kapsz (pl. `permission denied for table user`), ellenőrizd a cPaneles adatbázis user jogosultságait, és hogy a migrációk tényleg lefutottak-e.
- cPanelen a környezeti változót (DATABASE_URL) a felületen is be kell állítani, nem elég a `.env` fájl!
- Ha SQL dumpot töltesz fel, kommenteld ki vagy töröld a séma tulajdonos/jogosultság módosító sorokat.
- A backup_original.sql és a backup.sql között láthatod a különbséget, miket kell kommentelni, hogy feltudd tölteni.

---

## Hasznos parancsok

```sh
npm run db:generate   # Prisma kliens generálása
npm run db:push       # Táblák létrehozása
npm run seed          # Példa adatok feltöltése
npm run dev           # Fejlesztői szerver indítása
npm run build         # Buildelés
npm run start         # Production szerver indítása
```
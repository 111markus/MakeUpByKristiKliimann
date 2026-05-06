# Kristi Kliimann Beauty veebileht

See projekt on Kristi Kliimanni portfoolio, hinnakirja, galerii ja adminpaneeliga veebileht. Rakendus koosneb React/Vite frontendist ja Express backendist. Backend hoiab hinnakirja ja avalehe teenuste andmeid SQLite andmebaasis ning adminpaneeli kaudu saab neid muuta.

## Tehnoloogiad

- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Express
- SQLite (`better-sqlite3`)
- Express session

## Põhifunktsioonid

- Avaleht teenuste kaartidega
- Hinnakiri kategooriate, teenuste kirjelduste ja märkustega
- Galerii lightbox vaatega
- Kontaktileht
- Adminpaneel hinnakirja muutmiseks
- Adminpaneel avalehe teenuste kaartide muutmiseks
- Teenuste lisamine, kustutamine ja järjekorra muutmine
- Kategooriate lisamine, kustutamine ja märkuste muutmine
- Render Web Service tugi, kus frontend ja backend töötavad sama teenuse alt

## Projekti struktuur

```text
src/                  React frontend
src/pages/            Lehed ja adminpaneeli vaated
src/components/       Ühised komponendid
src/lib/api.js        Frontendi API kliendi funktsioonid
server/               Express backend
server/routes/        API, auth ja admin route'id
server/db/services.js SQLite skeem, seed-andmed ja andmebaasi funktsioonid
public/               Staatilised pildid ja avalikud failid
dist/                 Production buildi väljund
```

## Lokaalne käivitus

Paigalda sõltuvused:

```bash
npm install
```

Käivita backend:

```bash
npm run server
```

Käivita frontend teises terminalis:

```bash
npm run dev
```

Lokaalselt avaneb frontend aadressil:

```text
http://localhost:5173
```

Backend töötab vaikimisi aadressil:

```text
http://localhost:4010
```

Vite proxy suunab lokaalses arenduses `/api` päringud backendile.

## Adminpaneel

Adminpaneel asub:

```text
/admin
/admin/hinnakiri
/admin/teenused
```

Lokaalses arenduses kasutatakse vaikimisi:

```text
Kasutajanimi: kristi
Parool: kristi2026
```

## Production build

Buildi frontend:

```bash
npm run build
```

Käivita production server:

```bash
npm start
```

Production server serveerib sama Express teenuse kaudu:

- React buildi `dist` kaustast
- API endpoint'e `/api/...`
- React route'e nagu `/admin`, `/hinnakiri`, `/galerii`

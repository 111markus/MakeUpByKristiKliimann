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

Production keskkonnas peab parool olema seadistatud `ADMIN_PASSWORD_HASH` muutujaga. Kui seda ei ole, tagastab login `500`, sest productionis ei kasutata vaikimisi parooli.

## Keskkonnamuutujad

Olulisemad muutujad:

```text
PORT                 Render määrab selle automaatselt
NODE_ENV             Renderis production
SESSION_SECRET       kohustuslik productionis
ADMIN_USERNAME       admin kasutajanimi, vaikimisi kristi
ADMIN_PASSWORD_HASH  bcrypt hash admin paroolist, kohustuslik productionis
ALLOWED_ORIGINS      lubatud frontend domeenid CORS-i jaoks
DB_PATH              SQLite andmebaasi asukoht
```

Näide lokaalseks `.env` failiks:

```text
SESSION_SECRET=local-dev-secret
ADMIN_USERNAME=kristi
DB_PATH=server/db/database.db
```

Parooli hashi saad genereerida näiteks nii:

```bash
node -e "import('bcryptjs').then(async bcrypt => console.log(await bcrypt.hash('SINU_PAROOL', 12)))"
```

Seejärel pane saadud väärtus Renderis `ADMIN_PASSWORD_HASH` muutujaks.

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

## Render Web Service deploy

Renderis kasuta **Web Service** tüüpi, mitte Static Site tüüpi. Web Service võimaldab sama teenuse alt käivitada nii frontendi kui backendi.

Soovitatavad seaded:

```text
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
Health Check Path: /healthz
```

Renderi environment variables:

```text
NODE_VERSION=22
SESSION_SECRET=pikk-random-secret
ADMIN_USERNAME=kristi
ADMIN_PASSWORD_HASH=<bcrypt hash>
ALLOWED_ORIGINS=https://sinu-service.onrender.com
DB_PATH=/var/data/database.db
```

Kui lisad custom domeeni, lisa see samuti `ALLOWED_ORIGINS` sisse komaga eraldatult:

```text
ALLOWED_ORIGINS=https://sinu-service.onrender.com,https://sinudomeen.ee
```

`VITE_API_BASE_URL` ei ole vaja määrata, kui frontend ja backend töötavad sama Render Web Service'i alt. Sellisel juhul kasutab frontend sama domeeni `/api` päringuid.

## SQLite ja püsiv andmebaas Renderis

Projekt kasutab SQLite andmebaasi. Renderi tavaline failisüsteem on ephemeral, mis tähendab, et failimuudatused võivad deploy või restarti järel kaduda.

Kui adminpaneelis tehtud muudatused peavad püsima, lisa Render Web Service'ile Persistent Disk:

```text
Mount path: /var/data
DB_PATH: /var/data/database.db
```

Ilma persistent diskita võib hinnakirja ja teenuste adminis muudetud sisu kaduda pärast redeploy'd või restarti.

## Kontroll enne commitimist

Enne GitHubi pushimist käivita:

```bash
npm run lint
npm run build
node --check server/app.js
```

Praeguses seisus on need kontrollid läbinud.

## Git ignore

Reposse ei tohiks lisada lokaalseid logisid ega SQLite andmebaasi faile:

```text
*.log
server/db/*.db
server/db/*.db-shm
server/db/*.db-wal
```

Need failid on `.gitignore` all.

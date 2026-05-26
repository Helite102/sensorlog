# SensorLog — App de Sensores Móviles + MongoDB Atlas

## Archivos del proyecto
```
sensorlog/
├── server.js          ← Backend Express + MongoDB
├── package.json       ← Dependencias
├── public/
│   └── index.html     ← App móvil (sensores)
└── README.md
```

## Cómo desplegar en Render.com (GRATIS)

### Paso 1 — Subir a GitHub
1. Crea una cuenta en github.com
2. Crea un repositorio nuevo llamado "sensorlog"
3. Sube estos archivos (arrastra y suelta en GitHub)

### Paso 2 — Crear servicio en Render
1. Ve a render.com → "New +" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Configura:
   - Name: sensorlog
   - Runtime: Node
   - Build Command: npm install
   - Start Command: node server.js

### Paso 3 — Variables de entorno en Render
En la sección "Environment Variables" agrega:

| Key        | Value                                              |
|------------|----------------------------------------------------|
| MONGO_URI  | mongodb+srv://232410952_db_user:zkrTZ6hmYihPapul@TU_CLUSTER.mongodb.net/ |
| DB_NAME    | sensor_db                                          |
| COL_NAME   | lecturas                                           |

⚠️ Reemplaza TU_CLUSTER con el nombre real de tu cluster de Atlas
   (lo encuentras en Atlas → Clusters → Connect → Connection String)

### Paso 4 — Obtener la URL
Render te dará una URL como:
https://sensorlog-xxxx.onrender.com

### Paso 5 — Configurar la App
1. Abre la app en tu celular: https://sensorlog-xxxx.onrender.com
2. Ve a la pestaña ⚙ Config
3. Pega la URL del servidor
4. Escribe el nombre de tu dispositivo
5. ¡Pulsa GUARDAR Y CONECTAR!

## Cómo obtener el Connection String de MongoDB Atlas
1. atlas.mongodb.com → Tu proyecto → Clusters
2. Clic en "Connect" en tu cluster
3. "Connect your application"
4. Copia el string y reemplaza <password> con: zkrTZ6hmYihPapul

## Estructura del documento guardado en MongoDB
```json
{
  "_id": "ObjectId generado por Atlas",
  "timestamp": "2025-05-25T18:30:00.000Z",
  "device": "Mi Celular",
  "gps": {
    "latitud": 20.653408,
    "longitud": -105.220164,
    "altitud": 10.5,
    "precision_m": 15
  },
  "acelerometro": {
    "x": 0.123,
    "y": -9.800,
    "z": 0.456
  },
  "orientacion": {
    "alpha": 180.5,
    "beta": -12.3,
    "gamma": 4.7
  },
  "servidor_ts": "2025-05-25T18:30:00.123Z"
}
```

## Sensores utilizados
1. **GPS (Geolocation API)** — Latitud, Longitud, Altitud, Precisión
2. **Acelerómetro (DeviceMotion API)** — Aceleración en X, Y, Z
3. **Giroscopio/Orientación (DeviceOrientation API)** — Alpha, Beta, Gamma

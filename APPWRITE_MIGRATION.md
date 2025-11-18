# Appwrite Migration Guide

Diese Anleitung hilft dir, deine Daten von der KV-Storage zu Appwrite zu migrieren.

## 📋 Voraussetzungen

1. **Appwrite-Installation**: Du brauchst Zugriff auf deine Appwrite-Instanz unter `https://api.rosenheim-dev.de`
2. **API-Key**: Der API-Key ist bereits in der Anwendung hinterlegt
3. **Database**: Erstelle eine neue Datenbank in Appwrite

## 🗄️ Datenbank-Struktur

### Schritt 1: Datenbank erstellen

1. Logge dich in deine Appwrite-Konsole ein
2. Gehe zu "Databases"
3. Klicke auf "Add Database"
4. Gib einen Namen ein (z.B. "zimmerei_db")
5. **Notiere die Database ID**

### Schritt 2: Collections erstellen

Erstelle die folgenden Collections mit den entsprechenden Attributen:

---

#### Collection 1: `users`

**Attribute:**
- `email` (String, 255 Zeichen, Required)
- `password` (String, 255 Zeichen, Required)

**Permissions:**
- Read: None (nur über API)
- Write: None (nur über API)

---

#### Collection 2: `header_data`

**Attribute:**
- `companyName` (String, 255 Zeichen, Required)
- `logo` (String, 500 Zeichen, Optional)
- `slides` (String, 65535 Zeichen, Required) - Enthält JSON Array

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

**Hinweis:** Das `slides` Attribut speichert ein JSON Array von Slide-Objekten.

---

#### Collection 3: `services`

**Attribute:**
- `icon` (String, 100 Zeichen, Required)
- `title` (String, 255 Zeichen, Required)
- `description` (String, 1000 Zeichen, Required)
- `isActive` (Boolean, Required, Default: true)

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

---

#### Collection 4: `projects`

**Attribute:**
- `title` (String, 255 Zeichen, Required)
- `category` (String, 100 Zeichen, Required)
- `image` (String, 500 Zeichen, Required)
- `description` (String, 1000 Zeichen, Required)
- `isActive` (Boolean, Required, Default: true)

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

---

#### Collection 5: `references`

**Attribute:**
- `title` (String, 255 Zeichen, Required)
- `category` (String, 100 Zeichen, Required)
- `image` (String, 500 Zeichen, Required)
- `description` (String, 1000 Zeichen, Required)
- `isActive` (Boolean, Required, Default: true)

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

---

#### Collection 6: `contact_submissions`

**Attribute:**
- `name` (String, 255 Zeichen, Required)
- `email` (String, 255 Zeichen, Required)
- `phone` (String, 50 Zeichen, Optional)
- `message` (String, 5000 Zeichen, Required)
- `timestamp` (Integer, Required)

**Permissions:**
- Read: None (nur über API)
- Write: Role: All (damit Kontaktformular funktioniert)

---

#### Collection 7: `about_features`

**Attribute:**
- `icon` (String, 100 Zeichen, Required)
- `title` (String, 255 Zeichen, Required)
- `description` (String, 1000 Zeichen, Required)

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

---

#### Collection 8: `about_content`

**Attribute:**
- `heading` (String, 255 Zeichen, Required)
- `paragraphs` (String, 65535 Zeichen, Required) - Enthält JSON Array
- `badges` (String, 5000 Zeichen, Required) - Enthält JSON Array

**Permissions:**
- Read: Role: All
- Write: None (nur über API)

---

## 🚀 Migration durchführen

### Schritt 1: Collection IDs notieren

Nach dem Erstellen jeder Collection notiere dir die **Collection ID** (findest du in den Collection-Einstellungen).

### Schritt 2: Migrations-Tool öffnen

1. Logge dich in den Admin-Bereich deiner Website ein
2. Klicke auf "Appwrite Migration"

### Schritt 3: IDs eingeben

Trage folgende Werte ein:
- **Database ID**: Die ID deiner erstellten Datenbank
- Alle **Collection IDs** für die entsprechenden Collections

### Schritt 4: Migration starten

1. Klicke auf "Migration starten"
2. Warte, bis alle Daten migriert wurden
3. Überprüfe den Status jeder Collection

## ✅ Nach der Migration

### Daten überprüfen

1. Öffne die Appwrite-Konsole
2. Navigiere zu deiner Datenbank
3. Überprüfe jede Collection:
   - Sind alle Dokumente vorhanden?
   - Sind die Daten korrekt?

### Typische Datenmengen

- **users**: 1 Dokument (dein Admin-Konto)
- **header_data**: 1 Dokument (mit Slides-Array)
- **services**: Variable Anzahl (deine Leistungen)
- **projects**: Variable Anzahl (deine Projekte)
- **references**: Variable Anzahl (deine Referenzen)
- **contact_submissions**: Variable Anzahl (eingegangene Anfragen)
- **about_features**: Variable Anzahl (Über-uns Features)
- **about_content**: 1 Dokument (mit Paragraphs und Badges)

## 🔧 Fehlerbehebung

### Fehler: "Failed to create document"

**Mögliche Ursachen:**
1. Falsche Database ID oder Collection ID
2. Fehlende Attribute in der Collection
3. API-Key hat keine ausreichenden Rechte

**Lösung:**
- Überprüfe alle IDs
- Stelle sicher, dass alle Attribute korrekt angelegt sind
- Überprüfe die API-Key Permissions in Appwrite

### Fehler: "Invalid data format"

**Mögliche Ursache:**
- Datentyp-Mismatch zwischen KV-Storage und Appwrite

**Lösung:**
- Überprüfe, ob alle String-Felder lang genug sind (besonders `description`, `slides`, `paragraphs`)

## 📊 Datenstruktur-Beispiele

### header_data.slides (JSON String)
```json
[
  {
    "id": "1",
    "image": "https://...",
    "title": "Titel",
    "subtitle": "Untertitel"
  }
]
```

### about_content.paragraphs (JSON String)
```json
["Erster Absatz", "Zweiter Absatz", "Dritter Absatz"]
```

### about_content.badges (JSON String)
```json
["Meisterbetrieb", "TÜV-geprüft", "Versichert"]
```

## 🔐 Sicherheit

**Wichtig:**
- Der API-Key ist direkt im Code hinterlegt - dies ist nur für den Migrations-Prozess gedacht
- Nach der Migration solltest du eine sichere Backend-Lösung implementieren
- Für Produktiv-Umgebungen: API-Key als Umgebungsvariable speichern

## 📞 Support

Bei Problemen oder Fragen:
1. Überprüfe die Appwrite-Logs in der Konsole
2. Überprüfe die Browser-Konsole auf Fehler
3. Stelle sicher, dass alle Permissions korrekt gesetzt sind

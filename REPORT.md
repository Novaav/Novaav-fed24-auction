# 📌 Rättningsrapport – fed24s-the-auction-grupp-4-api

## 🎯 Uppgiftens Krav:
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/keCtEfOe)
# Gruppuppgift - Chatapplikation

Ni skall skapa en auktion-applikation med hjälp av websockets. En användare skall kunna registrera sig på sidan och sedan kunna skapa en (eller flera) auktion(er). En auktion är en sida som använder sig av websockets för att skicka bud och hålla reda på när auktionen går ut. 

En användare måste vara inloggad för att kunna använda någon del av systemet.

## Api:t

Ni skall bygga ett api med hjälp av node.js och express. Denna gång skall ni implementera websocket för att skapa en realtidskommunikation mellan servern och klienten. 

Api:t skall ta emot anrop för att skapa en auktion och kunna ta emot bud samt hålla reda på när auktionen är slut och vem som vann.  

En användare skall kunna logga in. Detta betyder att ni behöver lagra användare i databasen så att ni kan slå upp dessa och logga in vid behov. 

Ni behöver även kunna registrera användare. 

## Klienten

Det finns ett projekt för er frontend i denna mall. Ni behöver göra det minsta möjliga i detta projekt för att få er auktions-site att fungera. 

Klienten behöver även ha funktioner för att registrera användare och logga in användare. 

## Betyg G

- Ett api med node.js och express
- Websockets är implementerat
- Bra kodstruktur för websockets
- Hantering av rum för websockets
- En användare kan skapa en auktion
- En användare kan lägga bud på en auktion (inte sin egen dock)
- En användare kan se information om pågående auktion genom att gå in på auktions-sidan.
- Inloggning av användare (cookies)
- Registering av användare


## 🔍 ESLint-varningar:
- C:\Work\AssignmentCorrector\backend\repos\fed24s-the-auction-grupp-4-api\frontend\src\auction.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.,no-console - Unexpected console statement.
- C:\Work\AssignmentCorrector\backend\repos\fed24s-the-auction-grupp-4-api\frontend\src\register.ts - no-console - Unexpected console statement.
- C:\Work\AssignmentCorrector\backend\repos\fed24s-the-auction-grupp-4-api\frontend\src\sockets\auctionSockets.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.,no-console - Unexpected console statement.,no-console - Unexpected console statement.,no-console - Unexpected console statement.
- C:\Work\AssignmentCorrector\backend\repos\fed24s-the-auction-grupp-4-api\frontend\src\sockets\sockethelpers.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.,no-console - Unexpected console statement.

## 🏆 **Betyg: G**
📌 **Motivering:** Koden uppfyller de flesta krav för betyget G: en backend byggd med Node.js och Express, användning av Websockets, förmågan att hantera rum för Websockets, auktioner kan skapas och bud kan läggas (inte på ens egen auktion), samt hantering av inloggning och registrering av användare finns. Appen använder cookies för att hantera sessioner. Koden saknar dock delvis kommentering och vissa delar kan förbättras i struktur och underhållbarhet.

💡 **Förbättringsförslag:**  
Se till att alla delar av koden har kommentarer för att förklara syftet och funktionaliteten. Detta gör det lättare för andra (och framtiden du) att förstå vad varje del av koden gör. Förbättra också felhanteringen för att ge mer detaljerade felmeddelanden till användaren. Slutligen, överväg att refaktorera vissa delar av koden som checkAuctionStatus och checkAuctionWinner för att förbättra läsbarhet och återanvändbarhet.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| CJVIK | 32 | 36.4% | 0.25 | 0.3 |
| Elias Murray | 31 | 35.2% | 0.25 | 0.29 |
| Amir1235 | 23 | 26.1% | 0.25 | 0.25 |
| Nova | 2 | 2.3% | 0.25 | 0.16 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)

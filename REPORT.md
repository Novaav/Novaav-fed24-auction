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
📌 **Motivering:** Koden uppfyller alla grundläggande krav: ett API med node.js och express, implementering av websockets, hantering av rum för websockets, och funktionalitet för skapande av auktioner och budgivning samt inloggning och registrering av användare. Koden har en bra struktur och visar förståelse för realtidskommunikation.

💡 **Förbättringsförslag:**  
Koden skulle kunna förbättras genom att lägga till mer omfattande felhantering och loggning i hela applikationen. Detta skulle hjälpa vid felsökning och användarsupport. Dessutom kan säkerheten förbättras, t.ex. genom användning av miljövariabler för hemligheter (som JWT-hemligheten) och genom att striktare hantera socket-anslutningar och autentisering. Dokumentation av kod och enhetstester skulle också förbättra kodens kvalitet och underlätta framtida underhåll.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| CJVIK | 32 | 36% | 0.2 | 0.26 |
| Elias Murray | 31 | 34.8% | 0.2 | 0.26 |
| Amir1235 | 23 | 25.8% | 0.2 | 0.22 |
| Nova | 2 | 2.2% | 0.2 | 0.13 |
| assignment-corrector[bot] | 1 | 1.1% | 0.2 | 0.12 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)

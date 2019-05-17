# TSH - test
## Treść zadania

1. Na podstawie plików graficznych Listing.psd i Listing.png przygotuj projekt HTML5 z wykorzystaniem RWD (Responsive Web Design).
Strona powinna wyświetlać się poprawnie we wszystkich najpopularniejszych przeglądarkach.
Użyty font 'Source Sans Pro' jest dostępny w sieci.

UWAGA: Odwzorowanie grafiki 1:1 jest wymaganiem podstawowym. Bez spełnienia tego wymogu zadanie nie będzie sprawdzane.

2. Utwórz działającą paginację - po kliknięciu linków dodaj akcję załadowania danych z pliku page1.json oraz page2.json

3. Po kliknięciu w wyświetlony wiersz powinien pojawić się popup ze szczegółowymi informacjami na temat wpisu. Nie wykonaliśmy projektu graficznego modalnego okna, pozostawiamy to Tobie.

4. Wykonany projekt wstaw na github lub inne repozytorium Git.

## Rozpoczęcie pracy w projekcie
Instalacja niezbędnych pakietów po sklonowaniu repod do lokalnego folderu:
``` 
npm install
```
***
1. Uruchomienie środowiska developerskiego
```
npm run start
```
***
2. Przygotowanie paczki produkcyjnej
``` 
npm run build-prod
```
***
3. Uruchomienie projektu w środowisku produkcyjnym. 
Ze względu na zabezpieczenie CORS w przeglądarce Chrome i Safari pliki z danymi załadują się prawidłowo tylo po uruchomienu serwera. 
```
npm run start-prod
```
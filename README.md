# Приклад геокодування адрес

Драфт скрипту який робить геокодування адрес на основі CSV файлу.

Приклад з геокодованими адресами:

- [Raw CSV](https://raw.githubusercontent.com/volodymyr-malishevskyi/geocode-example/refs/heads/main/addresses_geocoded.csv)
- [Tably](https://tably.com/n5trxmbeb1n7212uhiskag1c1i)

## Запуск

Потребує встановлений Docker.

Для початку необхідно запустити Nominatim за допомогою скрипту [run-nominatim.sh](run-nominatim.sh) та дочекатись повного завантаження геоданих по Україні (~720MB + певний час на індексацію, орієнтовно 15хв):

```bash
# Запуск Nominatim
./run-nominatim.sh
```

Далі можна перейти до запуску скрипту:

```bash
# Встановлення залежностей
npm i

# Запуск скрипту
node index.js
```

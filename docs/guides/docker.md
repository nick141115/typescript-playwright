# Docker

Создаем образ для автоматического тестирования:

```sh
docker build -t rw_build_01 .
```

Поместите файл сертификата *ca-certificates.crt* внутрь *./certs/ca-certificates.crt* (для *tests/e2e* для получения SSL-соединения)

Запустите готовый образ с тестами:

```sh
docker run --rm -v $(pwd)\certs\ca-certificates.crt:/etc/ssl/certs/ca-certificates.crt rw_build_01
```

В docker-контейнере есть возможность запускать автотесты в разных браузерах.

Доступны следующие браузеры:
- Chromium;
- Firefox;
- Webkit;

Запуск в браузере Chromium:

```sh
docker run --rm -e BROWSER=chromium -e ENGINE=chromium rw_build_01
```

Запуск в браузере Firefox:

```sh
docker run --rm -e BROWSER=firefox -e ENGINE=firefox rw_build_01
```

Запуск в браузере Webkit:

```sh
docker run --rm -e BROWSER=webkit -e ENGINE=webkit rw_build_01
```

Запуск с измененным числом (например, 2) повторных запусков неудачного автотеста:

```sh
docker run --rm -e RERUN_NUMBER=2 rw_build_01
```

Запуск с измененным числом (например, 3) рабочих элементов для автотестирования (для параллельного запуска):

```sh
docker run --rm -e NUM_GW=3 rw_build_01
```

---

- [Назад (Соглашения)](../getting_started/agreements.md)
- [Далее (Установка Git)](git.md)
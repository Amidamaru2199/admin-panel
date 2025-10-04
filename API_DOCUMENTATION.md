# API Документация

## Telegram API (`/tg`)

### POST `/tg/start`
Регистрация нового пользователя через Telegram бота

**Пример запроса:**
```bash
POST /tg/start
Content-Type: application/json
```

**Body запроса:**
```json
{
  "update_id": 123456789,
  "message": {
    "message_id": 1,
    "from": {
      "id": 123456789,
      "is_bot": false,
      "first_name": "Иван",
      "last_name": "Иванов",
      "username": "ivanov"
    },
    "chat": {
      "id": 123456789,
      "type": "private",
      "username": "ivanov"
    },
    "text": "/start utm=promo_code"
  }
}
```

**Body ответа:**
```
HTTP/1.1 200 OK
```

---

### POST `/tg/send`
Рассылка сообщений пользователям с возможностью фильтрации

**Пример запроса:**
```bash
POST /tg/send?tgID=123456789&tariff=1&offset=0&limit=100
Content-Type: multipart/form-data
```

**Query параметры:**
- `tgID` (опционально) - Telegram ID пользователя
- `username` (опционально) - username пользователя
- `tariff` (опционально) - ID тарифа
- `regMinDate` (опционально) - минимальная дата регистрации (формат: 2006-01-02)
- `regMaxDate` (опционально) - максимальная дата регистрации (формат: 2006-01-02)
- `subMinDate` (опционально) - минимальная дата подписки (формат: 2006-01-02)
- `subMaxDate` (опционально) - максимальная дата подписки (формат: 2006-01-02)
- `offset` (опционально) - смещение для пагинации
- `limit` (опционально) - лимит записей

**Form Data:**
- `message` - текст сообщения для рассылки
- `image` (опционально) - изображение для отправки

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

рассылка начата
```

---

## Payment API (`/payment`)

### POST `/payment/create`
Создание нового платежа

**Пример запроса:**
```bash
POST /payment/create
Content-Type: application/json
```

**Body запроса:**
```json
{
  "tariff_id": 1,
  "telegram_id": 123456789
}
```

**Body ответа:**
```json
{
  "платежная информация": {
    "id": "2d96f3d4-000f-5000-9000-16c66a5e1234",
    "status": "pending",
    "amount": {
      "value": "199.00",
      "currency": "RUB"
    },
    "description": "Оплата подписки на 30 дней",
    "created_at": "2023-10-03T12:00:00.000Z",
    "confirmation": {
      "type": "redirect",
      "confirmation_url": "https://yoomoney.ru/checkout/payments/v2/contract?orderId=2d96f3d4-000f-5000-9000-16c66a5e1234"
    }
  }
}
```

---

### POST `/payment/webhook`
Обработка webhook от ЮKassa (только с разрешенных IP адресов)

**Пример запроса:**
```bash
POST /payment/webhook
Content-Type: application/json
```

**Body запроса:**
```json
{
  "type": "notification",
  "event": "payment.succeeded",
  "object": {
    "id": "2d96f3d4-000f-5000-9000-16c66a5e1234",
    "status": "succeeded",
    "amount": {
      "value": "199.00",
      "currency": "RUB"
    },
    "payment_method": {
      "type": "bank_card",
      "id": "2d96f3d4-000f-5000-9000-16c66a5e5678",
      "saved": true
    },
    "save_payment_method": true,
    "metadata": {
      "telegram_id": "123456789",
      "tariff_id": "1"
    }
  }
}
```

**Body ответа:**
```
HTTP/1.1 200 OK
```

---

## Keys API (`/key`)

### GET `/key/all/:tg_id`
Получение всех ключей пользователя со всех серверов

**Пример запроса:**
```bash
GET /key/all/123456789
```

**URL параметры:**
- `tg_id` - Telegram ID пользователя

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

vless://uuid1@server1.example.com:443?type=tcp&security=reality&pbk=publickey1&sid=shortid1#Server1
vless://uuid1@server2.example.com:443?type=tcp&security=reality&pbk=publickey2&sid=shortid2#Server2
```

---

### GET `/key/main/:tg_id`
Получение ключей с основных серверов пользователя

**Пример запроса:**
```bash
GET /key/main/123456789
```

**URL параметры:**
- `tg_id` - Telegram ID пользователя

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

vless://uuid1@mainserver1.example.com:443?type=tcp&security=reality&pbk=publickey1&sid=shortid1#MainServer1
vless://uuid1@mainserver2.example.com:443?type=tcp&security=reality&pbk=publickey2&sid=shortid2#MainServer2
```

---

## User API (`/user`)

### GET `/user/:tg_id`
Получение пользователя по Telegram ID

**Пример запроса:**
```bash
GET /user/123456789
```

**URL параметры:**
- `tg_id` - Telegram ID пользователя

**Body ответа:**
```json
{
  "юзер": {
    "id": 1,
    "tg_id": 123456789,
    "subscription": "2024-11-03T12:00:00Z",
    "username": "ivanov",
    "full_name": "Иван Иванов",
    "parent_id": 0,
    "tariff_id": 1,
    "server_id": 0,
    "is_active": true,
    "is_trial": false,
    "is_superuser": false,
    "is_verified": false,
    "registered_at": "2023-10-03T12:00:00Z",
    "balance": 0,
    "email": "",
    "main_servers": [1, 2, 3, 4, 5]
  }
}
```

---

### PUT `/user/sub/:tg_id`
Продление подписки пользователя

**Пример запроса:**
```bash
PUT /user/sub/123456789?sub=30
```

**URL параметры:**
- `tg_id` - Telegram ID пользователя

**Query параметры:**
- `sub` - количество дней для продления

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

продление подписки прошло успешно
```

---

### PUT `/user/keys/:tg_id`
Обновление основных серверов пользователя

**Пример запроса:**
```bash
PUT /user/keys/:tg_id
Content-Type: application/json
```

**URL параметры:**
- `tg_id` - Telegram ID пользователя

**Body запроса:**
```json
{
  "tgID": 123456789,
  "main_servers": [1, 2, 3, 4, 5, 6, 7, 8]
}
```

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

обновление мэин серверов успешно завершено
```

---

### GET `/user/all`
Получение всех пользователей с фильтрацией

**Пример запроса:**
```bash
GET /user/all?offset=0&limit=50&tariff=1
```

**Query параметры:**
- `tgID` (опционально) - Telegram ID пользователя
- `username` (опционально) - username пользователя
- `tariff` (опционально) - ID тарифа
- `regMinDate` (опционально) - минимальная дата регистрации (формат: 2006-01-02)
- `regMaxDate` (опционально) - максимальная дата регистрации (формат: 2006-01-02)
- `subMinDate` (опционально) - минимальная дата подписки (формат: 2006-01-02)
- `subMaxDate` (опционально) - максимальная дата подписки (формат: 2006-01-02)
- `offset` (опционально) - смещение для пагинации
- `limit` (опционально) - лимит записей

**Body ответа:**
```json
{
  "юзеры": [
    {
      "id": 1,
      "tg_id": 123456789,
      "subscription": "2024-11-03T12:00:00Z",
      "username": "ivanov",
      "full_name": "Иван Иванов",
      "parent_id": 0,
      "tariff_id": 1,
      "server_id": 0,
      "is_active": true,
      "is_trial": false,
      "is_superuser": false,
      "is_verified": false,
      "registered_at": "2023-10-03T12:00:00Z",
      "balance": 0,
      "email": "",
      "main_servers": [1, 2, 3]
    }
  ]
}
```

---

### GET `/user/count`
Получение статистики пользователей для дашборда

**Пример запроса:**
```bash
GET /user/count
```

**Body ответа:**
```json
{
  "user_count": 1500,
  "user_count_reg_today": 25,
  "user_count_with_auto_pay": 450,
  "user_count_with_subscription": 1200
}
```

---

## Tariff API (`/tariff`)

### POST `/tariff`
Создание нового тарифа

**Пример запроса:**
```bash
POST /tariff
Content-Type: application/json
```

**Body запроса:**
```json
{
  "name": "Месячная подписка",
  "price": "199.00",
  "days": 30,
  "description": "Подписка на 1 месяц",
  "is_hidden": false
}
```

**Body ответа:**
```
HTTP/1.1 201 Created
Content-Type: text/plain

новый тариф успешно добавлен
```

---

### GET `/tariff/:id`
Получение тарифа по ID

**Пример запроса:**
```bash
GET /tariff/1
```

**URL параметры:**
- `id` - ID тарифа

**Body ответа:**
```json
{
  "тариф": {
    "id": 1,
    "name": "Месячная подписка",
    "price": "199.00",
    "days": 30,
    "description": "Подписка на 1 месяц",
    "is_hidden": false
  }
}
```

---

### DELETE `/tariff/:id`
Удаление тарифа по ID

**Пример запроса:**
```bash
DELETE /tariff/1
```

**URL параметры:**
- `id` - ID тарифа

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

тариф успешно удален
```

---

### GET `/tariff/all`
Получение всех тарифов

**Пример запроса:**
```bash
GET /tariff/all
```

**Body ответа:**
```json
{
  "тарифы": [
    {
      "id": 1,
      "name": "Месячная подписка",
      "price": "199.00",
      "days": 30,
      "description": "Подписка на 1 месяц",
      "is_hidden": false
    },
    {
      "id": 2,
      "name": "Годовая подписка",
      "price": "1990.00",
      "days": 365,
      "description": "Подписка на 1 год",
      "is_hidden": false
    }
  ]
}
```

---

## Server API (`/server`)

### POST `/server`
Создание нового сервера

**Пример запроса:**
```bash
POST /server
Content-Type: application/json
```

**Body запроса:**
```json
{
  "name": "Server Netherlands 1",
  "ip": "192.168.1.100",
  "port_panel": "2053",
  "port_key": "443",
  "short_id": "abcd1234",
  "public_key": "publickey1234567890",
  "vless_inbound_id": 1,
  "password": "admin_password",
  "uri_path": "/unique-path",
  "is_active": true,
  "description": "Основной сервер в Нидерландах",
  "user_count": 0,
  "cookie": "session=",
  "code": "NL",
  "is_excluded": false,
  "weight": 10.0,
  "country": "Netherlands",
  "info": "Сервер для европейских пользователей"
}
```

**Body ответа:**
```
HTTP/1.1 201 Created
Content-Type: text/plain

новый сервер успешно добавлен
```

---

### GET `/server/all`
Получение всех серверов

**Пример запроса:**
```bash
GET /server/all
```

**Body ответа:**
```json
{
  "сервера": [
    {
      "id": 1,
      "name": "Server Netherlands 1",
      "ip": "192.168.1.100",
      "port_panel": "2053",
      "port_key": "443",
      "short_id": "abcd1234",
      "public_key": "publickey1234567890",
      "vless_inbound_id": 1,
      "password": "admin_password",
      "uri_path": "/unique-path",
      "is_active": true,
      "description": "Основной сервер в Нидерландах",
      "user_count": 150,
      "cookie": "session=xyz123",
      "code": "NL",
      "is_excluded": false,
      "weight": 10.0,
      "country": "Netherlands",
      "info": "Сервер для европейских пользователей"
    }
  ]
}
```

---

### GET `/server/cookies`
Обновление и получение cookies со всех серверов

**Пример запроса:**
```bash
GET /server/cookies
```

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

cookie: [session=xyz123 session=abc456 session=def789]
```

---

### PUT `/server/:id`
Обновление сервера по ID

**Пример запроса:**
```bash
PUT /server/1
Content-Type: application/json
```

**URL параметры:**
- `id` - ID сервера

**Body запроса (все поля опциональны):**
```json
{
  "name": "Server Netherlands 1 Updated",
  "is_active": true,
  "description": "Обновленное описание сервера",
  "weight": 15.0,
  "info": "Новая информация о сервере"
}
```

**Body ответа:**
```
HTTP/1.1 200 OK
Content-Type: text/plain

сервер успешно обновлен
```

---

## Коды ошибок

### 400 Bad Request
Неверный формат данных или недопустимые значения

### 401 Unauthorized
Требуется аутентификация

### 404 Not Found
Запрашиваемый ресурс не найден

### 500 Internal Server Error
Внутренняя ошибка сервера или проблемы с доступом к БД


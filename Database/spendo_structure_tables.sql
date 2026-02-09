users
-----------------------------------
user_id        UUID (PK)
full_name      VARCHAR(150)
email          VARCHAR(150) UNIQUE
password       VARCHAR(255)
created_at     TIMESTAMP
updated_at     TIMESTAMP


currencies
-----------------------------------
code_currency  CHAR(3) (PK)
currency       VARCHAR(50)


accounts
-----------------------------------
account_id     UUID (PK)
user_id        UUID (FK → users)
code_currency  CHAR(3) (FK → currencies)
name           VARCHAR(100)
type           ENUM(bank, cash, wallet, crypto)
balance        DECIMAL(15,2)
color          VARCHAR(20)
created_at     TIMESTAMP
updated_at     TIMESTAMP


categories
-----------------------------------
category_id    UUID (PK)
user_id        UUID (FK → users)
name           VARCHAR(100)
type           ENUM(income, expense)
icon           VARCHAR(50)
created_at     TIMESTAMP
updated_at     TIMESTAMP


transactions
-----------------------------------
transaction_id UUID (PK)
user_id        UUID (FK → users)
account_id     UUID (FK → accounts)
category_id    UUID (FK → categories)
amount         DECIMAL(15,2)
description    TEXT
date           TIMESTAMP
type           ENUM(income, expense)
created_at     TIMESTAMP
updated_at     TIMESTAMP
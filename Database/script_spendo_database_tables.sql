create database spendo;

use spendo;

create table users(
	idUser int primary key,
    username varchar(50) not null,
    passwordUser varchar(50) not null,
    codeAccess varchar(15) not null
);

create table locations(
	idLocal int primary key,
    location varchar(25) not null
);

create table typeFlows(
	idType int primary key,
    flow varchar(50) not null
);

create table categories(
	idCategory int primary key,
    category varchar(50) not null
);

create table currencies(
	codeCurrency varchar(5) primary key,
    currency varchar(30) not null,
    priceMexican_pesos float not null,
    symbol varchar(20)
);

create table budgets(
	idBudget int primary key,
    idUser int not null,
    codeCurrency varchar(5) not null,
    mountGoal float not null,
    dateGoal datetime not null,
    status boolean not null,
	foreign key (idUser) references users(idUser),
    foreign key (codeCurrency) references currencies(codeCurrency)
);

create table transactions(
	idTransaction int primary key,
    idType int not null,
    idUser int not null,
    idLocal int not null,
    codeCurrency varchar(5) not null,
    idCategory int not null,
    mount float not null,
    dateTransaction datetime not null,
	foreign key (idType) references typeFlows(idType),
	foreign key (idUser) references users(idUser),
	foreign key (idLocal) references locations(idLocal),
	foreign key (codeCurrency) references currencies(codeCurrency),
    foreign key (idCategory) references categories(idCategory)
);
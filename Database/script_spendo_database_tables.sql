create database spendo;

use spendo;

create table users(
	id_user int primary key auto_increment,
    username varchar(50) not null,
    password_user varchar(50) not null,
    codeAccess varchar(15) not null
);

create table locations(
	id_local int primary key auto_increment,
    location varchar(25) not null
);

create table typeFlows(
	id_type int primary key auto_increment,
    flow varchar(50) not null
);

create table categories(
	id_category int primary key auto_increment,
    category varchar(50) not null
);

create table currencies(
	code_currency varchar(5) primary key,
    currency varchar(30) not null,
    price_mexican_pesos float not null,
    symbol varchar(20)
);


create table budgets(
	id_budget int primary key auto_increment,
    id_user int not null,
    code_currency varchar(5) not null,
    mount_goal float not null,
    date_goal datetime not null,
    status boolean not null,
	foreign key (id_user) references users(id_user),
    foreign key (code_currency) references currencies(code_currency)
);

create table transactions(
	id_transaction int primary key auto_increment,
    id_type int not null,
    id_user int not null,
    id_local int not null,
    code_currency varchar(5) not null,
    id_category int not null,
    mount float not null,
    date_transaction datetime not null,
	foreign key (id_type) references typeFlows(id_type),
	foreign key (id_user) references users(id_user),
	foreign key (id_local) references locations(id_local),
	foreign key (code_currency) references currencies(code_currency),
    foreign key (id_category) references categories(id_category)
);

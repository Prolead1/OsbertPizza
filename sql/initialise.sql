use f32ee;
create table logins
(   userid bigint unsigned not null auto_increment primary key,
    username varchar(255) not null,
    password varchar(255) not null    
);

create table menuitems
(
    menuid bigint unsigned not null auto_increment primary key,
    category int not null,
    name varchar(255) not null,
    image varchar(500) not null,
    description mediumtext not null,
    price float not null
);

create table payments
(
    paymentid bigint unsigned not null primary key,
    userid bigint unsigned not null,
    cardname varchar(255) not null,
    cardnumber int(16) not null,
    cardexpiry varchar(7) not null,
    cvv int(3) not null
);

create table orders
(
    paymentid bigint unsigned not null primary key,
    orders varchar(500) not null,
    userid bigint unsigned not null,
    location varchar(255) not null,
    status varchar(255) not null
);

create table feedbacks
(
    feedbackid bigint unsigned not null auto_increment primary key,
    rating int not null,
    food mediumtext not null,
    delivery mediumtext not null
);

insert into menuitems values
    (NULL, 0, "Cheese Pizza Promotion", "./assets/cheese.jpg", "Get this cheese pizza, now on sale", 12.99),
    (NULL, 1, "Cheese Pizza", "./assets/cheese.jpg", "Crust, tomato, cheese, and toppings", 22.99),
    (NULL, 1, "Pepperoni Pizza", "./assets/pepperoni.jpg", "Freshly baked pepperoni pizza", 28.99),
    (NULL, 2, "Cheese Pizza Meal", "./assets/cheese.jpg", "This pizza comes with one side and drink", 25.99),
    (NULL, 2, "Pepperoni Pizza Meal", "./assets/pepperoni.jpg", "This pizza comes with one side and drink", 32.99),
    (NULL, 3, "Garlic Bread", "./assets/bread.jpg", "A garlic bread", 5.99),
    (NULL, 4, "Coke", "./assets/coke.jpg", "A 320ml Coca-Cola can", 1.99),
    (NULL, 4, "Sprite", "./assets/sprite.jpg", "A 320ml Sprite can", 1.99);

insert into logins values
    (NULL, "admin@admin.com", "Himynameisadmin1");
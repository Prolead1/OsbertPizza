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
    description varchar(5000) not null,
    price float not null
);

insert into menuitems values
    (NULL, 0, "Cheese Pizza Promotion", "./assets/cheese.jpg", "This is a cheese pizza on sale", 12.99),
    (NULL, 1, "Cheese Pizza", "./assets/cheese.jpg", "This is a cheese pizza", 22.99),
    (NULL, 2, "Cheese Pizza Meal", "./assets/cheese.jpg", "This is a cheese pizza meal with one side and drink", 25.99),
    (NULL, 3, "Garlic Bread", "./assets/bread.jpg", "This is a garlic bread", 5.99),
    (NULL, 4, "Coke", "./assets/coke.jpg", "This is a 320ml coke can", 1.99);
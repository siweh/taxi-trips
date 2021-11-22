create table routes(
    id serial not null primary key,
    route_name varchar not null,
    fare int not null
);

create table region(
    id serial not null primary key,
    region_name varchar not null
);

create table taxi(
    id serial not null primary key,
    reg_number varchar not null unique,
    region_id int,
    foreign key (region_id) references region(id)
);

create table trips(
    id serial not null primary key,
    taxi_id int,
    route_id int,
    foreign key (taxi_id) references taxi(id),
    foreign key (route_id) references routes(id)
);


insert into region(id, region_name) values (1, 'Durban');
insert into region(id, region_name) values (2, 'Cape Town');
insert into region(id, region_name) values (3, 'Gauteng');

insert into routes(route_name, fare) values('N1', 35);
insert into routes(route_name, fare) values('N12', 45);
insert into routes(route_name, fare) values('R56', 15);

insert into taxi(reg_number, region_id) values ('12', 1);
insert into taxi(reg_number, region_id) values ('12', 2);
insert into taxi(reg_number, region_id) values ('21', 3);

delete from taxi;

insert into taxi(reg_number, region_id) values ('DB12345', 1);
insert into taxi(reg_number, region_id) values ('CA19785', 2);
insert into taxi(reg_number, region_id) values ('GP32456', 3);



insert into trips(taxi_id, route_id) values(4, 1);
insert into trips(taxi_id, route_id) values(5, 1);
insert into trips(taxi_id, route_id) values(5, 2);
insert into trips(taxi_id, route_id) values(4, 2);
insert into trips(taxi_id, route_id) values(6, 3);
insert into trips(taxi_id, route_id) values(6, 3);
insert into trips(taxi_id, route_id) values(5, 1);

-- select * from taxi
-- join region on taxi.region_id = region.id
-- where region.region_name = 'Gauteng';

-- select * from trips
-- join taxi on trips.taxi_id = taxi.id
-- where taxi.reg_number = 'DB12345';

-- select * from trips



select * from trips
join taxi on trips.taxi_id = taxi.id
join region on taxi.region_id = region.id
where region.region_name = 'Cape Town';
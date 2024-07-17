use sebas;
select * from deleteme;
create table usuarios(id int primary key auto_increment,usuario varchar(50),contrasena varchar(50),tipo int);
select * from usuarios;
drop table usuarios;


create table personal(id int primary key auto_increment,nombre varchar(50),apellido1 varchar(50),
apellido2 varchar(50),puesto varchar(50),cedula varchar(50));

show tables;

create table bitacora(id int primary key auto_increment,ingreso varchar(50), hora varchar(50), 
fecha date, usuario varchar(50),intentos int);

insert into usuarios(usuario,contrasena,tipo) values ("sbtl","12345",1);
insert into usuarios(usuario,contrasena,tipo) values ("sidar","12345",2);

create table inventario(id int primary key auto_increment, sandalias int, talla varchar(15),
 precio_compra int, precio_venta int, zapatos int, botas int);
 
 create table ventas(id int primary key auto_increment,articulo varchar(50), fecha date,
 metodo_pago varchar(50),precio varchar(50),cajero varchar(50), moneda varchar(50), total int);
 
 create table compras(id int primary key auto_increment, articulo varchar(50), cantidad int, precio_compra int, fecha date, talla varchar(15));
 
 create table informe(id int primary key auto_increment, efectivo int, boucher int, ventas_dia int, metodos_pago varchar(50));
 
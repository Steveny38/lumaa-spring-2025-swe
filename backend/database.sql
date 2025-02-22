create table Users(
id uuid primary key default gen_random_uuid(),
username text unique not null,
password text not null
);

create table Tasks(
id uuid primary key default gen_random_uuid(),
title text not null,
description text not null default '' ,
isComplete boolean default false,
userID uuid,
foreign key (userID) references Users(id)
);


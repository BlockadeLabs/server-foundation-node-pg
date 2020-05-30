-- First create user and password
CREATE USER db_user SUPERUSER;
ALTER USER db_user WITH PASSWORD 'password';

-- Now create database
CREATE DATABASE "db" WITH OWNER db_user;
GRANT ALL PRIVILEGES ON DATABASE "db" TO db_user;

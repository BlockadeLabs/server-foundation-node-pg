-- First create user and password
CREATE USER postgres SUPERUSER;
ALTER USER postgres WITH PASSWORD 'password';

-- Now create database
CREATE DATABASE "postgres" WITH OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE "postgres" TO postgres;

CREATE DATABASE testyourluckdb;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    user_pass VARCHAR(255),
    score INT
);


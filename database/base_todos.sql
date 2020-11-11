CREATE DATABASE fullstacktodo;

\c fullstacktodo;

CREATE TABLE Todos (
  TodoId SERIAL PRIMARY KEY,
  Title varchar(400),
  IsComplete BOOLEAN,
  Something varchar(400),
  Username varchar(400)
);
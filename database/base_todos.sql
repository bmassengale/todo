CREATE DATABASE fullstacktodo;

\c fullstacktodo;

CREATE TABLE Todos (
  TodoId SERIAL PRIMARY KEY,
  Title varchar(400),
  IsComplete BOOLEAN,
  Something varchar(400)
);

INSERT INTO todos (title, iscomplete, something) VALUES ('Eat lunch', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Call Grandmother to ask for skydiving instructions', false, NULL);
INSERT INTO todos (title, iscomplete, something) VALUES ('Email Johnny about that one thing', true, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Order Amazon package', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Finish algebra homework', true, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Take cans to recycling facility', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Cancel doctor''s appointment', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Take over the world', true, NULL);
INSERT INTO todos (title, iscomplete, something) VALUES ('Train Fido to fetch', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Deliver pizza', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Post a new todo', true, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Figure out what section does', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Make new todo', false, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Camp under the stars', true, NULL);
INSERT INTO todos (title, iscomplete, something)  VALUES ('Develop mind blowing database', false, NULL);
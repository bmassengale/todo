CREATE DATABASE fullstacktodo;

\c fullstacktodo;

CREATE TABLE Todos (
  TodoId INT CONSTRAINT id PRIMARY KEY,
  Title varchar(400),
  IsComplete BOOLEAN,
  Something varchar(400)
);

INSERT INTO todos VALUES (1, 'Eat lunch', false, NULL);
INSERT INTO todos VALUES (2, 'Call Grandmother to ask for skydiving instructions', false, NULL);
INSERT INTO todos VALUES (3, 'Email Johnny about that one thing', true, NULL);
INSERT INTO todos VALUES (4, 'Order Amazon package', false, NULL);
INSERT INTO todos VALUES (5, 'Finish algebra homework', true, NULL);
INSERT INTO todos VALUES (6, 'Take cans to recycling facility', false, NULL);
INSERT INTO todos VALUES (7, 'Cancel doctor''s appointment', false, NULL);
INSERT INTO todos VALUES (8, 'Take over the world', true, NULL);
INSERT INTO todos VALUES (9, 'Train Fido to fetch', false, NULL);
INSERT INTO todos VALUES (10, 'Deliver pizza', false, NULL);
INSERT INTO todos VALUES (11, 'Post a new todo', true, NULL);
INSERT INTO todos VALUES (12, 'Figure out what section does', false, NULL);
INSERT INTO todos VALUES (13, 'Make new todo', false, NULL);
INSERT INTO todos VALUES (14, 'Camp under the stars', true, NULL);
INSERT INTO todos VALUES (15, 'Develop mind blowing database', false, NULL);
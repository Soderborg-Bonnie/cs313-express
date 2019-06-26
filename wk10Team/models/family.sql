CREATE TABLE person
(id SERIAL PRIMARY KEY,
fname VARCHAR(50) NOT NULL,
lname VARCHAR(50),
dob DATE
);

CREATE TABLE family
(id SERIAL PRIMARY KEY,
parent_id INTEGER REFERENCES person(id),
child_id INTEGER REFERENCES person(id)
);


INSERT INTO person (fname, lname, dob) VALUES ('Sylvia', 'Liddiard', '1901-03-20');
INSERT INTO person (fname, lname, dob) VALUES ('Kenneth', 'Smith', '1920-04-06');
INSERT INTO person (fname, lname, dob) VALUES ('Lloyd', 'Smith', '1924-04-08');
INSERT INTO person (fname, lname, dob) VALUES ('Gerald', 'Smith', '1928-07-03');
INSERT INTO person (fname, lname, dob) VALUES ('Melba', 'Smith', '1931-04-23');
INSERT INTO person (fname, lname, dob) VALUES ('Shirl', 'Smith', '1934-09-20');
INSERT INTO person (fname, lname, dob) VALUES ('baby girl', 'Smith', '1922-04-17');
INSERT INTO person (fname, lname, dob) VALUES ('Donald', 'Smith', '1937-05-20');


INSERT INTO family (parent_id, child_id) VALUES (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8);

CREATE USER studentin WITH PASSWORD 'familie';
GRANT SELECT, INSERT, UPDATE ON person TO studentin;
GRANT USAGE, SELECT ON SEQUENCE person_id_seq TO studentin;



-- Get Parents
SELECT
    p2.id,
    p2.fname,
    p2.lname,
    p2.dob
FROM
    person AS p1
LEFT JOIN family on family.child_id=p1.id
LEFT JOIN person AS p2 on family.parent_id=p2.id

WHERE p1.id=3;

-- SELECT person.id, fname, lname, dob FROM person LEFT JOIN family on family.parent_id=person.id WHERE person.id=1;

-- Get Children
SELECT
    p2.id,
    p2.fname,
    p2.lname,
    p2.dob
FROM
    person AS p1
LEFT JOIN family on family.parent_id=p1.id
LEFT JOIN person AS p2 on family.child_id=p2.id

WHERE person.id=1;
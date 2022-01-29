-- these statements will drop tables each time you run sql --
-- will ensure that there is a clean slate, and nothing is added on -- 
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS parties; 

CREATE TABLE parties (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,
    description TEXT
); 

-- This is created to show the Tables schema -- s
CREATE TABLE candidates (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    -- this was added as well -- 
    party_id INTEGER,
    industry_connected BOOLEAN NOT NULL,
    -- this was added to the candidates table to add the foreign key -- 
    CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
);



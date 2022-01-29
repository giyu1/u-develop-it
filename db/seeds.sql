-- Similar to the candidates table, this information in parties --
-- will be seeded into the parties schema located under the db -- 
-- This is placed before the candidates to enable the foreign key constraints -- 
INSERT INTO parties (name, description)
VALUES
    ('JS Juggernauts', 'The JS Juggernaut eat, breather, and sleep JavaScript. They can build everything you could ever want in SJ, including a new kitchen sink.'),
    ('Heroes of HTML', 'Want to see a mock-up turn into an actual webpage in a matter of minutes? Well, the Heroes of HTML can get it done in a matter of seconds.'),
    ('Git Gurus', 'Need to resolve a merge conflict? The Git Gurus have your back. Nobody knows Git like these folks do.');


INSERT INTO candidates (first_name, last_name, party_id, industry_connected)
VALUES
('Ronald', 'Firbank', 1, 1),
('Virgina', 'Woolf', 1, 1),
('Piers', 'Gaveston', 1, 0),
('Charles', 'LeRoi', 2, 1),
('Katherine', 'Mansfield', 2, 1),
('Dora', 'Carrington', 3, 0),
('Edward', 'Bellamy', 3, 0),
('Montague', 'Summers', 3, 1),
('Octavia', 'Butler', 3, 1),
('Unica', 'Zurn', NULL, 1);

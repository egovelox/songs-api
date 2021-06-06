# users
INSERT INTO users (id, lastname, firstname, username, email, principal_lang, secondary_lang)
        VALUES
        ('1', 'Guardi', 'Antonio', 'anto', 'anto@guardi.it', 'en', 'it'),
        ('2', 'Malatesta', 'Céline', 'puppe', 'cel.malatesta@gmail.com', 'fr', null),
        ('3', 'Dubois', 'Jacques', 'jacquot', 'jacques.dubois@gmail.com', 'en', 'fr'),
        ('4', 'Alice', 'Duprès', 'Alice', 'alice.dupres@gmail.com', 'fr', null),
        ('5', 'Ayoub', 'Aliya', 'alyia', 'alyia.ayoub@protonmail.com', 'it', 'ger');

# songs
INSERT INTO songs (id, name, author, description, duration)
        VALUES
        ('10001', "Paris s'éveille", 'Jacques Dutronc', 'Magnifque chanson sur Paris, culte !', 4.26),
        ('10002', "Nocturne en mi majeur op.123-2", 'Chopin', 'Nocturne aux harmonies subtiles', 3.26),
        ('10003', "Fantaisie en la majeur KW243", 'Mozart', 'Adagio cantabile écrit en 1791', 4.56),
        ('10004', "J'écris une lettre au président", 'Oxmo Puccino', 'Grand qualité du texte.', 4.24),
        ('10005', "Je dans le mia", 'Iam', "Chanson devenue emblématique d'un style de vie marseillais", 2.28),
        ('10006', "Could you be loved", 'Bob Marley', 'Lee Perry à la basse, idéal pour danser', 3.27),
        ('10007', "Waltz for Debby", 'Bill Evans', "Composition originale, chef d'oeuvre de jeunesse", 5.29),
        ('10008', "There'll never be another you", 'Barry Harris', 'Un classique du bebop', 2.22),
        ('10009', "La mer", 'Charles Trenet', 'Magnifique chanson du grand Trenet !', 4.24),
        ('10011', "Twelfth Street Rag", 'Sidney Bechet', 'Les années folles vivent encore dans les cuivres de Sidney Bechet', 3.28),
        ('10021', "All my life with you", "Anita O'Day", 'Anita dans sa meilleure veine.', 2.11),
        ('10031', "Girl from Ipanema", 'Antonio Jobim', 'Bossa-nova sur la plage de Rio', 3.16),
        ('10041', "Is this because I'm black", 'Ken Boothe', 'Magnifique chanson engagée', 2.56),
        ('10051', "I heard it through the grapevine", 'Marvin Gaye', "Un chef d'oeuvre de Motown", 4.18),
        ('10061', "Orpheo - ouverture", 'Glück', "Naissance de l'opéra", 3.56),
        ('10071', "Foule semtimentale", 'Alain Souchon', 'Symbole des années 80', 2.56),
        ('10081', "Smooth Operator", 'Sade', 'Un rythme et une voix enchanteurs', 4.33);

# playlists
INSERT INTO playlists (id, user_id, name, created_at)
	VALUES
        ('1', '4', 'Classique', '2011-05-03 09:15:38'),
        ('2', '3', 'Varia', '2021-05-15 12:25:28'),
        ('3', '4', 'Classique', '2020-05-25 19:11:18'),
        ('4', '2', 'Jazz ragtime', '2013-03-05 17:15:33'),
        ('5', '1', 'Hip hop old school', '2012-02-05 08:15:22'),
        ('6', '1', 'Classics', '2018-03-25 19:15:38'),
        ('7', '4', 'Chanson fr', '2019-01-21 09:15:38'),
        ('8', '2', 'Chansons à textes', '2021-05-08 09:15:38');

# song - playlist
INSERT INTO song_playlist (song_index, song_id, playlist_id)
	VALUES
        ('1', '10061', '1'),
        ('2', '10003', '1'),
        ('3', '10002', '1'),
        ('4', '10041', '2'),
        ('5', '10061', '3'),
        ('6', '10001', '3'),
        ('7', '10003', '3'),
        ('8', '10002', '3'),
        ('10', '10061', '6'),
        ('11', '10003', '6'),
        ('12', '10002', '6'),
        ('13', '10001', '6'),
        ('14', '10009', '6'),
        ('28', '10081', '6'),
        ('15', '10001', '7'),
        ('16', '10004', '7'),
        ('17', '10005', '7'),
        ('18', '10009', '7'),
        ('19', '10071', '7'),
        ('9', '10021', '4'),
        ('20', '10031', '4'),
        ('21', '10008', '4'),
        ('22', '10007', '4'),
        ('23', '10005', '5'),
        ('24', '10004', '5'),
        ('25', '10004', '8'),
        ('26', '10005', '8'),
        ('27', '10071', '8');

# translations
INSERT INTO description_translations (id, song_id, lang, value)
        VALUES
        ('1', '10001', 'it', "Un merviglioso canzon su Parigi, bellissima ! "),
        ('2', '10002', 'en', "Nocturne with subtil harmony changes"),
        ('3', '10001', 'ger', "Ein wunderbares Lied über Paris, kult !"),
        ('4', '10001', 'en', "Wonderful song about Paris, cult !"),
        ('5', '10002', 'ger', "Ein Nokturn mit ausgezeichneten Harmonisierungen"),
        ('6', '10002', 'it', "Un nocturno con le piu suttile harmonie"),
        ('7', '10003', 'en', 'An adagio cantabile written in 1791'),
        ('8', '10003', 'ger', 'Ein im Jahr 1791 geschriebener adagio cantabile'),
        ('9', '10003', 'it', 'Un adagio cantabile scritto in 1791'),
        ('10', '10004', 'en', 'Lyrics of the highest quality'),
        ('11', '10004', 'ger', 'Ausgezeichnete Qualität der Worten'),
        ('12', '10004', 'it', 'Con le parole di ottima qualita'),
        ('13', '10005', 'en', 'A song that became an emblem of the art of living in Marseille'),
        ('14', '10021', 'en', 'Anita at its best'),
        ('16', '10009', 'it', 'Una merviglia dello magnissimo Trenet'),
        ('15', '10081', 'en', 'A marvelous rythm and voice');

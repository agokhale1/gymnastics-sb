CREATE TABLE auth_levels (
    auth_level INT NOT NULL AUTO_INCREMENT,
    auth_desciption VARCHAR(50) NOT NULL DEFAULT '',
    PRIMARY KEY (auth_level)
);

INSERT INTO auth_levels (auth_desciption) VALUES ('Guest'), ('User'), ('Admin'), ('Superuser');

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    login VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    auth_level INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id),
    FOREIGN KEY (auth_level) REFERENCES auth_levels(auth_level)
);

CREATE TABLE gyms (
    gym_id INT NOT NULL AUTO_INCREMENT,
    gym_name VARCHAR(100) NOT NULL UNIQUE,
    gym_logo_url VARCHAR(255) NOT NULL DEFAULT '/images/no-logo.png',
    PRIMARY KEY (gym_id)
);

CREATE TABLE meets (
    meet_id INT NOT NULL AUTO_INCREMENT,
    meet_title VARCHAR(100) NOT NULL DEFAULT '',
    meet_date DATE NOT NULL,
    meet_location VARCHAR(100) NOT NULL DEFAULT '',
    PRIMARY KEY (meet_id)
);

CREATE TABLE gymnasts (
    gymnast_id INT NOT NULL AUTO_INCREMENT,
    gym_id INT NOT NULL,
    gymnast_active BOOLEAN NOT NULL DEFAULT TRUE,
    gymnast_first_name VARCHAR(25) NOT NULL,
    gymnast_last_name VARCHAR(35) NOT NULL,
    gymnast_level VARCHAR(15) NOT NULL,
    PRIMARY KEY (gymnast_id),
    FOREIGN KEY (gym_id) REFERENCES gyms(gym_id)
);

CREATE TABLE meet_participants (
    meet_id INT NOT NULL,
    gymnast_id INT NOT NULL,
    PRIMARY KEY (meet_id, gymnast_id),
    FOREIGN KEY (meet_id) REFERENCES meets(meet_id),
    FOREIGN KEY (gymnast_id) REFERENCES gymnasts(gymnast_id)
);

CREATE TABLE events (
    event_id INT NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(15) NOT NULL UNIQUE,
    PRIMARY KEY (event_id)
);

INSERT INTO events (event_name) VALUES ('Bars'), ('Beam'), ('Floor'), ('Vault');

CREATE TABLE scores (
    score_id INT NOT NULL AUTO_INCREMENT,
    meet_id INT NOT NULL,
    gymnast_id INT NOT NULL,
    event_id INT NOT NULL,
    score FLOAT(5, 3) NOT NULL DEFAULT 0,
    PRIMARY KEY (score_id),
    FOREIGN KEY (meet_id) REFERENCES meets(meet_id),
    FOREIGN KEY (gymnast_id) REFERENCES gymnasts(gymnast_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
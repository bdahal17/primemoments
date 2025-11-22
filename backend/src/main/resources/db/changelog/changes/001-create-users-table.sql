CREATE table user_profile (
                             id SERIAL PRIMARY KEY,
                             email VARCHAR(100) NOT NULL UNIQUE,
                             first_name VARCHAR(50) NOT NULL,
                             last_name VARCHAR(50) NOT NULL,
                             password_hash VARCHAR(255) NOT NULL,
                             enabled BOOLEAN DEFAULT TRUE,
                             locked BOOLEAN DEFAULT FALSE,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE table role (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(50) NOT NULL UNIQUE,
                      description VARCHAR(255)
);

CREATE TABLE user_role (
                           id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL,
                           role_id INT NOT NULL,  -- ✅ Changed from VARCHAR to INT
                           FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE,
                           FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
                           UNIQUE(user_id, role_id)
);


insert into role (name, description) values ('ADMIN', 'Administrator with full access');
insert into role (name, description) values ('USER', 'Regular user with limited access');
insert into role (name, description) values ('MODERATOR', 'User with moderation privileges');
-- End of file

create table event (
                       id SERIAL PRIMARY KEY,
                       event_type VARCHAR(100) NOT NULL,
                       event_date TIMESTAMP NOT NULL,
                       contact_name VARCHAR(100),
                       contact_number VARCHAR(20),
                       expected_guests INT,
                       status VARCHAR(50) DEFAULT 'PENDING',
                       user_profile_id INT NOT NULL,
                       FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) ON DELETE CASCADE,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table location (
                         id SERIAL PRIMARY KEY,
                         event_id INT NOT NULL,
                         FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
                         name VARCHAR(100) NOT NULL,
                         description TEXT,
                         address_line1 VARCHAR(255) NOT NULL,
                         address_line2 VARCHAR(255) NOT NULL,
                         city VARCHAR(100) NOT NULL,
                         state VARCHAR(100),
                         postal_code VARCHAR(20),
                         country VARCHAR(100) NOT NULL,
                         latitude DECIMAL(9,6),
                         longitude DECIMAL(9,6),
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table event_note (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(150) NOT NULL,
                       content TEXT NOT NULL,
                       event_id INT NOT NULL,
                       user_profile_id INT NOT NULL,
                       FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
                       FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) ON DELETE CASCADE,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table notification (
                             id SERIAL PRIMARY KEY,
                             user_id INT NOT NULL,
                             type VARCHAR(100) NOT NULL,
                             title TEXT NOT NULL,
                             body TEXT NOT NULL,
                             delivered BOOLEAN DEFAULT FALSE,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             readAt TIMESTAMP,
                             FOREIGN KEY (user_id) REFERENCES user_profile(id) ON DELETE CASCADE
);

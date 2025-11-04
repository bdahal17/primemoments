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
                           FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,  -- ✅ Added FK
                           UNIQUE(user_id, role_id)  -- ✅ Prevent duplicate role assignments
);


insert into role (name, description) values ('ADMIN', 'Administrator with full access');
insert into role (name, description) values ('USER', 'Regular user with limited access');
insert into role (name, description) values ('MODERATOR', 'User with moderation privileges');
-- End of file

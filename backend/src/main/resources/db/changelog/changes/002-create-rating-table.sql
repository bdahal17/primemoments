CREATE table rating (
                      id SERIAL PRIMARY KEY,
                      rating_value INT NOT NULL,
                      comment TEXT,
                      active BOOLEAN DEFAULT FALSE,
                      public_comment BOOLEAN DEFAULT FALSE,
                      event_id INT NOT NULL,
                      user_profile_id INT NOT NULL,
                      FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
                      FOREIGN KEY (user_profile_id) REFERENCES user_profile(id) ON DELETE CASCADE,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

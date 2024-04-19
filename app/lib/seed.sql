CREATE TABLE users (
  id public.xid PRIMARY KEY DEFAULT xid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE accounts (
  id public.xid PRIMARY KEY DEFAULT xid(),
  user_id public.xid NOT NULL REFERENCES users(id),
  provider_id VARCHAR(255) NOT NULL,
  provider_type VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state TEXT
);

CREATE TABLE user_preferences (
  user_id public.xid PRIMARY KEY,
  providers INTEGER[],
  genres INTEGER[],
  language VARCHAR(5),
  region VARCHAR(2),
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
  REFERENCES users(id)
  ON DELETE CASCADE
);

CREATE TABLE match_sessions (
  id public.xid PRIMARY KEY DEFAULT xid(),
  providers INTEGER[],
  genres INTEGER[],
  is_started BOOLEAN DEFAULT false
);

CREATE TABLE match_sessions_users (
  user_id public.xid NOT NULL REFERENCES users(id),
  match_session_id public.xid NOT NULL REFERENCES match_sessions(id),
  is_host BOOLEAN DEFAULT false,
  PRIMARY KEY(user_id, match_session_id)
);

CREATE TABLE users_movies (
  user_id public.xid NOT NULL REFERENCES users(id),
  movie_id INTEGER NOT NULL,
  is_liked BOOLEAN NOT NULL,
  rated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(user_id, movie_id)
)

CREATE VIEW match_session_matches
AS
SELECT msu.match_session_id, um.movie_id, MAX(um.rated_at) last_rated_at
FROM users_movies um
INNER JOIN match_sessions_users msu
ON um.user_id = msu.user_id
WHERE um.is_liked = true 
GROUP BY msu.match_session_id, um.movie_id
HAVING COUNT(um.movie_id) = (
  SELECT COUNT(user_id) 
  FROM match_sessions_users 
  WHERE match_session_id = msu.match_session_id)
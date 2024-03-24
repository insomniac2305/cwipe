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

CREATE TABLE sessions (
  id public.xid PRIMARY KEY DEFAULT xid(),
  providers INTEGER[],
  genres INTEGER[]
)

CREATE TABLE sessions_users (
  user_id public.xid NOT NULL REFERENCES users(id),
  session_id public.xid NOT NULL REFERENCES sessions(id),
  PRIMARY KEY(user_id, session_id)
)
-- Use Table -- 
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(35),
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile_pic_url TEXT,
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User session table -- 
CREATE TABLE user_sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  is_revoked BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index on the refresh token hash and user id --
CREATE INDEX idx_user_sessions_refresh_token_hash ON user_sessions(refresh_token_hash);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);

-- Playlist table --
CREATE TABLE playlists (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  total_songs INT DEFAULT 0,
  total_duration_seconds INT DEFAULT 0,
  follower_count INT DEFAULT 0 is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index on the user id and playlist name --
CREATE INDEX idx_playlists_user_id ON playlists(user_id);
CREATE INDEX idx_playlists_name ON playlists(name);


-- Songs table --
CREATE TABLE songs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  artist_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_photo_url TEXT,
  audio_url TEXT NOT NULL,
  duration_seconds INT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index on the artist id and song name --
CREATE INDEX idx_songs_artist_id ON songs(artist_id);
CREATE INDEX idx_songs_name ON songs(name);

-- Playlist-songs junction table --
CREATE TABLE playlist_songs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  playlist_id BIGINT UNSIGNED NOT NULL,
  song_id BIGINT UNSIGNED NOT NULL,
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- Index on the playlist id and song id --
CREATE INDEX idx_playlist_songs_playlist_id ON playlist_songs(playlist_id);
CREATE INDEX idx_playlist_songs_song_id ON playlist_songs(song_id);
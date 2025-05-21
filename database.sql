USE db_afrijeng;

CREATE TABLE operators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);	

CREATE TABLE computers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  status ENUM('aktif', 'dipakai', 'maintenance') DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE billings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  computer_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME,
  duration_minutes INT,
  total_price DECIMAL(10,2),
  status ENUM('active','completed','cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (computer_id) REFERENCES computers(id)
);

INSERT INTO computers (name, status) VALUES
('Cyber PC 001', 'aktif'),
('Cyber PC 002', 'aktif'),
('Cyber PC 003', 'aktif'),
('Cyber PC 004', 'aktif'),
('Cyber PC 005', 'aktif'),
('Cyber PC 006', 'aktif'),
('Cyber PC 007', 'aktif'),
('Cyber PC 008', 'aktif'),
('Cyber PC 009', 'aktif'),
('Cyber PC 010', 'aktif'),
('Cyber PC 011', 'aktif'),
('Cyber PC 012', 'aktif'),
('Cyber PC 013', 'aktif'),
('Cyber PC 014', 'aktif'),
('Cyber PC 015', 'aktif'),
('Cyber PC 016', 'aktif'),
('Cyber PC 017', 'aktif'),
('Cyber PC 018', 'aktif'),
('Cyber PC 019', 'aktif'),
('Cyber PC 020', 'aktif'),
('Cyber PC 021', 'maintenance'),
('Cyber PC 022', 'maintenance'),
('Cyber PC 023', 'maintenance');

SELECT * FROM users;
SELECT * FROM computers;
SELECT * FROM billings;

-- Akun Operator
INSERT INTO operators (username, password) VALUES ('rangga', 'renggo');



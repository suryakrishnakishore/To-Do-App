CREATE TABLE todos (
	id VARCHAR(255) PRIMARY KEY,
	user_email VARCHAR(255),
	title VARCHAR(30),
	progress INT,
	date VARCHAR(30)
);

CREATE TABLE users (
	email VARCHAR(255) PRIMARY KEY,
	hashed_pass VARCHAR(255)
);

INSERT INTO todo VALUES ("0", "sskk@tatlas.com", "Holiday Tick List", 2, "Thu Aug 15 5:45");

UPDATE todos SET title = 'Kishore', progress = 99 WHERE id = '07effd70-9719-4263-af4a-6d1e9f805adc';
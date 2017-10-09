# Fake-User REST API Demo #
## Database installation via docker ##

```docker run -p 3306:3306 --name fake-user-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest```

## Database schema ##

```sql
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(15) NOT NULL,
  `password` varchar(64) NOT NULL,
  `displayName` varchar(32) NOT NULL,
  `birthDate` date NOT NULL,
  `country` char(2) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## Before running the server
```
npm install
node index.js
```
The REST endpoint will listen on HTTP, port 8081

### Changing database connection info ###
Head to ```models/User.js``` and alter the connection string so that it points to valid credentials.

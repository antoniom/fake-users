Initialize a mysql database
docker run -p 3306:3306 --name fake-user-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest

Run the server node index.js

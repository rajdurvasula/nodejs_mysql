# Sample Application using NodeJS, Sequelize, MySQL
This is a sample nodejs application exposing REST APIs

## Pre-reqs
- Update OS packages
- Install Development Tools
- Install git
- Install MariaDB
- Create Database **blog_db**
- Create Database user: **appuser**
- Grant all privileges for **appuser** on **blog_db**

## Development Setup
- Install nodejs

> Change to Project directory, perform these tasks:

- Initialize npm

```
npm init
```

- Install packages HTTP server, parser, console logger

```
npm install --save express body-parser morgan
```

- Install nodemon

```
npm install -D nodemon
```

- Install Sequelize CLI

```
npm install -g sequelize-cli --save-dev
```

- Install Sequelize, mysql modules

```
npm install sequelize mysql2 --save
```

## ORM
To setup database tables for this application, perform these tasks:

### Update configuration
- Update **development** profile with Database user credentials
- Database user needs to be changed. replace **USER**
- Database password needs to be changed. replace **PASSWORD**
- Database host needs to be changed. replace **DBHOST**
>**NOTE:**
>- MariaDB host can be a RDS Instance
>- MariaDB host can be a EC2 Instance

### Generate Models:
- Initialize *sequelize-cli*

```
npx sequelize-cli init
```

- Generate *blog_users* model

```
npx sequelize-cli model:generate --name blog_users --attributes user_id:string,email_id:string
```

- Generate *blog_posts* model

```
npx sequelize-cli model:generate --name blog_posts --attributes title:string,description:string,pub_date:date
```

- Update the **associate** function in *models/blog_users.js*

```
            blog_users.hasMany(models.blog_posts, {
                    foreignKey: 'blog_user_id',
                    as: 'posts',
            });

```

- Update the **associate** function in *models/blog_posts.js*

```
            blog_posts.belongsTo(models.blog_users, {
                    foreignKey: 'blog_user_id',
                    onDelete: 'CASCADE',
            });

```

- Update Database configuration for **development** profile in *config/config.json*
- Generate Database tables

```
npx sequelize-cli db:migrate
```
## Deployment steps
- Clone this Repo
- Go to Dir: `nodejs_mysql`
- Install dependencies
```
npm install
```
- Copy test.service to /etc/systemd/system/
- Reload systemd Daemon
```
systemctl daemon-reload
```
- Enable and Start service
```
systemctl start test
systemctl enable test
```

## Local testing of REST Service
- Start service

```
npm start
```

### Rest URLs

- Create a Blog user
-- Use HTTP POST

```
http://hostname:8080/api/blog_users
```

-- **Payload**

```
{
  "user_id": "some_user",
  "email_id": "some_email@example.com"
}
```

-- **curl command**

```
curl http://localhost:8080/api/blog_users -X POST -H "Content-type: application/json" -H "Accept: application/json" -d "{\"user_id\": \"some_user\", \"email_id\": \"some_user@example.com\"}"
```


- Get all Blog users
-- Use HTTP GET

```
curl http://hostname:8080/api/blog_users -H "Accept: application/json"
```

- Get a Blog user
-- Use HTTP GET

```
curl http://hostname:8080/api/blog_users/1 -H "Accept: application/json"
```

- Update a Blog user
-- Use HTTP PUT

```
curl http://hostname:8080/api/blog_users/1 -X PUT -H "Content-type: application/json" -H "Accept: application/json" -d "{\"user_id\": \"some_user\", \"email_id\": \"some_user@sample.com\"}"
```

-- **Payload**

```
{
  "user_id": "some_user",
  "email_id": "some_email@example.com"
}
```

- Delete a Blog user
-- Use HTTP DELETE

```
curl http://hostname:8080/api/blog_users/1 -X DELETE
```

- Create a Blog post for a Blog user
-- Use HTTP POST

```
curl http://hostname:8080/api/blog_users/1/posts -X POST -H "Content-type: application/json" -H "Accept: application/json" -d "{\"title\": \"Lord of the Rings: Fellowship of the Ring\", \"description\": \"A team of men join hands to protect the one ring that could bring doom for humanity.\", \"pub_date\": \"2021-02-05\"}"
```

-- **Payload**

```
{
  "title": "Lord of the Rings: Fellowship of the Ring",
  "description": "A team of men join hands to protect the one ring that could bring doom for humanity.",
  "pub_date": "2021-02-05"
}
```

- Get all Blog posts
-- Use HTTP GET

```
curl http://hostname:8080/api/blog_posts -H "Accept: application/json"
```

- Update Blog post of a Blog user
-- Use HTTP PUT

```
curl http://hostname:8080/api/blog_posts/1 -H "Accept: application/json"
```

- Delete Blog post of a Blog user
-- Use HTTP DELETE

```
curl http://hostname:8080/api/blog_posts/1 -X DELETE
```

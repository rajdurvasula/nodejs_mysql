# Sample Application using NodeJS, Sequelize, MySQL
This is a sample nodejs application exposing REST APIs

## Pre-reqs
- Install MariaDB
- Create Database **blog_db**
- Create Database user: **appuser**
- Grant all privileges for **appuser** on **blog_db**

## Setup
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
- Database user is **appuser**

### Generate Models:
- Generate *blog_users* model

```
sequelize model:generate --name blog_users --attributes user_id:string,email_id:string
```

- Generate *blog_posts* model

```
sequelize model:generate --name blog_posts --attributes title:string,description:string,pub_date:date
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
sequelize db:migrate
```

## REST Service
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

- Get all Blog users
-- Use HTTP GET

```
http://hostname:8080/api/blog_users
```

- Get a Blog user
-- Use HTTP GET

```
http://hostname:8080/api/blog_users/<id>
```

- Update a Blog user
-- Use HTTP PUT

```
http://hostname:8080/api/blog_users/<id>
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
http://hostname:8080/api/blog_users/<id>
```


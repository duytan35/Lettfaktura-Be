# Lettfaktura Backend

A Node.js backend application built with Fastify and PostgreSQL for invoice management.

## Prerequisites

- Node.js v22.12.0 or higher
- PostgreSQL database
- Yarn package manager

## Tech Stack

- **Framework:** Fastify v5.5.0
- **Database:** PostgreSQL with Sequelize ORM
- **Language:** JavaScript (ES Modules)
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest
- **Process Manager:** Nodemon (development)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/duytan35/Lettfaktura-Be.git
cd Lettfaktura-Be
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=root
DB_PASSWORD=password
```

### 4. Database Setup

#### Option A: Using Docker (Recommended)

Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This will create a PostgreSQL container with:

- Database: `mydb`
- User: `root`
- Password: `password`
- Port: `5432`

#### Option B: Local PostgreSQL

If you have PostgreSQL installed locally, create a database and update your `.env` file accordingly.

### 5. Database Migration and Seeding

Run database migrations to create tables:

```bash
yarn db:migrate
```

Seed the database with sample data:

```bash
yarn db:seed
```

### 6. Start the Application

#### Development mode (with auto-reload):

```bash
yarn dev
```

#### Production mode:

```bash
yarn start
```

The server will start on the port specified in your `.env` file (default: 3000).

## Available Scripts

- `yarn dev` - Start development server with nodemon
- `yarn start` - Start production server
- `yarn test` - Run Jest tests
- `yarn db:create` - Create database
- `yarn db:drop` - Drop database
- `yarn db:migrate` - Run migrations
- `yarn db:migrate:undo` - Undo last migration
- `yarn db:seed` - Run all seeders
- `yarn db:seed:undo` - Undo all seeders
- `yarn db:reset` - Reset database (undo migrations, migrate, and seed)

## API Documentation

Once the server is running, you can access:

- **API Documentation:** http://localhost:3000/docs
- **Health Check:** http://localhost:3000/health

## Project Structure

```
src/
├── app.js                 # Fastify app configuration
├── server.js             # Server entry point
├── config/               # Configuration files
│   ├── database.js       # Database connection
│   ├── env.js           # Environment variables
│   └── logger.js        # Logger configuration
├── common/              # Shared utilities
│   ├── constants.js     # Application constants
│   ├── errors.js        # Error definitions
│   ├── utils.js         # Utility functions
│   └── middlewares/     # Custom middlewares
├── modules/             # Feature modules
│   ├── config/          # Configuration management
│   ├── page/           # Page management
│   └── product/        # Product management
├── plugins/            # Fastify plugins
│   ├── cors.js         # CORS configuration
│   └── swagger.js      # API documentation
├── migrations/         # Database migrations
└── seeders/           # Database seeders
```

## Features

- **Product Management:** CRUD operations for products
- **Configuration Management:** Application settings
- **Page Management:** Dynamic page content
- **API Documentation:** Auto-generated Swagger docs
- **CORS Support:** Cross-origin resource sharing
- **Rate Limiting:** Request rate limiting
- **Security Headers:** Helmet integration
- **Logging:** Structured logging with Pino
- **Database ORM:** Sequelize with PostgreSQL
- **Hot Reload:** Development server with nodemon

## Development

### Database Management

To reset your database completely:

```bash
yarn db:reset
```

This will:

1. Undo all migrations
2. Run migrations again
3. Seed the database with sample data

### Adding New Migrations

```bash
npx sequelize-cli migration:generate --name your-migration-name
```

### Adding New Seeders

```bash
npx sequelize-cli seed:generate --name your-seeder-name
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Run migrations: `yarn db:migrate`
4. Start the application: `yarn start`

#### Current deployment in https://lettfaktura-be-production.up.railway.app/

## License

MIT License - see LICENSE file for details.

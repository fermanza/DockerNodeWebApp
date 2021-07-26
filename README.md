# DockerNodeWebApp
# Node.js with Express in Docker
- Type "make" in terminal to see the list of the possible commands

# To see which Docker images are currently running
- docker ps

# If you need to delete the container
- docker image ls
- docker image rm image_id

# Postman API Collection
- https://documenter.getpostman.com/view/4791253/TzsZsUhC

## Installation requirements
- Node.js >= 16.0.0
- npm >= 7.0.0

## Installation steps
- Clone the repository
- Install dependencies `npm install`
- Copy environment from example file `cp .env.example .env` and fill with production values
- Build and start the server `npm run start`

## Development steps
- Clone the repository
- Install dependencies `npm install`
- Copy environment from example file `cp .env.example .env` and fill with dev values
- Start the development server `npm run dev`
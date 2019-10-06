# wave_project

This project creates an interactive visualization of an ocean wave field given various parameters and the corresponding wave spectrum using a Flask API and REACT frontend. The API and frontend are dockerized and can be run using docker-compose.

# Requirements

1. install [docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

2. install [node](https://nodejs.org/en/)

## Installation

1. Pull project from github.

```
git clone https://github.com/isjxique/wave_project

```

2. Go to the main project folder (contains the docker-compose.yml file) and enter the following into the terminal to build the docker images:

```
docker-compose build

```

## Usage

1.  Go to the main project folder (contains the docker-compose.yml file) and enter the following into the terminal to run the docker images:

```
docker-compose up

```

2.  The web and api services should be publishing information in the terminal.

```
Copy the url such as http://localhost:5000 printed by the web service to view interactive plots.

```

3.  Enter the following into the terminal to shutdown the services:

```
docker-compose down


```

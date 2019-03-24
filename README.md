# wave_project

This project creates an interactive visualization of an ocean wave field given various parameters and the corresponding wave spectrum using a Flask API and REACT frontend. The API and frontend are dockerized and can be run using docker-compose.

# Requirements

1. install [docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/)

2. install [node](https://nodejs.org/en/)

## Installation

1. Pull project git.

```
git clone https://github.com/ish256/wave_project
```

2. go to ocean_wave_frontend folder and build to get node modules

```
cd ocean_wave_frontend
npm build

```

3. Go to back to main project folder and run the following to build docker images.

```
docker-compose build

```

4. In main project folder run the following to create and run containers.

```
docker-compose up

```

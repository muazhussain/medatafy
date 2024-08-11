# MEDATAFY

MEDATAFY is a comprehensive backend system designed to manage medical records, handle doctor and hospital appointments, and simplify various medical processes. The system is built using microservice architecture, utilizing NestJS as the backend framework, PostgreSQL as the primary database, MongoDB for caching authentication information, and Redis for caching OTPs and other temporary data.

## Table of Contents

- [Microservices](#microservices)
  - [HTTP Gateway](#http-gateway)
  - [Patient Service](#patient-service)
  - [Doctor Service](#doctor-service)
  - [Hospital Service](#hospital-service)
- [Technologies](#technologies)
- [Build and run the application](#build-and-run-the-application)
- [Usage](#usage)


## Microservices

### HTTP Gateway

The HTTP Gateway acts as the entry point for all client requests. It handles authentication and authorization, serving as a reverse proxy to route requests to the appropriate microservices.

### Patient Service

The Patient Service is responsible for managing patients' medical records, including personal information, medical history, and other relevant data.

### Doctor Service

The Doctor Service manages doctors' prescriptions, appointment schedules, and other related functionalities to simplify the interaction between patients and doctors.

### Hospital Service

The Hospital Service handles medical tests, hospital appointments, and other related operations, ensuring smooth coordination between patients and healthcare facilities.

## Technologies

- **Backend Framework:** NestJS
- **Primary Database:** PostgreSQL
- **Caching for Authentication:** MongoDB
- **Caching for OTP and Temporary Data:** Redis

## Build and run the application

`docker-compose up --build`

## Usage

- The API server will be running at `http://localhost:3000`.

- Swagger documentation is available at `http://localhost:3000/docs` with basic auth `(medatafy_api / 123456)`.

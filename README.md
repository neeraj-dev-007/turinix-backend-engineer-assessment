# Introduction

Welcome to the Turinix Backend Engineer Assessment repository! This project is part of the assessment process for backend engineers at Turinix.

This repository contains a Nest.js based backend application developed with Typescript and Node.js and leveraging PostgreSQL instance hosted on cloud by ElephantSQL. The task involved creating API endpoints for CRUD Operations on Departments, Roles, Employees, Shifts and API endpoints for assigning shift to employees, fetching their schedule and filling their availability,

[Postman Workspace for API Testing](https://www.postman.com/solar-water-291838-1/workspace/turinix-backend-engineer-assessment)


## Setup Instructions 

To run the application you would require:

- Node.js
- Postman (or any other tool for API testing)

You are required to first install the project dependencies

```sh
npm install
```

and then run the application using the following command or using your IDE.

```sh
npm run start
```

Test APIs using the workspace:-
[Postman Workspace for API Testing](https://www.postman.com/solar-water-291838-1/workspace/turinix-backend-engineer-assessment)


## Implementation Approach and Assumptions 

### CRUD operation APIs:

- Utilize the Stripe Java SDK to integrate Stripe payment processing service into the Spring Boot Application.
- StripePaymentProvider class to make Stripe API calls for customer creation and updates upon user signup.
- Change Account model to store additional fields like providerId and providerType returned by Stripe.

### Scheduling and Availability APIs:

- Leverage the Temporal Workflow Engine to orchestrate business logic efficiently.
- Define 2 temporal workflows:
  - Create Account Workflow: This workflow will handle account creation and consists of following 2 activities
    - Create Payment Account Activity: To create account with Stripe.
    - Save Account to DB Activity: To save account with updated fields like providerType and providerId to PostgreSQL DB.
  - Update Account Workflow: This workflow will handle account updation and consists of following 2 activities
    - Update Payment Account Activity: To update account with Stripe.
    - Update Account to DB Activity: To update account in PostgreSQL DB.
- Create Account Workers listening to _create-account-workflow_ and _update-account-workflow_ task queues to handle tasks such as customer creation and updates seamlessly.
- Implement retry and error handling mechanisms within temporal workflows to ensure fault tolerance and reliability.


## References

- [Nest.js documentation](https://docs.nestjs.com/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Amazing Nest.js Course by Haider Malik](https://youtu.be/sFnAHC9lLaw?si=Sg_3wzvXZtdQkBa_)
- [ElephantSQL for hosting PostgreSQL instances on cloud](https://www.elephantsql.com/)
- Various articles on Medium and threads on Stack Overflow.

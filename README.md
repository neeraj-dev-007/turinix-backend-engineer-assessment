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

### Data Model:

![Data Model](https://github.com/neeraj-dev-007/turinix-backend-engineer-assessment/assets/161232671/4dfbbdf5-bb41-4274-81a0-2f967bd099f7)
(Yes, those arrows in diagram will be fixed soon)

Design Thinking for Present and Future:  
- Add _departments_ and _roles_ table for enriching _employees_ and _shifts_ table. this two table will ensure that only employee meeting skill requirements is allocated a shift.
- Create _shifts_departments_ and _shift_roles_ for acting as bridge tables for _shifts_ with _departments_ and _roles_ respectively.
- Add _dates_ table for providing all information related to a date and will help immensely when scaling the application, creating reports data and intergrating with third party systems. It contains columns like **isHoliday**, **isWeekend**, **isBusy** which will help us in predicting a surge in customers and hence alert user to increase shifts for those days.
- Add _availabilities_ table for storing availability information of an employee on a particular date.
- Add _schedules_ table for storing schedule of all emplpoyees and their shift details on a particular date.
  

## References

- [Nest.js documentation](https://docs.nestjs.com/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Amazing Nest.js Course by Haider Malik](https://youtu.be/sFnAHC9lLaw?si=Sg_3wzvXZtdQkBa_)
- [ElephantSQL for hosting PostgreSQL instances on cloud](https://www.elephantsql.com/)
- Various articles on Medium and threads on Stack Overflow.

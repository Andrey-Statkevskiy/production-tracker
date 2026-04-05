# Cell 1 Production Tracker

## Description

This is a personal project which serves the purpose of primarily viewing and tracking production performance.

## Functionality

There are 3 types of users - technicians, leaders, and TVs.

### Technician

* Can designate their station, level, scan-in units, and begin the run
* Can refer to the assembly instructions on the screen, collapsing/expanding windows with the PDF file
* Optionally, can checkmark completed assembly steps
* Can end runs

The information containing station, level, amount of units, their serials, and time taken to complete will be saved and used for production tracking.

### Leaders

* Can designate desired production targets for any period of time (day, week, etc.) and any level of assembly (L1/L2)
* Can track production progress in their dashboard as technicians end their runs, tracking performance progress by station, level, and overall completion of set target
* Can reset progress to restart progress bar

### TVs

* Can display progress by station, level, and overall completion of set target


## Setup



## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
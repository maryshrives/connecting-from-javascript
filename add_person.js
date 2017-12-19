const settings = require("./settings");

const knex = require('knex')
({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl      : true

  }
});

const firstNameInput = process.argv[2];
const lastNameInput = process.argv[3];
const dobInput = process.argv[4];

knex.insert([{
    first_name: firstNameInput,
    last_name: lastNameInput,
    birthdate: dobInput
  }]).into('famous_people')
  .then(function(id) {
    console.log(id);
  });

knex.destroy();
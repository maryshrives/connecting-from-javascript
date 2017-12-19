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

let argv = process.argv.slice(2);

function correctDate(date) {
  let dateObj = new Date(date);
  let day = dateObj.getUTCDate();
  let month = dateObj.getUTCMonth() + 1;
  let year = dateObj.getUTCFullYear();
  let correctedDate = year + "-" + month + "-" + day;
  return correctedDate;
}

knex.select('id', 'last_name', 'first_name', 'birthdate')
.from('famous_people')
.where({last_name: argv[0]})
.orWhere({first_name: argv[0]})
.asCallback(function(err, rows) {
  if (err) return console.error("error running query", err);
  let row = rows[0];
  let niceDate = correctDate(row.birthdate);
  console.log("- " + row.id + ": " + row.first_name, row.last_name + ", born " + niceDate);
//close connection
  knex.destroy();
});
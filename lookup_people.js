const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
//show the date without the time afterwards
function correctDate(date) {
  let dateObj = new Date(date);
  let day = dateObj.getUTCDate();
  let month = dateObj.getUTCMonth() + 1;
  let year = dateObj.getUTCFullYear();
  let correctedDate = year + "-" + month + "-" + day;
  return correctedDate;
}

function lookUpPeopleByName (name, cb) {
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [name], cb)
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  lookUpPeopleByName (args[0], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let niceDate = correctDate(result.rows[0].birthdate);
    console.log(result.rows[0].id + ": " + result.rows[0].first_name + " " + result.rows[0].last_name + ", born " + niceDate);
    client.end();
  });
});
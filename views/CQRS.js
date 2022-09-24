//? Command and Query Responsibility Segregation (CQRS)

//* command " Write -Update - Delete
//* Query : Read

//* Write DB1 => (join,lookup) => Write => DB2
//* Read !(aggregate,lookup,projection) => Read DB2 (find())

const logs = [];

function log(output){
    logs.push(`${new Date(Date.now())} : ${output}`);
    console.log(output);
}

module.exports = {
    log: log,
    logs: logs
}
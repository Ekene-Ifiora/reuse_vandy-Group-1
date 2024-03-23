const ps = require('ps-node');

// Find all Node.js processes
ps.lookup({
  command: 'node',
}, (err, processes) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  // Kill each Node.js process
  processes.forEach(({ pid }) => {
    process.kill(pid);
    console.log(`Killed Node.js process with PID ${pid}`);
  });
});
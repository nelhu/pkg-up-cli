#!/usr/bin/env node
const program = require('commander');
const upgrade  = require('./src');

program
  .name('pkg-up-cli')
  .description('pkg-up-cli -q -s -r=root_path -b=branch -p=package -m=comment')
  .version('0.0.1', '-v, --version', 'print version')
  .option('-r, --root <root>', 'git project root path')
  .option('-b, --branch <branch>', 'branch name which will be created and working')
  .option('-p, --pkg <pkg>', 'package name which will upgrade')
  .option('-m, --comment <comment>', 'comment which will be used as commit message')
  .option('-q, --merge-qa', 'whither merge to qa')
  .option('-s, --merge-sim', 'whither merge to sim')
  program.parse(process.argv);

  const options = program.opts();
  console.log(options);

  // upgrade({
  //   root,
  //   branch_name,
  //   package_name,
  //   comment,
  // });
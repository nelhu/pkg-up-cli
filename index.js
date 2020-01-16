#!/usr/bin/env node
const program = require('commander');
const { upgrade, upgradePeppaTeacherLauncher }  = require('./src');

program
  .name('pkg-up-cli')
  .description('pkg-up-cli -q -s -r root_path -b branch -p package -m comment or pkg-up-cli -L -q -s')
  .version('1.0.3', '-v, --version', 'print version')
  .option('-r, --root <root>', 'git project root path')
  .option('-b, --branch <branch>', 'branch name which will be created and working')
  .option('-p, --pkg <pkg>', 'package name which will upgrade')
  .option('-m, --comment <comment>', 'comment which will be used as commit message')
  .option('-q, --merge-qa', 'whither merge to qa')
  .option('-s, --merge-sim', 'whither merge to sim')
  .option('-L, --peppa-teacher-launcher', 'directly update peppa-teacher/@classroom-launcher')
  program.parse(process.argv);

  const options = program.opts();
  // console.log(options);

  if (options.peppaTeacherLauncher) {
    upgradePeppaTeacherLauncher(options);
  } else {
    upgrade({
      root: options.root,
      branch_name: options.branch,
      package_name: options.pkg,
      comment: options.comment,
      mergeQa: options.mergeQa,
      mergeSim: options.mergeSim,
    });
  }
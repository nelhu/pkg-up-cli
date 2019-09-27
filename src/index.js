const ChildProcess = require('child_process');
const chalk = require('chalk');

const {
  spawnSync,
} = ChildProcess;

const cyan = chalk.cyan.bold;
const green = chalk.green.bold;
const red = chalk.red.bold;
const white = chalk.white.bold;

const info = (title) => {
  console.log(cyan(`${title} \n`));
}

const error = (title) => {
  console.log(red(`Error: ${title} \n`));
}

const success = (content, title) => {
  if (content) {
    console.log(content);
  }
  console.log(green(`${title} \n`));
}

function logParams(argv) {
  Object.keys(argv).forEach(key => {
    console.log(key, white(argv[key]))
  })
}

const upgrade = argv => {
  const {
    root,
    branch_name,
    package_name,
    comment,
    mergeQa,
    mergeSim,
  } = argv;

  const options = {
    encoding: 'utf-8',
    cwd: root,
  };
  // git push
  function gitPush() {
    info(`git push`);
    let { stdout } = spawnSync('git', ['push'], options);
    success(stdout, `pushed to origin`)
  }

  // git checkout branch
  function gitCheckoutBranch(branch) {
    info(`git checkout ${branch}`);
    let { stdout } = spawnSync('git', ['checkout', branch], options);
    success(stdout, `in ${branch}!`)
  }

  // git merge branch
  function gitMergeBranch(branch, target_branch) {
    info(`git merge ${branch}`);
    let { stdout } = spawnSync('git', ['merge', branch], options);
    success(stdout, `branch ${branch} merged to ${target_branch} successfully`)
  }

  // check
  if (!root) {
    error('A git project root path is required!');
    return ;
  }
  if (!branch_name) {
    error('A branch name is required!');
    return ;
  }

  if (!package_name) {
    error('A package name is required!');
    return ;
  }
  let _comment = comment ? comment : `upgrade ${package_name}`;

  logParams(argv);
  // return ;

  // git status

  info('git status')
  let { stdout: data1  } = spawnSync('git', ['status'], options);
  console.log(data1);

  // git checkout master
  info('git checkout master');
  let { stdout: data2 } = spawnSync('git', ['checkout', 'master'], options);
  console.log(data2);


  // // git pull
  info('git pull');
  let { stdout: data3 } = spawnSync('git', ['pull'], options);
  console.log(data3);

  // git branch branch_name master
  info(`git branch ${branch_name} master`);
  let { stdout: data4 } = spawnSync('git', ['branch', branch_name, 'master'], options);
  success(data4, `${branch_name} created!`);

  // git push -u origin branch_name
  info(`git push -u origin ${branch_name}`);
  let { stdout: data5 } = spawnSync('git', ['push', '-u', 'origin', branch_name], options);
  console.log(data5);

  // git checkout branch
  gitCheckoutBranch(branch_name);

  // // yarn add package_name
  info(`yarn add ${package_name}`);
  let { stdout: data6 } = spawnSync('yarn', ['add', package_name], options);
  success(data6, `${package_name} resolved!`)

  // git add .
  info(`git add .`);
  let { stdout: dataX } = spawnSync('git', ['add', '.'], options);

  // git commit -m 'comment' -a
  info(`git commit -m ${_comment} -a`);
  let { stdout: data7 } = spawnSync('git', ['commit', '-m'], options);
  success(data7, `changes were committed!`)

  // git push
  gitPush();

  if (mergeQa) {
    // git checkout qa
    gitCheckoutBranch('qa')
    // git merge branch_name
    gitMergeBranch(branch_name, 'qa');
    // git push
    gitPush();
  }

  if (mergeSim) {
    // git checkout sim
    gitCheckoutBranch('sim');
    // git merge branch_name
    gitMergeBranch(branch_name, 'sim');
    // git push
    gitPush();
  }
  success(null, 'job succeeded');
}
module.exports = upgrade;
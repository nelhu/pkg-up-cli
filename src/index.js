const ChildProcess = require('child_process');
const chalk = require('chalk');

const {
  spawnSync,
} = ChildProcess;

const cyan = chalk.cyan.bold;
const green = chalk.green.bold;
const red = chalk.red.bold;

const info = (title) => {
  console.log(cyan(`${title} \n`));
}

const error = (title) => {
  console.log(red(`${title} \n`));
}

const success = (content, title) => {
  if (content) {
    console.log(content);
  }
  console.log(green(`${title} \n`));
}

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
    console.log(stdout);
  }

  // git merge branch
  function gitMergeBranch(branch, target_branch) {
    info(`git merge ${branch}`);
    let { stdout } = spawnSync('git', ['merge', branch], options);
    success(stdout, `branch ${branch} merged to ${target_branch} successfully`)
  }

const upgrade = ({
  root,
  branch_name,
  package_name,
  comment,
}) => {
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

  // git status
  const options = {
    encoding: 'utf-8',
    cwd: root,
  };

  info('git status')
  let { stdout: data1  } = spawnSync('git', ['status'], options);
  console.log(data1);

  // git checkout master
  // info('git checkout master');
  // let { stdout: data2 } = spawnSync('git', ['checkout', 'master'], options);
  // console.log(data2);


  // // git pull
  // info('git pull');
  // let { stdout: data3 } = spawnSync('git', ['pull'], options);
  // console.log(data3);

  // // git branch branch_name master
  // info(`git branch ${branch_name} master`);
  // let { stdout: data4 } = spawnSync('git', ['branch', branch_name, 'master'], options);
  // success(data4, `${branch_name} created!`);

  // // git push -u origin branch_name
  // info(`git push -u origin ${branch_name}`);
  // let { stdout: data5 } = spawnSync('git', ['push', '-u', 'origin', branch_name], options);
  // console.log(data5);

  // // git checkout branch
  // gitCheckoutBranch(branch_name);

  // // yarn add package_name
  // info(`yarn add ${package_name}`);
  // let { stdout: data6 } = spawnSync('yarn', ['add', package_name], options);
  // success(data6, `${package_name} resolved!`)

  // // git commit -m 'comment' -a

  // info(`git commit -m ${comment} -a`);
  // let { stdout: data7 } = spawnSync('git', ['commit', '-m', comment, '-a'], options);
  // success(data7, `changes were committed!`)

  // // git push
  // gitPush();

  // // git checkout qa
  // gitCheckoutBranch('qa')

  // // git merge branch_name
  // gitMergeBranch(branch_name, 'qa');

  // // git push
  // gitPush();

  // git checkout sim
  // gitCheckoutBranch('sim');

  // // git merge branch_name
  // gitMergeBranch(branch_name, 'sim');

  // // git push
  // gitPush();
}
module.exports = upgrade;
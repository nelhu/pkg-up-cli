# pkg-up-cli

Command Line + Shell 实现自动更新指定依赖并push到远程

Getting Started

## 安装
```bash
  yarn global add pkg-up-cli
```

## 命令行参数
使用-h选项获取帮助
```bash
  pkg-up-cli -h
```

### 使用
* -q, -s 指定qa sim分支
* -r 指定项目根路径
* -b 指定要创建的分支名
* -p 指定要安装或更新的dependency package
* -m 指定git commit message
* -L 快捷方式，直接更新launcher
```bash
  pkg-up-cli -L -q -s
```
or
```bash
  pkg-up-cli -q -s -r root_path -b branch -p package -m comment
```

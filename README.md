# emp-sync-base README

## Features
+ 初始化 EMP 项目
+ 为 EMP 项目同步任何文件到项目的src目录，包括但不限于 d.ts 文件

# 初始化
### 启动初始化
使用 command + P , 输入命令
```
>EMP Init
```
### 输入项目名
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e9f1c47c83d44ad8d6fba5d71beaa4d~tplv-k3u1fbpfcp-zoom-1.image)

### 选择初始化模板
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5d3185367594f838d6384bd4f8f862c~tplv-k3u1fbpfcp-zoom-1.image)

### VSCode 自启动初始化好的项目
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22a0d00d558d4d9db9d7d11e480cec85~tplv-k3u1fbpfcp-zoom-1.image)



# 同步

### 配置需同步的文件地址和文件名

+ 打开 VSCode 设置
+ 找到 扩展
+ 在扩展中找到 Emp-sync-base
+ 当前项目新建 .vscode 目录
+ 在 .vscode 目录下新建 settings.json 且编辑
+ "empSyncBase.autoUpdate": true, 半小时更新类型文件一次和每次启动自动更新，默认不开启
+ 编辑 empSyncBase.fileURL 对象数组， url 为文件地址， name 为同步之后到本地的文件名和相对目录，例如：

```json
  "empSyncBase.autoUpdate": true,
    "empSyncBase.fileURL": [
      {
        "url": "https://raw.githubusercontent.com/apiel/adka/master/deno.d.ts",
        "name": "src/@deno8.d.ts"
      },
      {
        "url": "https://raw.githubusercontent.com/apiel/adka/master/deno.d.ts",
        "name": "@deno912132.d.ts"
      },
      {
        "url": "https://raw.githubusercontent.com/apiel/adka/master/deno.d.ts",
        "name": "@deno2.d.ts"
      },
      {
        "url": "https://raw.githubusercontent.com/apiel/adka/master/deno.d.ts",
        "name": "@deno3.d.ts"
      },
      {
        "url": "https://raw.githubusercontent.com/apiel/adka/master/deno.d.ts",
        "name": "@deno.d.ts"
      }
    ]
```

### 左下角同步按钮

点击 同步emp基站 马上同步您所配置的目标资源
![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dfa369734af458fa64ec811e438ef1a~tplv-k3u1fbpfcp-zoom-1.image)

## 自动更新周期

+ VSCode 打开时更新一次
+ VSCode 在运行时，每半小时更新一次

### 立即同步

使用 command + P , 输入命令 >EMP Remote Sync
或点击左下角 同步emp基站

## more

共建 EMP 微前端生态～可能是番禺区最好的微前端框架

**Enjoy!**

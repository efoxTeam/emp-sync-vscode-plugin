// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import axios from "axios";
import downloadRepo from "./utils/downloadRepo";
import template from './config/template';
const { exec } = require("child_process");

interface URL {
  url: string;
  name: string;
}

export interface QuickPickItem {
  /**
   * A human readable string which is rendered prominent.
   */
  label?: string;
  description?: string;
  detail?: string;
  picked?: boolean;
  alwaysShow?: boolean;
}

const getConfig = (): Array<URL> => {
  const configData: Array<URL> =
    vscode.workspace.getConfiguration().get("empSyncBase.fileURL") || [];
  return configData;
};

// 下载远程文件,拉取配置项的URL
const downloadFile = async (
  path: string,
  urlList: Array<URL>
): Promise<void> => {
  urlList.map(async (item) => {
    const file = fs.createWriteStream(`${path}/src/${item.name}`);
    const response = await axios({
      url: item.url,
      method: "GET",
      responseType: "stream",
    });
    await response.data.pipe(file);
    vscode.window.showInformationMessage(`${item.name} Fishish!`);
  });
};

const get = () => {
  const path = vscode.workspace.rootPath || '';
  const config = getConfig();
  downloadFile(path, config);
};

// 定时检测,每半小时检测一次
const updateTimer = (): void => {
  setInterval(() => {
    get();
  }, 1800000);
};

const inputProjectName = async (): Promise<string | undefined> => {
  const name = await vscode.window.showInputBox({
    placeHolder: "请输入新建项目名",
  });
  return name;
};

const selectTemplate = async (): Promise<QuickPickItem> => {
  const pickList: Array<any> = [];
  template.map(item => {
    pickList.push({
      label: item.name,
      description: item.git,
    });
  });
  const item: QuickPickItem = await vscode.window.showQuickPick(pickList);
  return item;
};

const initProject = async () => {
  const inputName = await inputProjectName();
  const path = vscode.workspace.rootPath || '';
  // 选择模板项目
  const template = await selectTemplate();
  const projectName = inputName || template.label;
  if (template.description && template.label) {
    await downloadRepo(
      template.description,
      `${path}/${projectName}`,
      projectName || template.label,
      ""
    );
    // VSCode 打开 新项目
    exec(`code ${path}/${projectName}`);
    vscode.window.showInformationMessage(`${projectName} Init Finish!`);
  } else {
    vscode.window.showInformationMessage(`${projectName} Init Error!`);
  }
};

const initBarButton = () => {
  // 状态栏按钮
  let syncStatusBarItem: vscode.StatusBarItem;
  syncStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  syncStatusBarItem.command = "emp-sync-base.syncCommand";
  syncStatusBarItem.text = "同步emp基站";
  syncStatusBarItem.show();
  return syncStatusBarItem;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  get();
  updateTimer();
  // 命令
  // 同步
  const sync = vscode.commands.registerCommand(
    "emp-sync-base.syncCommand",
    () => {
      get();
    }
  );

  context.subscriptions.push(sync);

  // 初始化项目
  const init = vscode.commands.registerCommand(
    "emp-sync-base.initCommand",
    () => {
      initProject();
    }
  );

  context.subscriptions.push(init);

  const syncStatusBarItem = initBarButton();
  context.subscriptions.push(syncStatusBarItem);
}

// this method is called when your extension is deactivated
export function deactivate() { }

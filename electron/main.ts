import { app, BrowserWindow } from "electron";
import { join } from "path";
if (require("electron-squirrel-startup")) app.quit();
app.whenReady().then(async() => {
  const window = new BrowserWindow({
    icon: "static/favicon.ico",
    autoHideMenuBar: true,
    roundedCorners: true,
    resizable: false,
    darkTheme: true,
    show: false
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    await window.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await window.loadFile(join(process.resourcesPath, `../renderer/${process.env.VITE_NAME}/index.html`));
  };
  window.maximize();
  window.once("ready-to-show", () => {
    window.show();
  });
});
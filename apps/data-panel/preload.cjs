/* eslint-disable @typescript-eslint/no-require-imports */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("panelAPI", {
  data: {
    list: () => ipcRenderer.invoke("data:list"),
    read: (fileName) => ipcRenderer.invoke("data:read", fileName),
    saveRaw: (payload) => ipcRenderer.invoke("data:saveRaw", payload),
    updateExport: (payload) => ipcRenderer.invoke("data:updateExport", payload),
    create: (payload) => ipcRenderer.invoke("data:create", payload),
    delete: (fileName) => ipcRenderer.invoke("data:delete", fileName),
  },
  blog: {
    list: () => ipcRenderer.invoke("blog:list"),
    upsert: (payload) => ipcRenderer.invoke("blog:upsert", payload),
    delete: (slug) => ipcRenderer.invoke("blog:delete", slug),
  },
  podcast: {
    list: (kind) => ipcRenderer.invoke("podcast:list", kind),
    upsert: (payload) => ipcRenderer.invoke("podcast:upsert", payload),
    delete: (payload) => ipcRenderer.invoke("podcast:delete", payload),
  },
  media: {
    listFolders: () => ipcRenderer.invoke("media:listFolders"),
    createFolder: (folder) => ipcRenderer.invoke("media:createFolder", folder),
    listFiles: (folder) => ipcRenderer.invoke("media:listFiles", folder),
    upload: (folder) => ipcRenderer.invoke("media:upload", folder),
    deleteFile: (relativePath) => ipcRenderer.invoke("media:deleteFile", relativePath),
  },
  publish: {
    status: () => ipcRenderer.invoke("publish:status"),
    run: (message) => ipcRenderer.invoke("publish:run", message),
  },
});

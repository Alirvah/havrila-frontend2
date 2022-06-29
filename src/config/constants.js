export const API = {
  TOKEN: "/api/token/",
  REFRESHTOKEN: "/api/token/refresh/",
  NOTES: "/note/",
  NOTEBOOK: "/notebook/",
  TODO: "/todos/",
  FILER: "/filer/",
  ADMIN: "/admin/",
  DEVICE: "/device/",
  SENSOR: "/sensor/",
  STATUS: "/status/",
  GET_GROUPS: "/get-groups/",
  EC2: "/ec2-server/",
  CHANGE_INSTANCE_TYPES: "/ec2-server-change-instance/",
  GET_INSTANCE_TYPES: "/ec2-server-get-instances/",
  S3_BACKUP: "/s3-backup/",
  ONLINE: "/online/latest",
  SERVER: "/server/",
  FUP: "/fup/",
  MEETING: "/meeting/",
};

export const HOST =
  "https://3ru4fvt9t5.execute-api.eu-central-1.amazonaws.com/dev";
//export const HOST = "http://127.0.0.1:8000";

export const NOTE_URL = HOST + "/note/api/v1";
export const TODO_URL = HOST + "/todo/api/v1";
export const FILE_URL = HOST + "/file/api/v1";
export const WIFI_URL = HOST + "/wifi/api/v1";
export const SENS_URL = HOST + "/sensors/api/v1";
export const SYSTEM_URL_2 = HOST + "/system";

export const SYSTEM_URL = HOST + "/api";

export const CANVAS_ITEMS = [
  "balls",
  "planets",
  "cube",
  "ray",
  "clock",
  "stars",
  "runner",
  "carpet",
];

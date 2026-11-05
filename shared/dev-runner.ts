import { spawn } from "child_process";

const backend = spawn("npm", ["run", "dev", "--workspace=@el-masry/backend"], {
  stdio: "inherit",
  shell: true,
});

const frontend = spawn("npm", ["run", "dev", "--workspace=@el-masry/frontend"], {
  stdio: "inherit",
  shell: true,
});

process.on("SIGINT", () => {
  backend.kill("SIGINT");
  frontend.kill("SIGINT");
  process.exit(0);
});

import * as common from "./common";
import * as core from "@actions/core";
import isDocker from "is-docker";

(async () => {
  if (process.platform !== "linux") {
    console.log(common.UBUNTU_MESSAGE);
    return;
  }
  if (isDocker()) {
    console.log(common.CONTAINER_MESSAGE);
    return;
  }

  if (
    String(process.env.STATE_monitorStatusCode) ===
    common.STATUS_PREVENT_RUNNER_UNAVAILABLE
  ) {
    console.log(common.PREVENT_RUNNER_UNAVAILABLE_MESSAGE);
    return;
  }

  if (
    core.getBooleanInput("disable-telemetry") &&
    core.getInput("egress-policy") === "block"
  ) {
    console.log(
      "Telemetry will not be sent to Boss-Net API as disable-telemetry is set to true"
    );
  } else {
    var web_url = "https://boss-net.github.io";
    common.printInfo(web_url);
  }
})();

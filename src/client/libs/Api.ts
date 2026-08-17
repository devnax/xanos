import { SecurequClient } from "securequ";
import { API_BASE_PATH } from "../../core/constant.js";
const { protocol, host } = window.location;

const Api = new SecurequClient({
  url: `${protocol}//${host}${API_BASE_PATH}`,
  secret: "wellknownclientsecret",
});

export default Api;

import { SecurequClient } from "securequ";
const { protocol, host } = window.location;

const Query = new SecurequClient({
  url: `${protocol}//${host}/_query`,
  secret: "wellknownclientsecret",
});

export default Query;

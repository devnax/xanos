import Stack from "@xanui/ui/Stack";
import Text from "@xanui/ui/Text";
import Input from "@xanui/ui/Input";
import PasswordInput from "@xanui/ui/PasswordInput";
import Button from "@xanui/ui/Button";
import Link from "@xanui/ui/Link";
import AuthFormState from "./state";
import Api from "../../libs/Api";
import database, { User } from "../../../database";

const LoginForm = () => {
  const username = AuthFormState.get("username");
  const password = AuthFormState.get("password");
  return (
    <Stack
      width={350}
      radius={1.5}
      p={2.5}
      border={1}
      bgcolor={"neutral.100"}
      gap={3}
      shadow={"lg"}
    >
      <Stack gap={1}>
        <Text variant="h6">Sign into your account</Text>
        <Text color="text.secondary">
          Easily manage your autonomous voice assistants all in one dashboard.
        </Text>
      </Stack>
      <Stack gap={1}>
        <Input
          placeholder="Enter your username or email"
          size="sm"
          label="Username or Email"
          variant="outline"
          value={username}
          onFocus={() => {
            AuthFormState.clearError("username");
          }}
          onChange={(e) => {
            AuthFormState.set("username", e.target.value);
          }}
          error={!!AuthFormState.getError("username")}
          helperText={AuthFormState.getError("username")}
        />
        <PasswordInput
          placeholder="Enter your password"
          size="sm"
          label="Password"
          value={password}
          onFocus={() => {
            if (!!AuthFormState.getError("password")) {
              AuthFormState.set("password", "");
              AuthFormState.clearError("password");
            }
          }}
          onChange={(e) => {
            AuthFormState.set("password", e.target.value);
          }}
          error={!!AuthFormState.getError("password")}
          helperText={AuthFormState.getError("password")}
        />
        <Button
          size="sm"
          mt={1}
          onClick={async () => {
            const isValid =
              AuthFormState.isValid("username") &&
              AuthFormState.isValid("password");
            if (isValid) {
              const res = await Api.post("/signin", {
                body: {
                  username,
                  password,
                },
              });
              console.log(res);

              console.log("Logging in with:", username, password);
            } else {
              console.log("Validation errors:", AuthFormState.getErrors());
            }
          }}
        >
          Sign in
        </Button>
      </Stack>
      <Stack gap={1}>
        <Stack
          flexRow
          gap={0.5}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text>Don't have an account?</Text>
          <Link
            color="brand.primary"
            userSelect="none"
            onClick={() => {
              AuthFormState.set("formType", "signup");
            }}
          >
            Sign Up
          </Link>
        </Stack>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Link
            color="brand.primary"
            userSelect="none"
            onClick={() => {
              AuthFormState.set("formType", "forgot");
            }}
          >
            Forgot Password?
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginForm;

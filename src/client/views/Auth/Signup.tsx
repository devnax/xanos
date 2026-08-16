import Stack from "@xanui/ui/Stack";
import Text from "@xanui/ui/Text";
import Input from "@xanui/ui/Input";
import Button from "@xanui/ui/Button";
import Link from "@xanui/ui/Link";
import AuthFormState from "./state";

const SignupForm = () => {
  const email = AuthFormState.get("email");
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
        <Text variant="h6">Create your account</Text>
        <Text color="text.secondary">
          Easily manage your autonomous voice assistants all in one dashboard.
        </Text>
      </Stack>
      <Stack gap={1}>
        <Input
          placeholder="Enter your email"
          size="sm"
          label="Email"
          value={email}
          onFocus={() => {
            AuthFormState.clearError("email");
          }}
          onChange={(e) => {
            AuthFormState.set("email", e.target.value);
          }}
          error={!!AuthFormState.getError("email")}
          helperText={AuthFormState.getError("email")}
        />
        <Input
          placeholder="Enter your password"
          type="password"
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
          onClick={() => {
            const isValid = AuthFormState.validate();
            if (isValid) {
              // Perform signup logic here
              console.log("Signing up with:", email, password);
            } else {
              console.log("Validation errors:", AuthFormState.getErrors());
            }
          }}
        >
          Sign Up
        </Button>
      </Stack>
      <Stack gap={1}>
        <Stack
          flexRow
          gap={0.5}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text>Already have an account?</Text>
          <Link
            color="brand.primary"
            userSelect="none"
            onClick={() => {
              AuthFormState.set("formType", "signin");
            }}
          >
            Sign In
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;

import Stack from "@xanui/ui/Stack";
import Text from "@xanui/ui/Text";
import Input from "@xanui/ui/Input";
import Button from "@xanui/ui/Button";
import Link from "@xanui/ui/Link";
import AuthFormState from "./state";

const ForgotForm = () => {
  const email = AuthFormState.get("email");
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
        <Text variant="h6">Reset your password</Text>
        <Text color="text.secondary">
          Enter your email to receive a password reset link.
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

        <Button
          size="sm"
          mt={1}
          onClick={() => {
            const isValid = AuthFormState.validate();
            if (isValid) {
              // Perform signup logic here
              console.log("Signing up with:", email);
            } else {
              console.log("Validation errors:", AuthFormState.getErrors());
            }
          }}
        >
          Reset Password
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

export default ForgotForm;

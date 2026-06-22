import { Button, Title, Text } from "@mantine/core";
import { IconSparkle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        <IconSparkle
          size={60}
          className="mx-auto text-violet-500 mb-4"
        />

        <Title c="white">
          Welcome to AskNova
        </Title>

        <Text c="dimmed" mt="sm">
          Your AI assistant powered by Gemini.
          Chat instantly, save conversations,
          and access them anywhere.
        </Text>

        <div className="flex flex-col gap-3 mt-8">

          <Button
            color="violet"
            size="md"
            onClick={() => navigate("/signin")}
          >
            Login
          </Button>

          <Button
            variant="light"
            color="violet"
            size="md"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>

          <Button
            variant="subtle"
            color="gray"
            size="md"
            onClick={() => navigate("/chat")}
          >
            Continue as Guest
          </Button>

        </div>

      </div>
    </div>
  );
}
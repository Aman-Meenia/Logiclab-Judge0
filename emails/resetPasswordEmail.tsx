import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Column,
  Hr,
  Img,
  Container,
  Link,
  Body,
} from "@react-email/components";

interface PasswordResetEmailProps {
  username: string;
  resetUrl: string;
}

export default function PasswordResetEmail({
  username,
  resetUrl,
}: PasswordResetEmailProps) {
  const baseUrl = "https://logiclab.dev";

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Your LogicLab Password</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      <Preview>Reset your LogicLab password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            {/* <Img */}
            {/*   src="/logo/logo.png" */}
            {/*   width="150" */}
            {/*   height="35" */}
            {/*   alt="LogicLab" */}
            {/*   style={logo} */}
            {/* /> */}
            <Text style={name}> LOGICLAB</Text>
          </Section>
          <Section style={content}>
            <Heading as="h2" style={heading}>
              Password Reset Request
            </Heading>
            <Text style={paragraph}>Hello {username},</Text>
            <Text style={paragraph}>
              We received a request to reset your password for your LogicLab
              account. Click the button below to create a new password:
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>
            <Text style={paragraph}>
              If you're having trouble with the button above, copy and paste the
              URL below into your web browser:
            </Text>
            <Text style={codeBlock}>{resetUrl}</Text>
            <Text style={paragraph}>
              If you didn't request a password reset, you can safely ignore this
              email. Your password will remain unchanged.
            </Text>
            <Text style={paragraph}>
              This link will expire in 30 minutes for security reasons.
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              LogicLab - The coding platform where developers solve real-world
              challenges.
            </Text>
            <Text style={footer}>
              © {new Date().getFullYear()} LogicLab. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  margin: "0 auto",
  maxWidth: "600px",
};

const logoContainer = {
  padding: "25px 0",
  textAlign: "center" as const,
  backgroundColor: "#1e293b",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "25px 35px",
};

const name = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ffffff",
  marginBottom: "15px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "15px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3c4043",
  margin: "16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#4f46e5",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  padding: "12px 30px",
  textAlign: "center" as const,
  display: "inline-block",
  fontWeight: "bold",
};

const codeBlock = {
  backgroundColor: "#f1f5f9",
  borderRadius: "4px",
  color: "#334155",
  padding: "12px",
  fontSize: "14px",
  fontFamily: "monospace",
  wordBreak: "break-all" as const,
  margin: "16px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "30px 0 20px",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "8px 0",
};

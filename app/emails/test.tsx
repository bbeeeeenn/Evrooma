import { Button, Html, Head, Body, Container, Img } from "react-email";

export default function Email() {
    return (
        <Html>
            <Head />
            <Body>
                <Container>
                    <Img
                        src="public/logo.png"
                        alt=""
                        width={300}
                        height={300}
                    />
                </Container>
                <Button
                    href="https://example.com"
                    style={{
                        background: "#000",
                        color: "#fff",
                        padding: "12px 20px",
                    }}
                >
                    Click me!
                </Button>
            </Body>
        </Html>
    );
}

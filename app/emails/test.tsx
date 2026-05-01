import { Button, Html, Head, Body, Container, Img } from "react-email";

export default function Email() {
    return (
        <Html>
            <Head />
            <Body>
                <div style={{ textAlign: "center" }}>
                    <Img
                        src="https://www.evrooma.online/logo.png"
                        alt=""
                        width={75}
                        height={75}
                    />
                </div>
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

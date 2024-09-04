import { Container, AppBar, Typography, Toolbar, Box, Button } from "@mui/material";
import Link from 'next/link'; // Ensure this is Next.js's Link
import SignIn from "../../../app/sign-in/sign-in.js";

export default function SignInPage() {
    return (
        <Container maxWidth="sm">
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <Link href="/login" passHref>
                        <Button color="inherit">Login</Button>
                    </Link>
                    <Link href="/signup" passHref>
                        <Button color="inherit">Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}  // Ensuring the sign-in box is vertically centered in most views
            >
                <Typography component="h4" variant="h4">
                    Sign In
                </Typography>
                <SignIn />
            </Box>
        </Container>
    );
}
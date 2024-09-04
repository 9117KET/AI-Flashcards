"use client"
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head"; // Import for Head to manage the document head
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { useClerk } from '@clerk/clerk-react'; // Import Clerk for authentication

export default function Home() {
  // Access Clerk's methods using useClerk for authentication
  const { openSignIn, openSignUp } = useClerk();

  return (
    <Container maxWidth="lg"> {/* Container for layout with max width */}
      <Head>
        <title>Flashcards SaaS</title>
        <meta name="description" content="Create, customize, and learn with diverse educational flashcards. Suitable for all learning levels." />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcards SaaS</Typography>
          <SignedOut>
            <Button color="inherit" onClick={() => openSignIn()}>
              Login
            </Button>
            <Button color="inherit" onClick={() => openSignUp()}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcards SaaS</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to create and learn with flashcards from your text</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }} textAlign="center">
        <Typography variant="h4" sx={{ my: 6, textAlign: "center" }}>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Simply input your text and our software will automatically create flashcards for you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              Our AI system will intelligently generate flashcards based on the content of your text.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible from anywhere</Typography>
            <Typography>
              Access your flashcards from anywhere with an internet connection on any device at any time.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: "2px" }}>
              <Typography variant="h5" component="h5" gutterBottom>Free</Typography>
              <Typography variant="h6" component="h6" gutterBottom>$0/month</Typography>
              <Typography>
                Access to basic flashcards features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Free Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: "2px" }}>
              <Typography variant="h5" component="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" component="h6" gutterBottom>$5/month</Typography>
              <Typography>
                Access to all flashcards features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: "2px" }}>
              <Typography variant="h5" component="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" component="h6" gutterBottom>$10/month</Typography>
              <Typography>
                Access to all flashcards features and unlimited storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Pro Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

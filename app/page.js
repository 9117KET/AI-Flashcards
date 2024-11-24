import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton, SignInButton} from "@clerk/nextjs"
import {Container, AppBar, Toolbar, Typography, Button, Box, Grid} from "@mui/material"
import Head from "next/head";
import ErrorBoundary from './components/ErrorBoundary';

// Define the Home component
export default function Home() {
  useEffect(() => {
    console.log('Home component mounted');
    return () => {
      console.log('Home component unmounted');
    };
  }, []);

  return (
    <Container maxWidth="lg"> {/* Corrected prop name */}
      {/** Set up the HTML head with metadata and title **/}
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create custom flashcards for your learning needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** Define the top navigation bar **/}
      <AppBar position="static">
        <Toolbar>
          {/** Site title **/}
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
            </Typography>
          {/** Temporarily remove login functionality
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Signup</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          **/}
        </Toolbar>
      </AppBar>
      <Box sx={{
        textAlign: 'center',
        marginTop: '100px',
      }}>
        <Typography variant="h3">Welcome to Flashcard SaaS</Typography>
        <Typography variant="subtitle1">Create custom flashcards for your learning needs</Typography>
        <Button variant="contained" color="primary">Get Started</Button>
      </Box>
      <Box>
        <Typography variant="h4"
        textAlign="center"
        sx={{
          marginTop: '100px',
        }}
        >

          Features
          </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>Our AI intelligently creates flashcards for you.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>Access your flashcards from anywhere and on any device. Study on the go with ease.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Easy text input</Typography>
              <Typography>Enter your text and we will automatically create flashcards for you. Creating flashcards has never been easier.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Smart Flashcards</Typography>
              <Typography>Our AI intelligently creates flashcards for you.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Accessible Anywhere</Typography>
              <Typography>Access your flashcards from anywhere and on any device. Study on the go with ease.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              height: '100%', // Ensure consistent height
              border: '1px solid #e0e0e0',
              borderColor: 'grey.300',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <Typography variant="h6">Easy text input</Typography>
              <Typography>Enter your text and we will automatically create flashcards for you. Creating flashcards has never been easier.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

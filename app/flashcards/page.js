'use client' // Directive for Next.js to run this module only on the client-side.

import { useUser } from '@clerk/nextjs' // Imports the useUser hook from Clerk for user authentication.
import { useEffect, useState } from 'react' // Imports React hooks for managing side-effects and state.
import { collection, doc, getDocs } from 'firebase/firestore' // Imports Firestore functions to interact with Firestore database.
import { db } from '@/firebase' // Imports the initialized Firestore database instance.
import { useSearchParams } from 'next/navigation' // Imports a hook from Next.js to access the URL search parameters.
import Container from '@mui/material/Container' // Imports Container component from Material-UI for layout.
import Grid from '@mui/material/Grid' // Imports Grid component for creating grid layouts.
import { Box, Typography, Card, CardActionArea, Button } from '@mui/material' // Imports various Material-UI components for UI design.
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs' // Imports components from Clerk to handle authenticated and unauthenticated states.
import { AppBar, Toolbar } from '@mui/material' // Imports AppBar and Toolbar for top navigation bar.

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser() // Uses the useUser hook to get user authentication status and user data.
    const [flashcards, setFlashcards] = useState([]) // State hook for storing flashcards.
    const [flipped, setFlipped] = useState([]) // State hook to track which cards are flipped.

    const searchParams = useSearchParams() // Hook to access URL search parameters.
    const search = searchParams.get('id') // Retrieves 'id' parameter from URL which is used to fetch specific flashcards.

    useEffect(() => { // React hook to handle side-effects.
        async function getFlashcard() {
            if (!search || !user) return // Exits if no search parameter or user is found.
            const colRef = collection(doc(collection(db, 'users'), user.id), search) // Constructs a reference to a subcollection under a specific user document.
            const docs = await getDocs(colRef) // Fetches documents from the Firestore collection.
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() }) // Maps each document into flashcards array.
            })

            setFlashcards(flashcards) // Updates the flashcards state with fetched data.
        }

        getFlashcard()
    }, [user, search]) // Effect dependencies, effect runs when `user` or `search` changes.

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggles the flipped state for a card.
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div> // Displays loading message if user data is not loaded or user is not signed in.
    }

    return (
        <Container maxWidth="100vw">
            <AppBar position="fixed" style={{ width: '100%' }}>
                <Toolbar>
                    <Button
                        color="inherit"
                        href="/"
                        sx={{ padding: '10px 20px', fontSize: '1.3rem', minWidth: '180px' }} // Styled button for navigation.
                    >
                        Flashcard SaaS
                    </Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color="inherit" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3} sx={{ mt: 12 }}>
            {flashcards.length > 0 && (
                    <Box sx={{ mt: 4, width: '100%' }}>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={6} key={index}> {/* Maps each flashcard to a grid item. */}
                                    <Card sx={{ height: '200px', perspective: '1000px' }}> {/* Styles the card with 3D perspective. */}
                                        <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                                            <Box sx={{
                                                height: '100%',
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)', // Controls the flip animation.
                                            }}>
                                                <Box sx={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    backgroundColor: 'lightblue', // Front face styling.
                                                }}>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    transform: 'rotateY(180deg)',
                                                    backgroundColor: 'lightgreen', // Back face styling.
                                                }}>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Container>
    )
}
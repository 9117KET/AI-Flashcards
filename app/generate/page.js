"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { db } from "@/firebase";
import { Firestore, writeBatch, doc, collection, getDoc} from "firebase/firestore"
import { Box, Container, Typography, Paper, TextField, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
const punycode = require('punycode');

export default function Generate() {
    const { user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();
        })
        .then(text => {
            return text.length ? JSON.parse(text) : {};
        })
        .then(data => setFlashcards(data))
        .catch(error => console.error('Error:', error));
    }

    const handleCardClick = (id) => {
        setFlipped(prev => ({ 
            ...prev,
            [id]: !prev[id],
        }));
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        try {
            if (!name) {
                alert("Please enter a name for the flashcard set.");
                return;
            }
            const db = Firestore(); // Assuming Firestore() is the correct way to initialize
            const batch = writeBatch(db);
            const userDocRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                let userFlashcards = docSnap.data().flashcards || [];
                if (userFlashcards.some(f => f.name === name)) {
                    alert("A flashcard set with this name already exists. Please choose a different name.");
                    return;
                } else {
                    userFlashcards.push({ name, flashcards });
                    batch.set(userDocRef, { flashcards: userFlashcards }, { merge: true });
                }
            } else {
                batch.set(userDocRef, { flashcards: [{ name, flashcards }] });
            }
            const colRef = collection(userDocRef, name);
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef);
                batch.set(cardDocRef, flashcard);
            });
            await batch.commit();
            handleClose();
            router.push('/flashcards');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('Failed to save flashcards.');
        }
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Generate Flashcards
                </Typography>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <TextField 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        label="Enter Text" 
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Generate
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Flashcards Generated
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: '2px',
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.question}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.answer}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={handleOpen}>
                            Save Flashcards
                        </Button>
                    </Box>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name for your flashcard collection
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        label='Collection Name'
                        type='text'
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant='outlined'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
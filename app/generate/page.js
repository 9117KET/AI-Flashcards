"use client"
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from 'next/router'; 


export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [ flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();


    const handleSubmit = async ()=>{
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then(res=>res.json())
        .then(data => setFlashcards(data))

    }
    const handleCardClick = (id) => {
        setFlipped(prev => ({ 
            ...prev,
            [id]: !prev[id],
        }));
    }
    const handleOpen = ()=>{
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleSave = async () => {
        if (!name) {
            alert("Please enter a name for the flashcard set.");
            return;
        }
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
        await batch.commit();
        handleClose();
        router.push('/flashcards');
        
    }

}
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '~/lib/utils/firebaseConfig';

type StoredContentItem = {
    id: string;
    text: string;
}
const StoredContent = () => {
    const [storedContent, setStoredContent] = useState<StoredContentItem[]>([]);

    useEffect(() => {
        const fetchStoredContent = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'content'));
            const contentList = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                id: doc.id,
                ...doc.data()
            })) as StoredContentItem[];
            setStoredContent(contentList);
        };

        fetchStoredContent();
    }, []);

    return (
        <Box
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            h="100%"
            overflowY="auto"
            backgroundColor={'white'}
        >
            {storedContent.length > 0 ? (
                storedContent.map(content => (
                    <Box key={content.id} bg="black" borderRadius="lg" p={8} m={4} textAlign="center" fontSize="xl">
                        {content.text}
                    </Box>
                ))
            ) : (
                <Box textAlign="center" fontSize="xl" color="black">
                    No content available. Swipe right to generate new content.
                </Box>
            )}
        </Box>
    );
};

export default StoredContent;

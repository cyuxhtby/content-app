import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '~/lib/utils/firebaseConfig'; 

const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

const NewContent = () => {
  const [content, setContent] = useState('Swipe up for new content!');

  useEffect(() => {
    fetchNewContent();
  }, []);

  const fetchNewContent = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: "text-davinci-003",
          prompt: 'Tell me a single, interesting fact about science or history.',
          max_tokens: 60,
          temperature: 0.7,
        },
        {
          headers: { 'Authorization': `Bearer ${OPEN_AI_API_KEY}` },
        }
      );

      const newContent = response.data.choices[0].text.trim();
      setContent(newContent);

      // Save to Firestore
      await addDoc(collection(firestore, 'content'), { text: newContent });

    } catch (error) {
      console.error('Error fetching new content:', error);
      setContent('Failed to load new content. Try again later.');
    }
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Box
        bg="gray.100"
        borderRadius="lg"
        p={8}
        m={4}
        textAlign="center"
        fontSize="xl"
        color="black"
        w="full"
        h="full"
        overflowY="auto"
      >
        {content}
      </Box>
      <Button colorScheme="blue" size="lg" onClick={fetchNewContent}>
        Get New Fact
      </Button>
    </Box>
  );
};

export default NewContent;

'use client'

import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import SignIn from '~/lib/components/SignIn';
import { useAuth } from '~/lib/contexts/AuthContext';
import axios from 'axios';


const OPEN_AI_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

const Home = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('Loading...');

  const swipeThreshold = 50;

  const fetchFact = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-003",
        prompt: 'Tell me a single, interesting fact about science or history.',
        max_tokens: 60,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${OPEN_AI_API_KEY}`
        }
      });
  
      const fact = response.data.choices[0].text.trim().split('\n')[0]; 
      setContent(fact);
    } catch (error) {
      console.error('Error fetching fact:', error);
      setContent('Failed to load fact');
    }
  };

  const handleSwipe = (event: any, info: any) => {
    const offset = info.offset.y;
    if (Math.abs(offset) > swipeThreshold) {
      fetchFact();
    }
  };

  const variants = {
    initial: { opacity: 0, scale: 0.8, y: 300 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } },
    exit: { opacity: 0, scale: 0.8, y: -300, transition: { duration: 0.5, type: 'spring', stiffness: 100 } },
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
      position="relative"
      bg="white"
      overflow="hidden"
    >
      {!user ? (
        <SignIn />
      ) : (
        <AnimatePresence>
          <motion.div
            key={content}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            onDragEnd={handleSwipe}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
            }}
          >
            <Box
              p={4}
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={["md", "lg", "xl", "2xl"]} 
              textAlign="center" 
              color="black"
              overflowWrap="break-word" 
            >
              {content}
            </Box>
          </motion.div>
        </AnimatePresence>
      )}
    </Flex>
  );
}  

export default Home;
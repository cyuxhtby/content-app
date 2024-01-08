'use client'

import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import SignIn from '~/lib/components/SignIn';
import StoredContent from '~/lib/components/StoredContent';
import NewContent from '~/lib/components/NewContent';
import { useAuth } from '~/lib/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [showNewContent, setShowNewContent] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setShowNewContent(false),
    onSwipedRight: () => setShowNewContent(true),
    trackMouse: true
  });

  return (
    <Flex
      {...handlers}
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
      position="relative"
      overflow="hidden"
    >
      {!user ? (
        <SignIn />
      ) : (
        <AnimatePresence>
          {showNewContent ? (
            <NewContent />
          ) : (
            <StoredContent />
          )}
        </AnimatePresence>
      )}
    </Flex>
  );
};

export default Home;

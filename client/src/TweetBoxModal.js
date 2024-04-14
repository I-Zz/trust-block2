import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import TweetBox from './TweetBox';

function TweetBoxModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <TweetBox />
      </DialogContent>
    </Dialog>
  );
}

export default TweetBoxModal;
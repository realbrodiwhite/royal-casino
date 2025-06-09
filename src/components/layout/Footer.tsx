
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-1.5 sm:py-2 text-[9px] sm:text-[10px] text-muted-foreground border-t border-border">
      <p className="whitespace-nowrap">
        &copy; {currentYear} Built By Brodi. All Rights Reserved. For entertainment purposes only. Play responsibly.
      </p>
    </footer>
  );
};

export default Footer;

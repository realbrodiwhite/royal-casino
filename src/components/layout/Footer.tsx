
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground border-t border-border">
      <p>&copy; {currentYear} Built By Brodi. All Rights Reserved.</p>
      <p>For entertainment purposes only. Play responsibly.</p>
    </footer>
  );
};

export default Footer;

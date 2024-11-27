import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

export const Header = ({language, setLanguage, translations}) => {
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {translations.title || 'Test'}
        </Typography>
        <div>
          <IconButton
            onClick={handleClick}
            sx={{ color: 'white' }}
            aria-controls={open ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'language-button',
            }}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('es')}>Español</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

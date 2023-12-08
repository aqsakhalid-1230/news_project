import React from 'react';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { ThemeSelectorProps } from '../types/ThemeSelectorProps';

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ darkMode, setDarkMode }) => {
  return (
    <FormGroup data-testid="theme-selector">
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            icon={<Brightness7Icon style={{ color: 'black' }} />}
            checkedIcon={<NightsStayIcon />}
          />
        }
        label={darkMode ? 'Dark Mode' : 'Light Mode'}
      />
    </FormGroup>
  );
};

export default ThemeSelector;

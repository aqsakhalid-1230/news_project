import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LanguageSelectorProps } from '../types/LanguageSelectorProps';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  const theme = useTheme();

  return (
    <FormControl variant="outlined" style={{ minWidth: 120, margin: theme.spacing(1) }} data-testid="language-selector">
      <InputLabel>Language</InputLabel>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        label="Language"
      >
        <MenuItem value="en">
          <span role="img" aria-label="English">🇬🇧 English</span>
        </MenuItem>
        <MenuItem value="ar">
          <span role="img" aria-label="Arabic">🇦🇪 العربية</span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;

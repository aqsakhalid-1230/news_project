import React from 'react';
import { Chip } from '@mui/material';
import { TopicsSelectorProps } from '../types/TopicsSelectorProps'; // Update the import path as necessary

const TopicsSelector: React.FC<TopicsSelectorProps> = ({ selectedTopic, setSelectedTopic }) => {
  const topics = ['apple', 'google', 'netflix', 'twitter', 'tesla'];
  
  return (
    <div data-testid="topics-selector">
      {topics.map((topic) => (
        <Chip
          key={topic}
          label={topic.charAt(0).toUpperCase() + topic.slice(1)}
          onClick={() => setSelectedTopic(topic)}
          color={selectedTopic === topic ? 'primary' : 'default'}
          style={{ margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default TopicsSelector;

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopicsSelector from '../components/TopicsSelector';

describe('TopicsSelector Component', () => {
  const topics = ['apple', 'google', 'netflix', 'twitter', 'tesla'];

  it('renders all types of topics by default', () => {
    render(<TopicsSelector selectedTopic="apple" setSelectedTopic={() => {}} />);
    topics.forEach((topic) => {
      expect(screen.getByText(topic.charAt(0).toUpperCase() + topic.slice(1))).toBeInTheDocument();
    });
  });

  it('renders selected chip topic when a chip is clicked', () => {
    const setSelectedTopicMock = jest.fn();
    render(<TopicsSelector selectedTopic="apple" setSelectedTopic={setSelectedTopicMock} />);

    const newTopic = 'tesla';
    const newTopicChip = screen.getByText(newTopic.charAt(0).toUpperCase() + newTopic.slice(1));
    fireEvent.click(newTopicChip);

    expect(setSelectedTopicMock).toHaveBeenCalledWith(newTopic);
  });
});

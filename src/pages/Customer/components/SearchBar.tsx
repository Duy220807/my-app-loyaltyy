import { Card, Input } from 'antd';
import React from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Card>
      <Input.Search
        placeholder="Search by name, email, or phone"
        enterButton="Search"
        onSearch={onSearch}
        style={{ maxWidth: 400 }}
      />
    </Card>
  );
};

export default SearchBar;

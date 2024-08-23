// GuideSection.js
import React from 'react';
interface GuideSectionProps {
    title: string;
    content: string;
  }
const GuideSection :React.FC<GuideSectionProps> = ({ title, content }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default GuideSection;

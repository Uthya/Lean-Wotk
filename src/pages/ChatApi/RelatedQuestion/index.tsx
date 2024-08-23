
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { ChatAiContext } from '../index';
import AddIcon from '@mui/icons-material/Add';

const RelatedQuestion: React.FC = () => {
  const { relatedQuestion,  setSelectRelatedQuestion } = useContext(ChatAiContext);

  const getRelatedQuestion = (data: any) => {
    setSelectRelatedQuestion(data);
  }

  return (

    <Box sx={{ padding: '20px 42px', margin: 'auto' }}>
      {/* Related Questions Accordion Section */}
      <Typography variant="h6" gutterBottom sx={{ fontSize: "18px", lineHeight: "21.6px" }}>
        Related Questions
      </Typography>

      <div style={{ margin: "1.5rem 0 0 1rem" }}>
        {relatedQuestion?.map((value: any, index: number) => (
          <div key={index} style={{ borderTop: "2px solid #8080804a", display: "flex", alignItems: "center" }} onClick={() => getRelatedQuestion(value)}>
            <Typography sx={{ fontSize: "14px", lineHeight: "24px", margin: '0.7rem 0 0.7rem 0', flex: "1", "&:hover": { color: "#48c9b0" } }}>
              {value}
            </Typography>
            <AddIcon sx={{ color: "grey", "&:hover": { color: "#48c9b0" } }} />
          </div>
        ))}

      </div>
    </Box>
  );
}

export default RelatedQuestion


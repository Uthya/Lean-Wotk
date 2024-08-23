import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

export default function SimpleAccordion() {
    return (
      <Box sx={{ padding: '20px 42px', margin: 'auto' }}>
  
        {/* Related Questions Accordion Section */}
        <Typography variant="h6" gutterBottom sx={{fontSize:"18px",lineHeight:"21.6px"}}>
          Related Questions
        </Typography>
  
        <Accordion sx={{boxShadow:"none"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontSize:"14px",lineHeight:"24px"}}>
              Nulla lobortis ex nec lorem posuere, pretium euismod risus dapibus?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Answer to the question goes here...
            </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion sx={{boxShadow:"none"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontSize:"14px",lineHeight:"24px"}}>
              Fusce egestas lectus vitae facilisis efficitur
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Answer to the question goes here...
            </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion sx={{boxShadow:"none"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontSize:"14px",lineHeight:"24px"}}>
              Praesent a libero quis turpis sagittis interdum sed in magna
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Answer to the question goes here...
            </Typography>
          </AccordionDetails>
        </Accordion>
  
        <Accordion sx={{boxShadow:"none"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{fontSize:"14px",lineHeight:"24px"}}>
              Vestibulum eget odio vitae sapien scelerisque molestie in ac mauris
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Answer to the question goes here...
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
}

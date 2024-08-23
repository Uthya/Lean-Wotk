import React  from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Box from '@mui/material/Box';
import AppAnimate from '../AppAnimate';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type AppComponentAnswerProps = {
    question: string;
    title: string;
    tips: any;
};

const AppComponentAnswer: React.FC<AppComponentAnswerProps> = ({
    question,
    title,
    tips
}) => {
     return (
        <AppAnimate animation='transition.slideUpIn' delay={200} >
            <Card sx={{ borderRadius: "1px", boxShadow: "none", padding: "16px 10px 0px 20px" }}>
                <CardHeader
                    sx={{
                        py: 4,
                        pb: 2,
                        pl: 4,
                        pr: 5,
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 50,
                        boxSizing: 'border-box',
                        '& .MuiTypography-h5': {
                            fontSize: "22px",
                            fontWeight: "500",
                            marginBottom: 0.25,
                        },
                    }}
                    title={question}
                    subheader={"Answer"}
                    subheaderTypographyProps={{
                        fontSize: "1rem",
                        marginTop: "2rem",
                        fontWeight: "500",
                        color: "#000"
                    }}
                    root={{
                        subheader: {
                            fontSize: 13,
                        },
                    }}
                // action={
                //     source ? (
                //         <Box>
                //             <IconButton
                //                 aria-label='view code'
                //                 onClick={() => {
                //                     if (animation) {
                //                         setAnimation(!animation);
                //                         setTimeout(() => setToggleViewSource(!viewSource), 400);
                //                     } else {
                //                         setAnimation(!animation);
                //                         setToggleViewSource(!viewSource);
                //                     }
                //                 }}
                //                 size='large'
                //             >
                //                 <CodeIcon />
                //             </IconButton>
                //         </Box>
                //     ) : null
                // }
                />

                <CardContent sx={{ px: 4, pt: 2 }} style={{ paddingBottom: "8px" }}>


                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            paddingBottom: "0px",
                            backgroundColor: "transparent",

                        }}
                    >
                        <Box sx={{ marginBottom: '30px',width:"100%" }}>
                            <Typography variant="body1" style={{ lineHeight: "26px", fontSize: "1rem", fontWeight: 500 }} paragraph>
                                {title}
                            </Typography>
                            {tips?.map((item: { heading: string; content: any }, index: React.Key | null | undefined) => (
                                <Box key={index} sx={{ marginBottom: 2, width: "100%" }} >
                                {item.content.length <= 1 ? (
                                    <Typography >                                        
                                        <span style={{ lineHeight: "26px", fontSize: "1rem", fontWeight: 500 }}>
                                            {item.heading}
                                        </span> <span style={{ fontWeight: 500, fontSize: "1rem" }}>: </span>      
                                        <span style={{ lineHeight: "26px", fontSize: "1rem"}}>
                                            { item.content[0].value}
                                        </span>
                                    </Typography>
                                ):
                                <div>
                                {item.content.map((contentItem: { key: number; value: string }) => (
                                  <div key={contentItem.key} style={{ lineHeight: "26px", fontSize: "1rem",margin:"6px 0px 6px 0px" }}>
                                    {contentItem.value}
                                  </div>
                                ))}
                              </div>
                                }
                                </Box>
                            ))}

                            {/* Related Questions Accordion Section */}
                            <Typography variant="h6" gutterBottom style={{ fontSize: "18px", lineHeight: "21.6px", fontWeight: "500", marginTop: "2rem" }}>
                                Related Questions
                            </Typography>

                            <Accordion style={{ marginTop: "1.5rem", boxShadow: "none" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={{ padding: "8px 0px 8px 0px", fontWeight: "500" }}>
                                        Nulla lobortis ex nec lorem posuere, pretium euismod risus dapibus?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography >
                                        Answer to the question goes here...
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={{ boxShadow: "none" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={{ padding: "8px 0px 8px 0px", fontWeight: "500" }}>
                                        Fusce egestas lectus vitae facilisis efficitur
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Answer to the question goes here...
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={{ boxShadow: "none" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={{ padding: "8px 0px 8px 0px", fontWeight: "500" }}>
                                        Praesent a libero quis turpis sagittis interdum sed in magna
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Answer to the question goes here...
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion style={{ boxShadow: "none" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography style={{ padding: "8px 0px 8px 0px", fontWeight: "500" }}>
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
                        {/* <p style={{ lineHeight: "26px", fontSize: "1rem" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum isimply dummy text of the printing and typesetting industry.</p> */}
                    </Box>




                </CardContent>
                
            </Card>
        </AppAnimate>
    );
};

export default AppComponentAnswer;



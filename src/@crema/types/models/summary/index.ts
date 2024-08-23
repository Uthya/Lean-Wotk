export type SummaryDetails = {
  id: number;
  project_name: string;
  risk_level:string;
  risk_description: string;
  summary: string;
  };
  
  export type SummaryData = {
    title:string;
    SummaryDetail:SummaryDetails[];
  };

  
import { Website } from "./website.model";
export interface Page {
    _id?: string;
    domain: string;
    website: Website;
    status: PageStatus;
    registryDate: String;
    lastEvaluationDate?: String
  }
  
  export enum PageStatus {
    REGISTERED = "Por Avaliar",
    IN_EVALUATION = "Em avaliação",
    CONFIRMED = "Confirmado",
    NOT_CONFIRMED = "Não confirmado",
    EVALUATION_ERROR = "Erro na avaliação"
  }
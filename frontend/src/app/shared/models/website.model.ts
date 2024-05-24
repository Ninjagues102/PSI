import { Page } from "./page.model";

export interface Website {
  _id?: string;
  domain: string;
  pages: Page[];
  status?: WebsiteStatus;
  registryDate?: Date;
  lastEvaluationDate?: Date
}

export enum Protocol {
  HTTP = "http://",
  HTTPS = "https://"
}

export enum WebsiteStatus {
  REGISTERED = "Por Avaliar",
  IN_EVALUATION = "Em Avaliação",
  EVALUATED = "Avaliado",
  EVALUATION_ERROR = "Erro na avaliação"
}

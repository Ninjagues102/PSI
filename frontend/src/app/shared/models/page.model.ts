import { Website } from "./website.model";

export interface Page {
    _id?: string;
    relativePath: string;
    status?: PageStatus;
    registryDate?: Date;
    lastEvaluationDate?: Date
  }

  export enum PageStatus {
    REGISTERED = "Por Avaliar",
    IN_EVALUATION = "Em avaliação",
    CONFIRMED = "Confirmado",
    NOT_CONFIRMED = "Não confirmado",
    EVALUATION_ERROR = "Erro na avaliação"
  }

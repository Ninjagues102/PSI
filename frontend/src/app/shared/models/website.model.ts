export interface Website {
  _id?: string;
  domain: string;
  status: WebsiteStatus;
  registryDate: String;
  lastEvaluationDate?: String
}

export enum WebsiteStatus {
  REGISTERED = "Por Avaliar",
  IN_EVALUATION = "Em avaliação",
  EVALUATED = "Avaliado",
  EVALUATION_ERROR = "Erro na avaliação"
}

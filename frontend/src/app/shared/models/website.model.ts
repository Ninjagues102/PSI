export interface Website {
  _id?: string;
  protocol: Protocol;
  domain: string;
  status: WebsiteStatus;
  registryDate: String;
  lastEvaluationDate?: String
}

export interface WebsiteRegistration {
  protocol: Protocol;
  domain: string;
}

export enum Protocol {
  HTTP = "http://",
  HTTPS = "https://"
}

export enum WebsiteStatus {
  REGISTERED = "Por Avaliar",
  IN_EVALUATION = "Em avaliação",
  EVALUATED = "Avaliado",
  EVALUATION_ERROR = "Erro na avaliação"
}

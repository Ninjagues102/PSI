export interface Page {
    _id?: string;
    relativePath: string;
    status?: PageStatus;
    registryDate?: Date;
    lastEvaluationDate?: Date
  }

export enum PageStatus {
  REGISTERED = "Por Avaliar",
  COMPLIANT = "Conforme",
  NON_COMPLIANT = "Não conforme",
  ERROR = "'Erro na avaliação"
}

export interface PageProcessDto {
  pages: [ Page ];
}

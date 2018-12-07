import DateTimeFormat = Intl.DateTimeFormat;

export interface Issue {
  id: String;
  title: String;
  responsible: String;
  description: String;
  severity: String;
  status: String;
  creationDate: Date;
}

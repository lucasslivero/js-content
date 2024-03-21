import { IncomingHttpHeaders } from 'http';

export interface IRequest {
  body: Record<string, any>;
  headers: IncomingHttpHeaders;
  account?: {
    id: string;
    role: {
      id: string;
      name: string;
    };
  };
}

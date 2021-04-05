import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { DocumentDto } from './models/DocumentDto';

class DocumentService extends BaseService {
  protected static BASE_URL = '/documents';

  public static async upload(data: FormData): Promise<DocumentDto> {
    try {
      const resp = await this.post<ResponseWrapper<DocumentDto>>('', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async download(documentId: number, name?: string, extension?: string): Promise<boolean> {
    try {
      const resp = await this.get<any>(`/${documentId}`, {}, { responseType: 'blob' });
      const blob = new Blob([resp.data], { type: 'application/octet-stream' });
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.target = '_blank';
      if (!name || !extension) {
        const desp = resp.headers['content-disposition'];
        if (desp) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(desp);
          if (matches != null && matches[1]) {
            const filename = matches[1].replace(/['"]/g, '');
            a.download = filename;
          }
        }
      } else {
        a.download = name + extension;
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    } finally {
      return false;
    }
  }
}
export default DocumentService;

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { Express } from 'express';
import path from 'path';

export const setupSwaggerDocs = (app: Express): void => {
  const swaggerDocument = yaml.load(path.join(__dirname, 'swagger', 'swagger.yaml'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

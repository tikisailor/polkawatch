import { Injectable } from '@nestjs/common';
import { QueryParameters } from './queryParameters.dtos';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { QueryResponse } from './queryReponse.dtos';
import { ApiResponse } from '@elastic/elasticsearch';

export type QueryResponseTransformer = (rawResponse: any) => QueryResponse;
export type QueryTemplate = (params: QueryParameters) => any;

@Injectable()
export class IndexQueryService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async runQuery(
    parameters: QueryParameters,
    queryTemplate: QueryTemplate,
    resultTransformer: QueryResponseTransformer,
  ): Promise<QueryResponse> {
    const rawResponse: ApiResponse = await this.elasticsearchService.search({
      index: 'pw_reward',
      track_total_hits: true,
      body: queryTemplate(parameters),
    });

    return resultTransformer(rawResponse);
  }
}

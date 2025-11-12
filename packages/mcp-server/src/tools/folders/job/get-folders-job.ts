// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@imagekit/api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@imagekit/api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImageKit from '@imagekit/nodejs';

export const metadata: Metadata = {
  resource: 'folders.job',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/bulkJobs/{jobId}',
  operationId: 'bulk-job-status',
};

export const tool: Tool = {
  name: 'get_folders_job',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis API returns the status of a bulk job like copy and move folder operations.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/job_get_response',\n  $defs: {\n    job_get_response: {\n      type: 'object',\n      properties: {\n        jobId: {\n          type: 'string',\n          description: 'Unique identifier of the bulk job.\\n'\n        },\n        purgeRequestId: {\n          type: 'string',\n          description: 'Unique identifier of the purge request. This will be present only if `purgeCache` is set to `true` in the rename folder API request.\\n'\n        },\n        status: {\n          type: 'string',\n          description: 'Status of the bulk job.',\n          enum: [            'Pending',\n            'Completed'\n          ]\n        },\n        type: {\n          type: 'string',\n          description: 'Type of the bulk job.',\n          enum: [            'COPY_FOLDER',\n            'MOVE_FOLDER',\n            'RENAME_FOLDER'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['jobId'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImageKit, args: Record<string, unknown> | undefined) => {
  const { jobId, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.folders.job.get(jobId)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };

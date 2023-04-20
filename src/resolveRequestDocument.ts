import type { DocumentNode, OperationDefinitionNode } from 'graphql'
import { RequestDocument } from './types'

/**
 * helpers
 */

function extractOperationName(document: DocumentNode): string | undefined {
  let operationName = undefined

  const operationDefinitions = document.definitions.filter(
    (definition) => definition.kind === 'OperationDefinition'
  ) as OperationDefinitionNode[]

  if (operationDefinitions.length === 1) {
    operationName = operationDefinitions[0].name?.value
  }

  return operationName
}

export function resolveRequestDocument(document: RequestDocument): { query: string; operationName?: string } {
  if (typeof document === 'string') {
    throw Error("String documents are not supported. Use the full graphql-request instead");
  }

  const operationName = extractOperationName(document)
  const location = document.loc
  if (!location) {
    throw Error("DocumentNode must include location. Use the full graphql-request instead")
  }

  return { query: location.source.body, operationName }
}

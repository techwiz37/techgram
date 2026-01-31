export type ObjectDefinition = [number,  [string, string][],  string ];

export interface Schema {
  readonly definitions: Record<string, ObjectDefinition>;
  readonly identifierToName: Record<string, string>;
}

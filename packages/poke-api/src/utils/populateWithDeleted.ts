import { DocumentType } from '@typegoose/typegoose'

export function populateWithDeleted<T> (
  doc: DocumentType<T>, path: string,
): Promise<DocumentType<T>> {
  return doc.populate({
    path,
    match: {
      isDeleted: {
        $exists: true,
      },
    },
  }).execPopulate() as Promise<DocumentType<T>>
}

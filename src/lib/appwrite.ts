const APPWRITE_ENDPOINT = 'https://api.rosenheim-dev.de'
const APPWRITE_API_KEY = 'standard_da7eb24e1123424f28781159ecb20048f48d71dd0fb1d83298979d2cea7ef0215f314185c79bcb27102a620d25f51da1e03999a75014acc4784f1f5b8cdbf3ee90f79b5029d8ebba42382ce8da11efd775b6f1131ebd60d3939568fef398b1a24cf53fdcf1133cafc7a558e8655540d38e192cf54749327b67d183761abf7b55'

export interface AppwriteConfig {
  databaseId: string
  collections: {
    users: string
    headerData: string
    services: string
    projects: string
    references: string
    contactSubmissions: string
    aboutFeatures: string
    aboutContent: string
  }
}

export async function createDocument(
  databaseId: string,
  collectionId: string,
  data: any,
  documentId?: string
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents`
  
  const body = documentId 
    ? { documentId, data }
    : { documentId: 'unique()', data }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': databaseId,
      'X-Appwrite-Key': APPWRITE_API_KEY,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create document: ${error}`)
  }

  return response.json()
}

export async function listDocuments(
  databaseId: string,
  collectionId: string
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': databaseId,
      'X-Appwrite-Key': APPWRITE_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to list documents: ${error}`)
  }

  return response.json()
}

export async function getDocument(
  databaseId: string,
  collectionId: string,
  documentId: string
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': databaseId,
      'X-Appwrite-Key': APPWRITE_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get document: ${error}`)
  }

  return response.json()
}

export async function updateDocument(
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: any
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': databaseId,
      'X-Appwrite-Key': APPWRITE_API_KEY,
    },
    body: JSON.stringify({ data }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to update document: ${error}`)
  }

  return response.json()
}

export async function deleteDocument(
  databaseId: string,
  collectionId: string,
  documentId: string
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents/${documentId}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': databaseId,
      'X-Appwrite-Key': APPWRITE_API_KEY,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to delete document: ${error}`)
  }

  return response.json()
}

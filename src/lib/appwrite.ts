const APPWRITE_ENDPOINT = 'https://api.rosenheim-dev.de'
const APPWRITE_API_KEY = ''

export async function createDocument(
  databaseId: string,
  collectionId: string,
  data: any,
  documentId?: string
) {
  const url = `${APPWRITE_ENDPOINT}/v1/databases/${databaseId}/collections/${collectionId}/documents`
  
  const body = documentId 
    ? { documentId, data }
    : { data }

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

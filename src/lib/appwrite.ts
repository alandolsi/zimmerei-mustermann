const APPWRITE_ENDPOINT = 'https://api.rosenheim-dev.de'


    users: string
    services: string
    references: 
    aboutFeatures
  }

  databaseId: string
  data: any,
) {
  
    ? { documentId, data

 

      'X-Appwrite-Key': APPWRITE_API_
    body: JSON.string

    const er
  }
  r

  
) {

    method: 'GET',

      'X-Appwrite-Key': APPWRITE_API_
  })
  if (!respons
    throw new Error(`Failed to list docum

}
export
  collectionId: string,
) {

    method: 'GET',
      'Content-Type': 'application/json
      'X-Appwrite-Key': APPWRITE_API_KEY,
  }

    throw new Error(`Fai


export async function updateDocument
  collectionId: strin
  data: any
  c
  const response = await fetch(url, {

      'X-Appwrite-Project': databaseI
    },
  })
  if (!response.ok) {
    throw new Error(`Failed to update d

}
expo

) {

    method: 'DELETE',
   

  })
 


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

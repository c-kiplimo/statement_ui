type Templates ={
    payload : Array<{id: number,
    category: string,
    templateType: string,
    path: string,
    description: string,
    templateName: string,
    language: string,
    createdAt: string,
    updatedAt: string}>
}

type UserTemplates ={
    templateId: number,
    customerTemplateId: number,
    customerId: number,
    category: string,
    templateType: string,
    path: string,
    description:string,
    templateName: string,
    language: string,
    createdAt: string,
    updatedAt: string
  }
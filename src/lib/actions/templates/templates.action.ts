import { TemplateTypes } from "@/src/app/statement/(protected)/template/add-template/(add-template-modal)/add.template.modal";
import { TemplatesTypesData } from "@/src/app/statement/(protected)/template/add-template/(template-table)/template.table";
import { TemplateCategory } from "@/src/app/statement/(protected)/template/add-template/page";
import TemplatesHandler from "@/src/services/templates/templates.service";

const handler = TemplatesHandler();

export const allTemplatesAction =async (page:number, size:number):Promise<TemplateTypes[]>=>{
    const response:Templates = await handler.fetchAllTemplates(page,size);
    
    const templates:TemplateTypes[] = response.payload.map(data=>({
        id:data.id,
        templateName:data.templateName,
        templateDescription:data.description,
    }))
    
    return templates;
}


export const fetchUserTemplates =  async (id:number):Promise<TemplatesTypesData[]> =>{
    const response:UserTemplates[] = await handler.getUserTemplates(id);
    
    const templates:TemplatesTypesData[] = response.map((data)=>({
        key: data.templateId!.toString(),
        dateCreated:data.createdAt,
        templateName:data.templateName,
        category:data.category,
        dateModified:data.updatedAt
    }))
    
    return templates
}

export const fetchTemplatesCategory =  async (id:number):Promise<TemplateCategory[]> =>{
    const response:UserTemplates[] = await handler.getUserTemplates(id);
    
    const categories:TemplateCategory[] = response.map((data)=>({
        label:data.category,
        value:data.category
    }))

    const uniqueCategories = Array.from(
        new Map(categories.map((category) => [category.label, category])).values()
      );
    console.log(uniqueCategories);
    
    return uniqueCategories;
}



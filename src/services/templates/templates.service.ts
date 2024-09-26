import { TEMPLATES, USER_TEMPLATES } from "@/src/constants/environment";
import { notification } from "antd";
import axios from "axios";

const TemplatesHandler = ()=>{
    const fetchAllTemplates = async (
      page_no: number,
        page_size:number,
      ): Promise<Templates> => {
        const apiUrl = `${TEMPLATES}`;
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              "X-RequestId": "3456778909",
            },
            params:{page_no,page_size}
          });
          const apiResponse: Templates = response.data;          
          return apiResponse;
        } catch (error) {
          throw new Error(`Failed to fetch templates: ${error}`);
        }
      };


      const getUserTemplates = async (customerId:number):Promise<UserTemplates[]> => {
        const apiUrl = USER_TEMPLATES;
  
        try {
        const response = await axios.get(`${apiUrl}?customerId=${customerId}`,{
          headers:{
            "X-RequestId": "3456778909",
          }, 
          params: { customerId }, 
        })
        const apiResponse:UserTemplates[] = response.data;
  
        if (apiResponse) {
          return apiResponse;
        } else {
          throw new Error("No data received from the API");
        }
  
      } catch (error) {
        throw new Error(`Failed to fetch templates: ${error}`);
      }}


      const addUserTemplate = async (
        templateId: number,
        customerId: number,
      ): Promise<number> => {
        try {
          const api = `${USER_TEMPLATES}?templateId=${templateId}&customerId=${customerId}`;
          
          const response = await axios.post(api, {}, {
            headers: {
              "X-RequestId": "3563",
            },
          });

          if(response.status === 400){
            notification.info({
              message:"The Template Already Exists."
            })
          }
          
          return response.data.id;
        } catch (error) {
          console.error("Error adding user template:", error);
          throw error;
        }
      };
      
   
      return {
        fetchAllTemplates,
        getUserTemplates,
        addUserTemplate
      }
}

export default TemplatesHandler
  


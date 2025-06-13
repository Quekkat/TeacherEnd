import {create} from "zustand";
import { axiosInstance } from "./axios";
export const useStore = create((set,get)=>({
    authUser: null,
    widgetTab: "inventory",
    inventoryList:[],
    unverifiedTeachersList: [],
    
    login: async (data) =>{
        try{
            const res = await axiosInstance.post("/auth/login", data);
            console.log(res.data);
            set({authUser: res.data});
            //add toast when success
        }catch (error){
            console.log(error.response.data.message);
            //toast.error(error.response.data.message);
        }
    },
    signUp: async (data) =>{
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            //add react toast here when success
        }catch (error){
            console.log(error.response.data.message);

            //toast when error
        }
    },
    setWidgetTab: (tab)=>{
        set({widgetTab: tab});
    },

    getItemList: async()=>{
        try{
            const res = await axiosInstance.get("/auth/getinventorylist");
            set({inventoryList: res.data});
            console.log(inventoryList);

        }catch(error){
            console.log(error.response.data.message);

            //toast here
        }
    },

    createInventoryItem: async (item)=>{
        try{
            const res = await axiosInstance.post("/auth/addNewItem", item);
            console.log(res.data);
            set({widgetTab: "inventory"});
            await get().getItemList();
        }catch(error){
            console.log(error.response.data.message);
            //toast here
        }
    },
    getUnverifiedTeacherslist: async ()=>{
        try{
            const res = await axiosInstance.get("/auth/getunverifiedteachers");
            set({unverifiedTeachersList: res.data});
        }catch(error){
            console.log(error.response.data.message);

            //toast here
        }
    },
    restockInventoryItem: async (data)=>{
        try{
            const res =await axiosInstance.post("/auth/restock", data);
            console.log(res.data);
            await get().getItemList();
        }catch(error){
            console.log(error.response.data.message);
            //toast here
        }
    },
    removeInventoryItem: async (data) =>{
        try{
            const res = await axiosInstance.post("/auth/removeItem", data);
            console.log(res.data);
            await get().getItemList();
        }catch (error){
            console.log(error.response.data.message);
            //toast here
        }
    }
}))
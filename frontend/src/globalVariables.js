import {create} from "zustand";
import { axiosInstance } from "./axios";
export const useStore = create((set,get)=>({
    authUser: null,
    widgetTab: "inventory-dashboard",
    unverifiedTeachersList: [],
    unverifiedStudentList:[],
    history:[],
    unverifiedPayments:[],
    specifiedLevel:"kindergarten",
    inventoryList: [],
    selectedInventoryItem:null,
    setSelectedInventoryItem:(item)=>{
        set({selectedInventoryItem: item});
    },
    
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
    setSpecifiedLevel:(level)=>{
        set({specifiedLevel: level});
    },

    logout: async ()=>{
        try{
            const res = await axiosInstance.post("/auth/logout");
            console.log(res.data);
            set({authUser:null});
        }catch(error){
            console.log(error.response.data.message);

        }
    },
}))
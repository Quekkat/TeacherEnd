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
    selectedOrder:null,
    orderList:[],
    getOrderList: async()=>{
        try{
            const res = await axiosInstance.post("/auth/getorderitem");
            console.log(res.data);
            set({orderList: res.data});
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    setOrderList: (order)=>{
        set({orderList: order});
    },
    setSelectedOrder: (order)=>{
        set({selectedOrder: order});
    },
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
    getSpecifiedInventoryByYearLevel: async ()=>{
        try{
            const level = get().specifiedLevel;
            const data = {level: level}
            const res = await axiosInstance.post("/auth/getInventoryListByYear", data);
            console.log("the server response")
            console.log(res.data);
            set({inventoryList: res.data});
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    restockItem: async (itemid, ammount)=>{
        try{
            const data = {
                id: itemid,
                ammount: ammount
            };
            const res = await axiosInstance.post("/auth/restock", data);
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    orderItem: async (data)=>{
        try{
            const res = await axiosInstance.post("/auth/orderItem", data);
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);

        }
    },
    
}))
import {create} from "zustand";
import { axiosInstance } from "./axios";
export const useStore = create((set,get)=>({
    authUser: null,
    widgetTab: "inventory-dashboard",
    theme: "light",
    unverifiedTeachersList: [],
    unverifiedStudentList:[],
    history:[],
    unverifiedPayments:[],
    specifiedLevel:"kindergarten",
    inventoryList: [],
    selectedInventoryItem:null,
    selectedOrder:null,
    selectedDeletedTeacher:"",
    orderList:[],
    teachersList:[],
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
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
    setSelectedDeletedTeacher:(teacher)=>{
        set({selectedDeletedTeacher: teacher});
        console.log(get().selectedDeletedTeacher);
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
            console.log("signing up");
            const res = await axiosInstance.post("/auth/signup", data);
            console.log(res.data);
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
            set({inventoryList: null});
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
    removeItem: async (id) =>{
        try{
            const data = {itemID: id}
            const res = await axiosInstance.post("/auth/deleteItem", data);
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);   
        }
    },
    getTeachersList: async()=>{
        try{
            const res = await axiosInstance.post("/auth/getTeachers");
            console.log(res.data);
            set({teachersList: res.data});
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    deleteTeacher: async(id)=>{
        try{
            console.log("deleting item id:" , id);
            const data = {ID: id};
            const res = await axiosInstance.post("/auth/deleteTeachers", data);
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);
        }
    }
    
}))
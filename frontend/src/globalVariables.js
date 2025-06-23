import {create} from "zustand";
import { axiosInstance } from "./axios";
export const useStore = create((set,get)=>({
    authUser: null,
    widgetTab: "inventory-dashboard",
    inventoryList:[],
    unverifiedTeachersList: [],
    unverifiedStudentList:[],
    history:[],
    unverifiedPayments:[],
    specifiedLevel:"kindergarten",
    
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
            console.log(unverifiedTeachersList);
        }catch(error){
            console.log(error.response.data.message);

            //toast here
        }
    },
    verifySelectedTeacher: async (data)=>{
        try{
            const res = await axiosInstance.put("/auth/verifyteacher", data);
            console.log(res.data);
            await get().getUnverifiedTeacherslist();
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
    },
    getUnverifiedStudent: async (data)=>{
        try{
            const res = await axiosInstance.get("/auth/unverifiedstudentlist");
            set({unverifiedStudentList: res.data});
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    verifySelectedStudent: async(data)=>{
        try {
            const res = await axiosInstance.post("/auth/verifystudent", data);
            console.log(res.data);
            const alert = document.createElement('div');
            alert.className = 'custom-alert';
            alert.innerHTML = `
                <span class="check-icon">✓</span>
                <span class="alert-message">Verified</span>
            `;
            document.body.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
            get().getUnverifiedStudent();
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    addNewOrderItem: async(data)=>{
        try{
            const res = await axiosInstance.post("/auth/addNewOrder",data);
            console.log(res.data);
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    getTransactionHistory: async ()=>{
        try{
            const res = await axiosInstance.get("/auth/transactionhistory");
            set({history: res.data});
        }catch(error){
            console.log(error.response.data.message);
        }
    },
    searchTransactionHistory: async (data)=>{
        try{
            const res = await axiosInstance.post("/auth/searchTransactionHistory", data);
            set({history:res.data});
        }catch(error){
            console.log(error.response.data.message);
        }
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
    getUnverifiedPayment: async ()=>{
        try {
          const res = await axiosInstance.get("/auth/unverifiedOrderList");
          set({unverifiedPayments: res.data});  
        } catch (error) {
            console.log(error.response.data.message);

        }
    },
    verifyPayment: async (data)=>{
        try {
            //verifyPayment
            const res =await axiosInstance.post("/auth/verifyPayment",data);
            console.log(res.data);
            get().getUnverifiedPayment();
        } catch (error) {
            console.log(error.response.data.message); 
        }    
    }
}))
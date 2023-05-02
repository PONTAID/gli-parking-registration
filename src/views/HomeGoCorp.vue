<template>
    <v-col>
        <!-- START LOADING DIALOG -->
        <v-dialog
            v-model="dialog.loading"
            persistent
            width="300"
            >
            <v-card
                color="primary"
                dark
            >
                <v-card-text>
                Please stand by
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- END LOADING DIALOG -->
        <v-row class="mt-3 ml-0 text-center">
            <!-- <v-hover v-slot="{hover}">
                <v-card width="140" :elevation="hover ? 16 : 2" :class="hover ? 'shake-card' : ''" @click="route('tambah-kendaraan')">
                    <v-col>
                        <v-row class="d-flex justify-center">
                            <v-avatar color="#f26d3b" size="75" class="mt-5"><v-icon x-large color="white">mdi-plus</v-icon></v-avatar>    
                        </v-row>
                        <v-row class="d-flex justify-center">
                            <v-card-title style="color:#073e5d;" class="">Tambah<br/>Kendaraan</v-card-title>
                        </v-row>
                    </v-col>    
                </v-card>
            </v-hover>
            <v-hover v-slot="{hover}">
                <v-card width="140" :elevation="hover ? 16 : 2" :class="hover ? 'shake-card' : ''" @click="route('mutasi-kendaraan')" class="ml-5">
                    <v-col>
                        <v-row class="d-flex justify-center">
                            <v-avatar color="#f26d3b" size="75" class="mt-5"><v-icon x-large color="white">mdi-rotate-3d-variant</v-icon></v-avatar>
                        </v-row>
                        <v-row class="d-flex justify-center">
                            <v-card-title style="color:#073e5d;">Mutasi<br/>Kendaraan</v-card-title>
                        </v-row>
                    </v-col>    
                </v-card>
            </v-hover>
            <v-hover v-slot="{hover}">
                <v-card width="140" :elevation="hover ? 16 : 2" :class="hover ? 'shake-card' : ''" @click="(dialog.info = true)" class="ml-5">
                    <v-col>
                        <v-row class="d-flex justify-center">
                            <v-avatar color="#f26d3b" size="75" class="mt-5"><v-icon x-large color="white">mdi-information-variant</v-icon></v-avatar>
                        </v-row>
                        <v-row class="d-flex justify-center">
                            <v-card-title style="color:#073e5d;">Informasi</v-card-title>
                        </v-row>
                    </v-col>    
                </v-card>
            </v-hover> -->
                <v-card width="340" height="180" class="ml-5" v-if="cost_center == 'HRGA' || manager == 'Y'">
                    <v-card-title class="text-h5 mb-5">
                        <v-icon left large color="#f26d3b">mdi-alert-circle</v-icon>
                        Pesan Masuk
                    </v-card-title>
                    <v-card-subtitle v-if="manager == 'T' || manager == 'Y'">Terdapat <b>{{ info.notif_manager.toString() }}</b> request trip yang harus di approve
                        <br> <router-link to="/request-trip">(Click Here)</router-link>
                    </v-card-subtitle>
                    <v-card-subtitle v-else-if="cost_center == 'HRGA'">Terdapat <b>{{ info.notif_ga.toString() }}</b> request trip yang harus di approve
                        <br> <router-link to="/menu-ga">(Click Here)</router-link>
                    </v-card-subtitle>
                </v-card>
        </v-row>
        <div class="mt-5 px-0 py-0 text-center d-flex flex-row" flat tile style="width: 100% !important; border-radius: 50px 50px 50px 50px !important">
            <v-card elevation="3" outlined style="width: 100% !important">
                <v-card-title>List GoCorp</v-card-title>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-row>
                    <v-col cols="4" class="ml-5 pa-7">
                        <v-text-field
                            class=""
                            outlined
                            rounded
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="pa-7 mr-5 text-right">
                        <v-btn class="mt-3"
                            width="185"
                            @click="route('tambah-trip')"
                            color="deep-orange white--text">
                            <v-icon size="20">mdi-plus</v-icon>&nbsp;Tambah Trip
                        </v-btn>
                    </v-col>
                </v-row>
                <v-layout class="px-6" style="">
                    <v-flex style="overflow:auto;">
                        <v-data-table
                            :headers="header_list"
                            :items="data"
                            height="65vh"
                            fixed-header
                            :search="search"
                            :sort-by="['gct_created_date']"
                            :sort-desc="[true]"
                            :items-per-page="10"
                            :footer-props="{
                                'items-per-page-options': [10, 25, 100, 150],
                                'show-current-page': true,
                                'show-first-last-page': true,
                            }"
                            class="elevation-1"
                        >   
                            <template v-slot:item.gct_created_date="{item}">
                                {{ item.gct_created_date.split(' ')[0] }}
                            </template>
                            <template v-slot:item.gct_status="{item}">
                                <v-chip
                                    dark
                                    :color="checkColor(item.gct_status)">
                                    {{ checkStatus(item.gct_status) }}
                                </v-chip>
                            </template>
                            <template v-slot:item.action="{item}">
                                <!-- <v-chip
                                    class="mr-3"
                                    :color="'blue lighten-1'"
                                    @click="routeTrip('tambah-trip', 'reschedule', item.gct_id)"
                                    :disabled="checkDate(item.gct_start_date, item.gct_nik, item.gct_status)"
                                    dark    
                                >
                                    Reschedule
                                </v-chip> -->
                                <v-chip
                                    :color="'red lighten-1'"
                                    @click="routeTrip('tambah-trip', 'cancel', item.gct_id)"
                                    :disabled="checkDate(item.gct_start_date, item.gct_nik, item.gct_status)"
                                    dark    
                                >
                                    Batalkan Trip
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
    </v-col>
</template>
<script>
    import axios from 'axios';
    import { api_url_gocorp } from "../global_variable/global_variable.js"; 

    export default {
        
    name: "home-gocorp",
    components: {},

        data() {
            return {
                search: '',
                cost_center: null,
                manager: null,
                phone: null,
                email: null,
                nik: null,
                nama: null,
                managerVal:{},
                ga:{},
                info:{
                    notif_ga:0,
                    notif_manager:0,
                },
                dialog:{
                    loading: false,
                    profile: false,
                    change: false,
                },
                title_dialog: null,
                header_list: [
                    {
                        text: "Tanggal Pengajuan",
                        align: "center",
                        value: "gct_created_date",
                        class: "black--text grey lighten-2 arrow"
                    },
                    {
                        text: "Tujuan Trip",
                        align: "center",
                        value: "gct_descp_trip",
                        class: "black--text grey lighten-2 arrow"
                    },
                    {
                        text: "Total Trip", 
                        align: "center",
                        sortable: false,
                        value: "gct_total_trip",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Status",
                        align: "center",
                        value: "gct_status",
                        sortable: false,
                        class: "black--text grey lighten-2 arrow"
                    },
                    {
                        text: "Action",
                        align: "center",
                        value: "action",
                        sortable: false,
                        class: "black--text grey lighten-2 arrow"
                    }
                ],
                data: [],
            };
        },
        methods:{
            checkDate(start_date, nik, status){
                var today = new Date(new Date().setDate(new Date().getDate())).toISOString().substr(0, 10)
               
                var nik_pribadi = localStorage.getItem('nik')
                if(Date.parse(new Date(start_date)) < Date.parse(today) || (nik_pribadi != nik && (this.cost_center == 'HRGA' || this.manager == 'Y')) || status == 4){
                    return true;
                }
                else{
                    return false;
                }
            },
            
            removeLocalStorage(){
                localStorage.removeItem("nama");
                localStorage.removeItem("phone");
                localStorage.removeItem("email");
                localStorage.removeItem("manager");
                localStorage.removeItem("cost_center");
                localStorage.removeItem("token");
                localStorage.removeItem("selection");
                localStorage.removeItem("nik");
                this.route('login', null);
            },

            checkStatus(status){
                if(status == 0){
                    return 'Menunggu Approval Atasan'
                }
                else if(status == 1){
                    return 'Reschedule: Menunggu Approval Atasan'
                }
                else if(status == 2){
                    return 'Atasan sudah Approved, Menunggu GA'
                }   
                else if(status == 3){
                    return 'GA sudah Approved'
                }    
                else if(status == 4){
                   return 'Trip dibatalkan' 
                }  
                else if(status == 5){
                    return 'Ditolak oleh Manager'
                }
                else if(status == 6){
                    return 'Ditolak oleh GA'
                }
                // console.log(status)
            },
            checkColor(status){                    
                if(status == 0 || status == 2 || status == 1){
                    return 'yellow darken-3'
                }
                
                else if(status == 3){
                    return 'green lighten-1'
                }

                else{
                    return 'red lighten-1'
                }
            },

            async getDataTrip(){
                try{
                    this.dialog.loading = true;

                    var url = '';

                    // if(this.manager == 'Y'){
                    //     url = api_url_gocorp + 'get-trip-manager' + "?cost_center=" + localStorage.getItem('cost_center') + "&mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token')
                    // }
                    // else if(this.cost_center == 'HRGA'){
                    //     url = api_url_gocorp + 'get-trip-ga' + "?mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token')
                    // }
                    // else{
                        url = api_url_gocorp + 'trip' + "?mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token')
                    // }

                    const headers = {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods":
                            "GET, PUT, POST, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                        "Content-Type": "application/json",
                        "Content-Length": "<calculated when request is sent>",
                        Host: "<calculated when request is sent>",
                        Accept: "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                        Connection: "keep-alive",
                        app: "sso",
                    };

                    await axios
                    .get(
                        url,
                        headers
                    )
                    .then((response) => {
                        this.data = response.data.data;
                        // console.log(this.data)
                        if(response.data.response_code == '22'){
                            alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                            this.removeLocalStorage();
                            return;
                        }
                        else if(response.data.response_code == '21'){
                            alert('NIK tidak ditemukan. Silahkan Login kembali!')
                            this.removeLocalStorage();
                            return;
                        }

                        else if(response.data.response_code == '20'){
                            alert('Token tidak sesuai. Silahkan Login kembali!')
                            this.removeLocalStorage();
                            return;
                        }
                        else if (this.data == []) {
                            return;
                        }
                        else if (!this.data) {
                            alert("Gagal mengambil data! Server timeout. Silahkan coba lagi.");
                            return;
                        }
                    })
                    .catch((error) => {
                        console.log("GoCorp.vue (error) :: ", error);
                        alert("Gagal mengambil data! Silahkan coba lagi.");
                        return;
                    });

                    // Break if request failed
                    if (!this.data) {
                        this.dialog.loading = false;
                        return;
                    }
                }
                catch (e) {
                    console.error(e);
                    alert("Error: koneksi gagal");
                    return;
                }
                this.dialog.loading = false;
            },

            getNotifManager(){
            try{
                // this.dialog.loading = true;
                const headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods":
                        "GET, PUT, POST, DELETE, OPTIONS, post, get",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    "Content-Type": "application/json",
                    "Content-Length": "<calculated when request is sent>",
                    Host: "<calculated when request is sent>",
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    app: "sso",
                };

                 axios
                .get(
                    api_url_gocorp +
                    "get-notif-manager?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    this.managerVal = response.data.data[0];
                    if(response.data.response_code == '22'){
                        alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                        this.removeLocalStorage();
                        return;
                    }
                    else if(response.data.response_code == '21'){
                        alert('NIK tidak ditemukan. Silahkan Login kembali!')
                        this.removeLocalStorage();;
                        return;
                    }
                    else if (this.managerVal == []) {
                        return;
                    }
                    else if (!this.managerVal) {
                        alert("Gagal mengambil notif manager");
                        return;
                    }
                    else{
                        this.info.notif_manager = this.managerVal.count_manager;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data! Silahkan coba lagi.");
                    return;
                });

                // Break if request failed
                if (!this.data) {
                    this.dialog.loading = false;
                    return;
                }
            }
            catch (e) {
                console.error(e);
                alert("Error: koneksi gagal");
                return;
            }
        },

        getNotifGa(){
            try{
                // this.dialog.loading = true;
                const headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods":
                        "GET, PUT, POST, DELETE, OPTIONS, post, get",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    "Content-Type": "application/json",
                    "Content-Length": "<calculated when request is sent>",
                    Host: "<calculated when request is sent>",
                    Accept: "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    Connection: "keep-alive",
                    app: "sso",
                };

                 axios
                .get(
                    api_url_gocorp +
                    "get-notif-ga?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    this.ga = response.data.data[0];
                    if(response.data.response_code == '22'){
                        alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                        this.removeLocalStorage();
                        return;
                    }
                    else if(response.data.response_code == '21'){
                        alert('NIK tidak ditemukan. Silahkan Login kembali!')
                        this.removeLocalStorage();;
                        return;
                    }
                    else if (this.ga == []) {
                        return;
                    }
                    else if (!this.ga) {
                        alert("Gagal mengambil data notif GA");
                        return;
                    }
                    else{
                        this.info.notif_ga = this.ga.count_ga;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data! Silahkan coba lagi.");
                    return;
                });

                // Break if request failed
                if (!this.data) {
                    this.dialog.loading = false;
                    return;
                }
            }
            catch (e) {
                console.error(e);
                alert("Error: koneksi gagal");
                return;
            }
        },

            async route(route, selection) {
                this.$router.push({ name: route }).catch((error) => {
                    console.log(error);
                });
                localStorage.setItem('selection', selection)
                this.$store.commit('setSelection', localStorage.getItem('selection'))
            },

            routeTrip(name, mode, num){
                this.$router.push({ name: name, query:{ change: mode, id: num } }).catch((error) => {
                    console.log(error);
                });
            }
        },
        
        mounted(){       
            if (!localStorage.nama) {
                this.removeLocalStorage();
            }
            if (localStorage.getItem("manager") == 'T'){
                localStorage.setItem('manager', 'Y')
            }
            localStorage.setItem('selection', 'gocorp')
            this.$store.commit('setSelection', localStorage.getItem('selection'))
            this.cost_center = localStorage.getItem('cost_center');
            this.manager = localStorage.getItem('manager');
            this.nik = localStorage.getItem('nik');
            this.getNotifManager();
            this.getDataTrip();
            this.getNotifGa();
        },
    }
</script>

<style>
    .outline-red :deep(fieldset) {
        border: 2px solid rgb(250, 87, 87);
    }
    .hint-red  :deep(.v-messages__message){
        color: red;
    }
    .shake-card:hover {
        animation: shake .5s;
        animation-iteration-count: infinite;
        cursor: pointer;
    }

    @keyframes shake {
        0%, 100%{ transform: rotate(-1deg);}
        50%{ transform: rotate(1deg); }
    }
</style>
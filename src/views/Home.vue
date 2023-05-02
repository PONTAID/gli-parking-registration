<template>
    <v-col>
        <!-- ALERT START -->
        <v-dialog 
        width="400"
        v-model="alert.success" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="success">
                Terminate/Unsubscribe kendaraan berhasil!
            </v-alert>
        </v-dialog>

        <v-dialog 
        width="400"
        v-model="alert.fail" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="error">
                Gagal melakukan terminate kendaraan!
            </v-alert>
        </v-dialog>
        <!-- ALERT END -->
        <!-- DIALOG UNSUBSCRIBE START -->
        <v-dialog
            persistent
            content-class="elevation-0"
            v-model="dialog.unsubscribe"
            width="1000">
            <div style="display: flex; align-items: start; justify-content: center">
                <v-card
                    flat
                    tile
                    width="100%"
                    class="mb-4 mt-12 text-center"
                    style="border-radius: 25px 25px 25px 25px !important">
                    <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                        <v-card elevation="3" outlined style="width: 100% !important">
                            <v-row>
                                <v-col>
                                    <div class="ma-4 pa-2 d-flex flex-row">
                                        <h2 style="font-weight: 400">Unsubscribe</h2>
                                    </div>
                                </v-col>
                            </v-row>    
                            <v-divider class="ml-8 mr-8"></v-divider>
                            <div
                                style="width: 100%;">
                                <v-col cols="12" md="12">
                                    <v-card flat class="ma-0 pa-0" width="100%">
                                        <v-card-text width="100%">
                                            <v-container>
                                                <v-row class="mb-10">
                                                    <v-col cols="6">
                                                        <v-row class="pr-4 text-start mb">
                                                            <v-col cols="4" class="text-start mt-2 ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-text-field
                                                                outlined
                                                                v-model="unsubscribe.nik"
                                                                hide-details
                                                                filled
                                                                :readonly="true"
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start mt-2 ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-text-field
                                                                v-model="unsubscribe.nama"
                                                                outlined
                                                                filled
                                                                :readonly="true"
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col class="" cols="6">
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start mt-2 ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Polisi</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-row class="ma-0">
                                                                    <v-text-field
                                                                        v-model="unsubscribe.nopol"
                                                                        required
                                                                        hide-details
                                                                        outlined
                                                                        filled
                                                                    ></v-text-field>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start mt-2 ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tipe Kendaraan</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                    <v-text-field
                                                                        v-model="unsubscribe.type"
                                                                        filled
                                                                        hide-details
                                                                        readonly
                                                                        outlined
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row >
                                                    <v-spacer></v-spacer>
                                                    <v-btn class="mr-8 white--text" width="200" color="red lighten-1" @click="(dialog.unsubscribe = false)">Cancel</v-btn>
                                                    <v-btn color="green white--text" width="200" class="mr-7" @click="onSubmit">Submit</v-btn>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </div>
                        </v-card>
                    </div>
                </v-card>
            </div>
        </v-dialog> 
        <!-- DIALOG UNSUBSCRIBE END -->
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
        <!-- DIALOG INFO START -->
        <v-dialog
            v-model="dialog.info"
            width="715px"
            persistent
            >
            <v-card
            flat
            tile
            class=""
            style="border-radius: 25px 25px 25px 25px !important;"
            >
                <!-- Table -->
                <div class="pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                    <v-card class="text-left mt-2 mb-2" elevation="3" outlined style="width: 100% !important">
                        <v-row align="center">
                            <v-card-title class="mt-5 ml-3 mb-2">Informasi</v-card-title>
                            <v-spacer></v-spacer>
                            <!-- <v-hover v-slot="{hover}"> -->
                                <v-btn icon class="mr-5" @click="(dialog.info = false)"><v-icon >mdi-close</v-icon></v-btn>
                            <!-- </v-hover> -->
                        </v-row>
                        <v-divider class="ml-4 mr-4 pa-0"></v-divider>
                        <v-card-text class="black--text pb-1">Detail Biaya:</v-card-text>
                        <v-card-text class="black--text pb-0 pt-0">- Mobil = {{formatCurrency(info.biaya_mobil)}}</v-card-text>
                        <v-card-text class="black--text pb-0 pt-0">- Motor = {{formatCurrency(info.biaya_motor)}}</v-card-text>
                        <v-card-text class="black--text pb-0 pt-0">- Perpanjang Mobil = {{formatCurrency(info.biaya_perpanjang_mobil)}} per bulan</v-card-text>
                        <v-card-text class="black--text pb-0 pt-0">- Perpanjang Motor = {{formatCurrency(info.biaya_perpanjang_motor)}} per bulan</v-card-text>
                        <v-card-text class="black--text pb-0 pt-0">- Uang Mutasi Kendaraan = {{formatCurrency(info.biaya_mutasi)}} per kendaraan</v-card-text>
                        <v-card-text class="black--text mb-5 pt-0"><strong class="red--text">**</strong>untuk kendaraan pertama akan diberikan subsidi {{ formatCurrency(info.biaya_subsidi) }} perbulan</v-card-text>
                    </v-card>
                </div>
            </v-card>
        </v-dialog>
        <!-- DIALOG INFO END -->
        <v-row class="mt-3 ml-0 text-center">
            <v-hover v-slot="{hover}">
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
            </v-hover>
                <!-- <v-card width="340" class="ml-5" v-if="managerVal == 'T' || cost_center == 'HRGA' || managerVal == 'Y'">
                    <v-card-title class="text-h5 mb-5">
                        <v-icon left large color="#f26d3b">mdi-alert-circle</v-icon>
                        Pesan Masuk
                    </v-card-title>
                    <v-card-subtitle v-if="managerVal == 'T' || managerVal == 'Y'">Terdapat <b>{{ info.notif_manager.toString() }}</b> request trip yang harus di approve
                        <br> <router-link to="/request-trip">(Click Here)</router-link>
                    </v-card-subtitle>
                    <v-card-subtitle v-else-if="cost_center == 'HRGA'">Terdapat <b>{{ info.notif_ga.toString() }}</b> request trip yang harus di approve
                        <br> <router-link to="/menu-ga">(Click Here)</router-link>
                    </v-card-subtitle>
                </v-card> -->
        </v-row>
        <div v-if="cost_center != 'HRGA'" class="mt-10 px-0 py-0 text-center d-flex flex-row" flat tile style="width: 100% !important; border-radius: 50px 50px 50px 50px !important">
            <v-card elevation="3" outlined style="width: 100% !important">
                <v-card-title>List Kendaraan</v-card-title>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-row>
                    <v-col cols="8">
                    </v-col>
                    <v-col class="mr-5 pa-7">
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
                </v-row>
                <v-layout class="px-6" style="">
                    <v-flex style="overflow:auto;">
                        <v-data-table
                            :headers="header_list"
                            :items="data"
                            height="65vh"
                            fixed-header
                            :search="search"

                            :sort-by="['prk_registration_date']"
                            :sort-desc="[true]"
                            :items-per-page="25"
                            :footer-props="{
                                'items-per-page-options': [25, 100, 150],
                                'show-current-page': true,
                                'show-first-last-page': true,
                            }"
                            class="elevation-1">
                            <template v-slot:item.prk_registration_date="{item}">
                                <!-- {{ item.prk_registration_date }} -->
                                {{ item.prk_registration_date.toString().slice(0, 10) }}
                            </template>
                            <template v-slot:item.prk_status="{item}">
                                <v-chip
                                    :color="item.prk_status == 'T' ? 'green' : 'red lighten-1'"
                                    dark
                                >
                                {{ item.prk_status == 'T' ? 'Active' : 'Inactive' }}
                                </v-chip>
                            </template>
                            <template v-slot:item.prk_biaya_subsidi="{item}">
                                <v-chip
                                    :color="item.prk_biaya_subsidi == 25000 ? 'green' : 'red lighten-1' "
                                    dark
                                >
                                {{ item.prk_biaya_subsidi == 25000 ? 'Subsidi' : 'Tidak Subsidi' }}
                                </v-chip>
                                <!-- {{ item.prk_biaya_subsidi.toString() }} -->
                            </template>
                            <template v-slot:item.action="{item}">
                                <v-chip
                                    :color="item.prk_status == 'T' ? 'red lighten-1' : ''"
                                    @click="onUnsubscribe(item.prk_nopol, item.prk_type)"
                                    :disabled="item.prk_status != 'T'"
                                    dark    
                                >
                                    Unsubscribe
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
import { api_url } from "../global_variable/global_variable.js";  
// import { api_url_gocorp } from "../global_variable/global_variable.js";

export default {
    name: "Home",
    components: {},

    data() {
        return {
            data: [],
            data_unsubscribe: [],
            flag_error: 0,
            alert:{
                success: false,
                fail: false,
            },
            unsubscribe:{
                nik: null,
                nama: null,
                nopol: null,
                type: null
            },
            info:{
                biaya_mobil: 0,
                biaya_motor: 0,
                biaya_perpanjang_mobil: 0,
                biaya_perpanjang_motor: 0,
                biaya_subsidi: 0,
                biaya_mutasi: 0,
                notif_ga:0,
                notif_manager:0,
            },
            subsidi:{
                prk_biaya_subsidi: null,
                prk_status: "",
                prk_nopol_subsidi: null,

            },
            cost_center: null,
            // manager:{},
            // ga:{},
            managerVal:null,
            dialog:{
                loading: false,
                unsubscribe: false,
                info: false,
            },
            search: '',
            header_list: [
                {
                    text: "No. Polisi",
                    align: "center",
                    width: '210',
                    value: "prk_nopol",
                    class: "black--text grey lighten-2 arrow"
                },
                
                {
                    text: "Tipe Kendaraan", 
                    align: "center",
                    width: '210',
                    sortable: false,
                    value: "prk_type",
                    class: "black--text grey lighten-2"
                },
                {
                    text: "Status Subsidi",
                    align: "center",
                    width: '100',
                    sortable: false,
                    value: "prk_biaya_subsidi",
                    class: "black--text grey lighten-2"
                },
                {
                    text: "Status Aktif",
                    align: "center",
                    width: '250',
                    sortable: false,
                    value: "prk_status",
                    class: "black--text grey lighten-2"
                },

                {
                    text: "Tanggal Input",
                    align: "center",
                    width: '150',
                    value: "prk_registration_date",
                    class: "black--text grey lighten-2 arrow"
                },
                
                {
                    text: "Action",
                    value: 'action',
                    align: "center",
                    sortable: false,
                    class: "black--text grey lighten-2"
                }
            ]
        };
    },

    methods:{
        route(route) {
            this.$router.push({ name: route }).catch((error) => {
                console.log(error);
            });
        },

        formatCurrency(number){
            return new Intl.NumberFormat("id-ID", {style: "currency", currency: 'IDR'}).format(number).split(',00').join('').replaceAll('.', ',');
        },

        onUnsubscribe(nopol, type){
            this.unsubscribe.nik = localStorage.getItem('nik');
            this.unsubscribe.nama = localStorage.getItem('nama');
            this.unsubscribe.nopol = nopol;
            this.unsubscribe.type = type;
            this.dialog.unsubscribe = true
        },
        // setNotif(){
        //     if (localStorage.getItem('manager')=='T'){
        //         this.getNotifManager()
        //     }
        // },

        async getDataKendaraan(){
            try{
                this.dialog.loading = true;
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

                await axios
                .get(
                    api_url +
                    "kendaraan?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    this.data = response.data.data;
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

                    else if(response.data.response_code == '20'){
                        alert('Token tidak sesuai. Silahkan Login kembali!')
                        this.removeLocalStorage();
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
            
            if(this.info.biaya_mobil == null){
                alert('Gagal mengambil data biaya kendaraan!')
            }
            this.dialog.loading = false;
        },

        // getNotifManager(){
        //     try{
        //         // this.dialog.loading = true;
        //         const headers = {
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Credentials": "true",
        //             "Access-Control-Allow-Methods":
        //                 "GET, PUT, POST, DELETE, OPTIONS, post, get",
        //             "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        //             "Content-Type": "application/json",
        //             "Content-Length": "<calculated when request is sent>",
        //             Host: "<calculated when request is sent>",
        //             Accept: "*/*",
        //             "Accept-Encoding": "gzip, deflate, br",
        //             Connection: "keep-alive",
        //             app: "sso",
        //         };

        //          axios
        //         .get(
        //             api_url_gocorp +
        //             "get-notif-manager?mu_username=" + localStorage.getItem('nik') +
        //             "&mu_token=" + localStorage.getItem('token'),
        //             headers
        //         )
        //         .then((response) => {
        //             this.manager = response.data.data[0];
        //             if(response.data.response_code == '22'){
        //                 alert('Token sudah kadaluarsa. Silahkan Login kembali!')
        //                 this.removeLocalStorage();
        //                 return;
        //             }
        //             else if(response.data.response_code == '21'){
        //                 alert('NIK tidak ditemukan. Silahkan Login kembali!')
        //                 this.removeLocalStorage();;
        //                 return;
        //             }
        //             else if (this.manager == []) {
        //                 return;
        //             }
        //             else if (!this.manager) {
        //                 alert("Gagal mengambil data! Server timeout. Silahkan coba lagi.");
        //                 return;
        //             }
        //             else{
        //                 this.info.notif_manager = this.manager.count_manager;
        //             }
        //         })
        //         .catch((error) => {
        //             console.log("ParkingRegistration.vue (error) :: ", error);
        //             alert("Gagal mengambil data! Silahkan coba lagi.");
        //             return;
        //         });

        //         // Break if request failed
        //         if (!this.data) {
        //             this.dialog.loading = false;
        //             return;
        //         }
        //     }
        //     catch (e) {
        //         console.error(e);
        //         alert("Error: koneksi gagal");
        //         return;
        //     }
            
        //     if(this.info.biaya_mobil == null){
        //         alert('Gagal mengambil data pesan manager')
        //     }
        //     this.dialog.loading = false;
        // },
        // getNotifGa(){
        //     try{
        //         // this.dialog.loading = true;
        //         const headers = {
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Credentials": "true",
        //             "Access-Control-Allow-Methods":
        //                 "GET, PUT, POST, DELETE, OPTIONS, post, get",
        //             "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        //             "Content-Type": "application/json",
        //             "Content-Length": "<calculated when request is sent>",
        //             Host: "<calculated when request is sent>",
        //             Accept: "*/*",
        //             "Accept-Encoding": "gzip, deflate, br",
        //             Connection: "keep-alive",
        //             app: "sso",
        //         };

        //          axios
        //         .get(
        //             api_url_gocorp +
        //             "get-notif-ga?mu_username=" + localStorage.getItem('nik') +
        //             "&mu_token=" + localStorage.getItem('token'),
        //             headers
        //         )
        //         .then((response) => {
        //             this.ga = response.data.data[0];
        //             if(response.data.response_code == '22'){
        //                 alert('Token sudah kadaluarsa. Silahkan Login kembali!')
        //                 this.removeLocalStorage();
        //                 return;
        //             }
        //             else if(response.data.response_code == '21'){
        //                 alert('NIK tidak ditemukan. Silahkan Login kembali!')
        //                 this.removeLocalStorage();;
        //                 return;
        //             }
        //             else if (this.ga == []) {
        //                 return;
        //             }
        //             else if (!this.ga) {
        //                 alert("Gagal mengambil data! Server timeout. Silahkan coba lagi.");
        //                 return;
        //             }
        //             else{
        //                 this.info.notif_ga = this.ga.count_ga;
        //             }
        //         })
        //         .catch((error) => {
        //             console.log("ParkingRegistration.vue (error) :: ", error);
        //             alert("Gagal mengambil data! Silahkan coba lagi.");
        //             return;
        //         });

        //         // Break if request failed
        //         if (!this.data) {
        //             this.dialog.loading = false;
        //             return;
        //         }
        //     }
        //     catch (e) {
        //         console.error(e);
        //         alert("Error: koneksi gagal");
        //         return;
        //     }
            
        //     if(this.info.biaya_mobil == null){
        //         alert('Gagal mengambil data pesan manager')
        //     }
        //     this.dialog.loading = false;
        // },

        removeLocalStorage(){
            localStorage.removeItem("nama");
            localStorage.removeItem("phone");
            localStorage.removeItem("email");
            localStorage.removeItem("manager");
            localStorage.removeItem("cost_center");
            localStorage.removeItem("token");
            localStorage.removeItem("selection");
            localStorage.removeItem("nik");
            this.route("login")
        },

        async getBiayaInfo(prmb_jenis_kendaraan, prmb_kepemilikan){
            try{
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

                await axios
                .get(
                    api_url +
                    "get-biaya?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') +
                    "&prmb_jenis_kendaraan=" + prmb_jenis_kendaraan +
                    "&pmk_kepemilikan=" + prmb_kepemilikan,
                    headers
                )
                .then((response) => {
                    // console.log(response.data.data)
                    var kendaraan = response.data.data
                    
                    if(prmb_jenis_kendaraan == 'MOBIL'){
                        this.info.biaya_mobil = kendaraan[0].prmb_biaya + kendaraan[2].prmb_biaya
                        this.info.biaya_perpanjang_mobil = kendaraan[0].prmb_biaya
                        this.info.biaya_mutasi = kendaraan[1].prmb_biaya;    
                        this.info.biaya_subsidi = kendaraan[3].prmb_biaya;
                    }
                    else{
                        this.info.biaya_motor = kendaraan[0].prmb_biaya + kendaraan[3].prmb_biaya
                        this.info.biaya_perpanjang_motor = kendaraan[0].prmb_biaya
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    return;
                })
            }
            catch (e){
                console.error(e);
                return;
            }
        },

        async onSubmit(){
            try{
                this.dialog.loading = true;
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
                const body = {
                    nik: this.unsubscribe.nik,
                    nama: this.unsubscribe.nama,
                    nopol: this.unsubscribe.nopol,
                    type: this.unsubscribe.type
                }
                await axios
                .post(
                    api_url +
                    "terminate-kendaraan?mu_token=" + localStorage.getItem('token') + 
                    "&mu_username=" + localStorage.getItem('nik'),
                    body,
                    headers
                )
                .then((response) => {
                    // console.log(response)
                    this.data_unsubscribe = response.data.data
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
                        this.removeLocalStorage();;
                        return;
                    }
                    else if (this.data_unsubscribe == []) {
                        this.dialog.loading = false;
                        this.dialog.unsubscribe = false;
                        return;
                    }
                    else if (!this.data_unsubscribe) {
                        // console.log(response)
                        // alert("Gagal terminate kendaraan!");    
                        this.dialog.loading = false;
                        this.dialog.unsubscribe = false;
                        this.alert.fail = true;
                        
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
                        return;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal terminate kendaraan! Silahkan coba lagi.");
                    this.dialog.loading = false;
                    this.dialog.unsubscribe = false;
                    this.alert.fail = true;
                        
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    return;
                });
                // Break if request failed
                if (!this.data_unsubscribe) {
                    this.dialog.loading = false;
    
                    this.dialog.unsubscribe = false;
                    this.alert.fail = true;
                        
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    return;
                }
            }
            catch (e) {
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                this.dialog.unsubscribe = false;
                return;
            }
            // alert('Unsubscribe/terminate Kendaraan berhasil!')
            this.dialog.loading = false;
            this.dialog.unsubscribe = false;
            this.alert.success = true;    
            window.setTimeout(() => {
                this.alert.success = false;
            }, 2000)
            this.getDataKendaraan();
            this.radioFilter = 'Semua';
        }
        
    },
    async created(){
        this.cost_center = localStorage.getItem("cost_center")
        this.managerVal = localStorage.getItem("manager")
        localStorage.setItem('selection', 'parking')
        this.$store.commit('setSelection', localStorage.getItem('selection'))
    },

    mounted(){
        if (!localStorage.nama) {
                this.removeLocalStorage();
        }
        localStorage.setItem('selection', 'parking')
        this.$store.commit('setSelection', localStorage.getItem('selection'));
        // this.getNotifManager();
        this.getDataKendaraan();
        // this.getNotifGa();
        this.getBiayaInfo('MOBIL', 'PRIBADI');
        this.getBiayaInfo('MOTOR', 'PRIBADI');
    }
}
</script>

<style>
    .shake-card:hover {
        animation: shake .5s;
        animation-iteration-count: infinite;
        cursor: pointer;
    }
    .arrow .v-data-table-header__icon {
        opacity: 1;
    }

    @keyframes shake {
        0%, 100%{ transform: rotate(-1deg);}
        50%{ transform: rotate(1deg); }
    }
</style>
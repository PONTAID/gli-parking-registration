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
        <div class="mt-0 px-0 py-0 text-center d-flex flex-row" flat tile style="width: 100% !important; border-radius: 50px 50px 50px 50px !important">
            <v-card elevation="3" outlined style="width: 100% !important">
                <v-row class="ma-0 pa-0 ml-3" align="center">
                    <v-card-title style="font-size: 30px;">List Kendaraan</v-card-title>
                    <v-divider class="mx-4 mb-2" inset vertical></v-divider>
                </v-row>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-row class="text-start">
                    <v-col cols="4" class="pl-10 mt-3">
                        <!-- MENU FILTER START -->
                        <v-menu offset-y max-width="185%"  :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="pa-0">
                                        <v-spacer></v-spacer>
                                        <v-btn class="mt-3"
                                            v-on="on"
                                            width="185"
                                            v-bind="attrs"
                                            color="deep-orange white--text">
                                            <v-icon size="20">mdi-filter</v-icon>&nbsp;Filter
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </template>
                            <v-card class="">    
                                <v-container>
                                    <v-radio-group mandatory v-model="radioFilter" @change="getFilterData">
                                        <template v-slot:label>
                                            <h3><strong>Filter By Status</strong></h3>
                                        </template>
                                        <v-radio value="all" color="primary">
                                            <template v-slot:label>
                                                <div><strong class="primary--text">Semua</strong></div>
                                            </template>
                                        </v-radio>
                                        <v-radio value="active" color="green">
                                            <template v-slot:label>
                                                <div><strong class="success--text">Active</strong></div>
                                            </template>
                                        </v-radio>
                                        <v-radio value="inactive" color="red">
                                            <template v-slot:label>
                                                <div><strong class="error--text">Inactive</strong></div>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </v-container>
                            </v-card>
                        </v-menu>
                        <!-- MENU FILTER END -->
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="4" class="mr-5 pa-7">
                        <v-text-field
                            outlined
                            rounded
                            class=""
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
                            height="65vh"
                            :items="data"
                            :sort-by="['prk_nama']"
                            :sort-desc="[false]"
                            fixed-header
                            :search="search"
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
                            <template v-slot:item.action="{item}">
                                <v-chip
                                    :color="item.prk_status == 'T' ? 'red lighten-1' : ''"
                                    @click="onUnsubscribe(item.prk_nik, item.prk_nama, item.prk_nopol, item.prk_type)"
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

export default {
    name: "ListKendaraan",
    components: {},

    data() {
        return {
            data: [],
            unsubscribe:{
                nik: null,
                nama: null,
                nopol: null,
                type: null
            },
            master_data: [],
            radioFilter: null,
            date: String((new Date().getFullYear() + '-' + (new Date().getMonth() + 1))),
            dialog:{
                unsubscribe: false,
                loading: false,
            },
            search: '',
            header_list: [
                {
                    text: "NIK",
                    align: "center",
                    value: "prk_nik",
                    class: "black--text grey lighten-2 arrow"
                },
                {
                    text: "Nama",
                    align: "center",
                    value: "prk_nama",
                    sortable: false,
                    class: "black--text grey lighten-2"
                },
                {
                    text: "No. Polisi",
                    align: "center",
                    value: "prk_nopol",
                    sortable: false,
                    class: "black--text grey lighten-2"
                },
                
                {
                    text: "Tipe Kendaraan", 
                    align: "center",
                    sortable: false,
                    value: "prk_type",
                    class: "black--text grey lighten-2"
                },
                {
                    text: "Tanggal Input",
                    align: "center",
                    value: "prk_registration_date",
                    class: "black--text grey lighten-2 arrow"
                },
                {
                    text: "Status Aktif",
                    align: "center",
                    value: "prk_status",
                    class: "black--text grey lighten-2 arrow"
                },
                
                {
                    text: "Action",
                    align: "center",
                    value: 'action',
                    sortable: false,
                    class: "black--text grey lighten-2"
                }
            ],

        };
    },

    methods:{
        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },
        onUnsubscribe(nik, nama, nopol, type){
            this.unsubscribe.nik = nik;
            this.unsubscribe.nama = nama;
            this.unsubscribe.nopol = nopol;
            this.unsubscribe.type = type;
            this.dialog.unsubscribe = true
        },
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
                    "get-kendaraan-ga?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    this.master_data = response.data.data;
                    this.data = this.master_data
                    // console.log(response)
                    if(response.data.response_code == '22'){
                        alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                        this.removeLocalStorage();
                    }
                    else if(response.data.response_code == '21'){
                        alert('NIK tidak ditemukan. Silahkan Login kembali!')
                        this.removeLocalStorage();
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
        
        removeLocalStorage(){
            localStorage.removeItem("nama");
            localStorage.removeItem("phone");
            localStorage.removeItem("email");
            localStorage.removeItem("manager");
            localStorage.removeItem("cost_center");
            localStorage.removeItem("token");
            localStorage.removeItem("selection");
            localStorage.removeItem("nik");
            this.route('login')
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
                    "&prmb_kepemilikan=" + prmb_kepemilikan,
                    headers
                )
                .then((response) => {
                    // console.log(response.data.data)
                    var kendaraan = response.data.data
                    if(prmb_jenis_kendaraan == 'MOBIL'){
                        this.info.biaya_mobil = kendaraan[0].prmb_biaya + kendaraan[2].prmb_biaya
                        this.info.biaya_perpanjang_mobil = kendaraan[0].prmb_biaya
                        this.info.biaya_mutasi = kendaraan[1].prmb_biaya
                    }
                    else{
                        this.info.biaya_motor = kendaraan[0].prmb_biaya + kendaraan[3].prmb_biaya
                        this.info.biaya_perpanjang_motor = kendaraan[0].prmb_biaya
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data informasi biaya!");
                    return;
                })
            }
            catch (e){
                console.error(e);
                alert("Error: koneksi gagal");
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
                    if(response.data.response_code == '22'){
                        alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                        this.removeLocalStorage();
                    }
                    else if(response.data.response_code == '21'){
                        alert('NIK tidak ditemukan. Silahkan Login kembali!')
                        this.removeLocalStorage();
                    }

                    else if(response.data.response_code == '20'){
                        alert('Token tidak sesuai. Silahkan Login kembali!')
                        this.removeLocalStorage();
                    }

                    else if (this.data == []) {
                        this.dialog.loading = false;
                        this.dialog.unsubscribe = false;
                        return;
                    }
                    else if (!this.data) {
                        // console.log(response)
                        alert("Gagal terminate kendaraan!");    
                        this.dialog.loading = false;
                        this.dialog.unsubscribe = false;
                        return;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal terminate kendaraan! Silahkan coba lagi.");
                    this.dialog.loading = false;
                    this.dialog.unsubscribe = false;
                    return;
                });

                // Break if request failed
                if (!this.data) {
                    this.dialog.loading = false;
                    this.dialog.unsubscribe = false;
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
            alert('Unsubscribe/terminate Kendaraan berhasil!')
            this.dialog.loading = false;
            this.dialog.unsubscribe = false;
            this.getDataKendaraan();
            this.radioFilter = 'Semua';
        },

        async getFilterData(){
            this.dialog.loading = true;
            var filtered_array = []
            if(this.radioFilter == 'active'){
                filtered_array = this.master_data.filter((item) => item.prk_status == 'T');
                this.data = filtered_array
            }

            else if(this.radioFilter == 'inactive'){
                filtered_array = this.master_data.filter((item) => item.prk_status == 'F');
                this.data = filtered_array
            }
            else{
                this.data = this.master_data;
            }
            this.dialog.loading = false;
        }
    },

    async mounted(){
        if (!localStorage.nama) {
                this.removeLocalStorage();
        }
        if(localStorage.getItem('cost_center') != 'HRGA'){
            this.route('home');
        }
        this.getDataKendaraan();
    }
}
</script>

<style>
.arrow .v-data-table-header__icon {
    opacity: 1;
}
</style>
<template>
    <v-col>
        <v-dialog 
        width="400"
        v-model="alert.fail" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="error">
                {{msg}}
            </v-alert>
        </v-dialog>
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
        <!-- DIALOG nik START -->
        <v-dialog
            persistent
            content-class="elevation-0"
            v-model="dialog.nik"
            width="1000"
            height="100%">
            <div style="display: flex; align-items: start; justify-content: center">
                <v-card
                    flat
                    tile
                    height="100%"
                    width="100%"
                    class="mb-4 text-center"
                    style="border-radius: 25px 25px 25px 25px !important">
                    <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                        <v-card elevation="3" outlined style="width: 100% !important">
                            <v-row>
                                <v-col>
                                    <div class="ma-4 pa-2 d-flex flex-row">
                                        <h2 style="font-weight: 400">Cari Karyawan</h2>
                                        <v-spacer></v-spacer>
                                        <v-hover v-slot="{hover}">
                                            <v-btn icon class="mr-5" @click="dialog.nik = false"><v-icon :color="hover ? 'red' : ''">mdi-close</v-icon></v-btn>
                                        </v-hover>
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
                                                <v-row class="d-flex px-6">
                                                    <v-text-field v-model="search" style="border-radius: 10px 0px 0px 10px; border-right: 0px;" placeholder="Cari nik atau nama karyawan" outlined></v-text-field>
                                                    <v-btn @click="getKaryawan" style="border-radius: 0px 10px 10px 0px;" dark height="56" x-large color="primary"><v-icon>mdi-magnify</v-icon></v-btn>
                                                </v-row>
                                                <v-row class="">
                                                    <v-layout class="px-6" style="">
                                                        <v-flex style="overflow:auto;">
                                                            <v-data-table
                                                            :headers="header_list"
                                                            height="39vh"
                                                            fixed-header
                                                            :items="headers.c">
                                                                <template v-slot:item.action="{item}">
                                                                    <v-btn color="primary" @click="pilihKaryawan(item.nik, item.nama)">Pilih</v-btn>
                                                                </template>
                                                            </v-data-table>
                                                        </v-flex>
                                                    </v-layout>
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
        <!-- DIALOG NIK END -->
        <!-- DIALOG CANCEL START-->
        <v-dialog
            persistent
            v-model="dialog.cancel"
            width="500">
            <v-card>
                <v-card-title class="text-h5">Balik ke beranda</v-card-title>
                <v-card-text>Apakah anda yakin ingin keluar dari halaman tambah kendaraan?</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog.cancel = false">
                        TIDAK
                    </v-btn>
                    <v-btn
                        color="error"
                        text
                        @click="route('home')">
                        YA 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- DIALOG CANCEL END -->
        <!-- DIALOG SUBMIT START-->
        <v-dialog
            persistent
            v-model="dialog.submit"
            width="500">
            <v-card class="text-center">
                <v-icon size="100" color="primary" class="mt-5 mb-3">mdi-help-circle-outline</v-icon>   
                <v-card-text v-if="data_kendaraan.prk_nopol" class="black--text font-weight-bold mt-5 pb-3 mt-3" style="font-size: 20px;">No. Pol adalah {{data_kendaraan.prk_nopol}}</v-card-text>
                <v-card-text style="font-size: 16px;">Apakah anda yakin untuk melakukan pendaftaran kendaraan?</v-card-text>
                    <v-btn
                        class="mr-3 mb-10 white--text"
                        color="orange"
                        width="100"
                        @click="onSubmit">
                        YA
                    </v-btn>
                    <v-btn
                        class="mb-10 white--text"
                        color="grey"
                        width="100"
                        @click="dialog.submit = false">
                        TIDAK
                    </v-btn>
                <!-- </v-card-actions> -->
            </v-card>
        </v-dialog>
        <!-- DIALOG SUBMIT END -->
        <!-- DIALOG SUBMIT SUCCESS START-->
        <v-dialog
            persistent
            v-model="dialog.success"
            width="500">
            <v-card class="text-center">
                <v-icon size="100" color="success" class="mt-5 mb-3">mdi-check-circle-outline</v-icon>
                <v-card-text style="font-size: 16px;">Kendaraan berhasil didaftarkan, silahkan ambil kartu parkir di Tim General Affair dan mohon sertakan fotocopy STNK dan Biaya Awal</v-card-text>
                <!-- <v-card-text style="font-size: 16px;" class="mb-5">Tolong Bawa:<br/>- Fotocopy STNK <br/>- Total Biaya Awal</v-card-text> -->
                    <v-btn
                        class="mb-10"
                        color="primary"
                        width="100"
                        @click="route('home')">
                        OK
                    </v-btn>
                <!-- </v-card-actions> -->
            </v-card>
        </v-dialog> 
        <!-- DIALOG SUBMIT SUCCESS END -->
        <!-- DIALOG SUBMIT FAIL START-->
        <v-dialog
            persistent
            v-model="dialog.fail"
            width="500">
            <v-card class="text-center">
                <v-icon size="100" color="error" class="mt-5 mb-3">mdi-close-circle-outline</v-icon>
                <v-card-text style="font-size: 16px;">No. Polisi yang anda masukkan telah terdaftar!</v-card-text>
                    <v-btn
                        class="mb-10"
                        color="primary"
                        width="100"
                        @click="dialog.fail = false">
                        OK
                    </v-btn>
                <!-- </v-card-actions> -->
            </v-card>
        </v-dialog> 
        <!-- DIALOG SUBMIT FAIL END -->
        <!--  TAMBAH KENDARAAN -->
        <div style="display: flex; align-items: start; justify-content: center">
        <v-card
            flat
            tile
            width="80%"
            class="mb-4 px-8 py-4 mt-5 text-center"
            style="border-radius: 25px 25px 25px 25px !important">
            <div id="card" class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                <v-card elevation="3" outlined style="width: 100% !important">
                    <v-row>
                        <v-col>
                            <div class="ma-4 pa-2 d-flex flex-row">
                                <h2 style="font-weight: 400">Tambah Kendaraan</h2>
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
                                        <v-row>
                                            <v-col cols="6">
                                                <v-row class="pr-4 text-start mb-2">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tipe Kepemilikan <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-select
                                                        v-model="data_kendaraan.prk_tipe_kepemilikan"
                                                        dense
                                                        hide-details="auto"
                                                        :rules="textInputRules"
                                                        :items="kepemilikan_select"
                                                        @change="checkTypeKendaraan(data_kendaraan.prk_type, data_kendaraan.prk_tipe_kepemilikan)"
                                                        :filled="cost_center != 'HRGA'"
                                                        :readonly="cost_center != 'HRGA'"
                                                        required
                                                        outlined
                                                    ></v-select>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start mt-0 pt-1">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8" class="mb-3">
                                                        <v-text-field
                                                        v-if="cost_center != 'HRGA'"
                                                        v-model="data_kendaraan.prk_nik"
                                                        dense
                                                        hide-details="auto"
                                                        :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                        outlined
                                                        :filled="cost_center != 'HRGA'"
                                                        :readonly="cost_center != 'HRGA'"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            v-else
                                                            v-model="data_kendaraan.prk_nik"
                                                            class="cursor"
                                                            :rules="textInputRules"
                                                            dense
                                                            hide-details="auto"
                                                            outlined
                                                            readonly
                                                            :filled="cost_center != 'HRGA'"
                                                            append-icon="mdi-account-search"
                                                            @click:append="dialog.nik = true"
                                                            @click="dialog.nik = true"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start mt-0 pt-1 mb-3">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-text-field
                                                        style=""
                                                        dense
                                                        hide-details="auto"
                                                        v-model="data_kendaraan.prk_nama"
                                                        :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                        @input="data_kendaraan.prk_nama = data_kendaraan.prk_nama.toUpperCase()"
                                                        outlined
                                                        :filled="cost_center != 'HRGA' || data_kendaraan.prk_nik != 'XXX'"
                                                        :readonly="cost_center != 'HRGA' || data_kendaraan.prk_nik != 'XXX'"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col class="" cols="6">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tipe Kendaraan <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-select
                                                        v-model="data_kendaraan.prk_type"
                                                        :rules="textInputRules"
                                                        :items="item_select"
                                                        dense
                                                        hide-details="auto"
                                                        :filled="data_kendaraan.prk_nik == '' || data_kendaraan.prk_nik == null"
                                                        :readonly="data_kendaraan.prk_nik == '' || data_kendaraan.prk_nik == null"
                                                        required
                                                        @change="checkTypeKendaraan(data_kendaraan.prk_type, data_kendaraan.prk_tipe_kepemilikan)"
                                                        outlined
                                                    ></v-select>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Polisi <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8" class="mb-0 pb-0">
                                                        <v-row class="ma-0">
                                                            <v-text-field
                                                                :rules="textInputRules.concat(formatRules)"
                                                                v-model="data_kendaraan.prk_nopol"
                                                                dense
                                                                hide-details="auto"
                                                                @input="data_kendaraan.prk_nopol = data_kendaraan.prk_nopol.toUpperCase()"
                                                                outlined
                                                            ></v-text-field>
                                                        </v-row>
                                                        <v-row class="ma-0">
                                                            <small>*A 1234 ABC</small>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <!--Nomer kendaraan brp-->
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Kendaraan ke  <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8" class="mb-0 pb-0">
                                                        <v-row class="ma-0">
                                                            <v-text-field
                                                                v-model="count_kendaraan"
                                                                readonly
                                                                dense
                                                                hide-details="auto"
                                                                outlined
                                                            ></v-text-field>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-divider style="border-width: 1px;"></v-divider>
                                        <v-row class="mt-5">
                                            <v-col cols="6">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Biaya Parkir <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-currency-field
                                                        v-model="data_kendaraan.prk_biaya_parkir"
                                                        @change="getBiayaPerbulan"
                                                        :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                        :filled="cost_center != 'HRGA'"
                                                        :readonly="cost_center != 'HRGA'"
                                                        outlined
                                                        dense
                                                        hide-details="auto"/>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Subsidi Parkir <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8" class="pb-0 mb-0">
                                                        <v-row class="ma-0">
                                                            <v-currency-field
                                                            v-model="data_kendaraan.prk_biaya_subsidi"
                                                            @change="getBiayaPerbulan"
                                                            hide-details="auto"
                                                            :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                            :filled="cost_center != 'HRGA'"
                                                            dense
                                                            :readonly="cost_center != 'HRGA'"
                                                            outlined/>
                                                        </v-row>
                                                        <v-row class="ma-0">
                                                            <small>*Subsidi Rp 25.000 hanya untuk kendaraan pertama</small>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Biaya Kartu</h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-currency-field
                                                        v-model="data_kendaraan.prk_biaya_kartu"
                                                        @change="getBiayaPerbulan"
                                                        hide-details="auto"
                                                        readonly
                                                        dense
                                                        outlined/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col class="" cols="6">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Biaya Awal <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-row class="ma-0">
                                                            <v-currency-field
                                                            v-model="data_kendaraan.prk_total_biaya_awal"
                                                            @change="getBiayaPerbulan"
                                                            :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                            :filled="cost_center != 'HRGA'"
                                                            dense
                                                            hide-details="auto"
                                                            :readonly="cost_center != 'HRGA'"
                                                            outlined/>
                                                        </v-row>
                                                        <v-row class="ma-0">
                                                            <small>*Dibayar hanya saat pendaftaran baru</small>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text" style="font-weight: 400; font-size: 16px">Total Biaya Perbulan <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                    </v-col>
                                                        <v-col cols="8">
                                                            <v-row class="ma-0">
                                                                <v-currency-field
                                                                dense
                                                                hide-details="auto"
                                                                v-model="data_kendaraan.prk_total_biaya_perbulan"
                                                                @change="getBiayaPerbulan"
                                                                :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                                :filled="cost_center != 'HRGA'"
                                                                :readonly="cost_center != 'HRGA'"
                                                                outlined/>
                                                            </v-row>
                                                            <v-row class="ma-0">
                                                                <small>*Dipotong dari gaji</small>
                                                            </v-row>
                                                        </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row >
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-8 white--text" width="200" color="red lighten-1" @click="(dialog.cancel = true)">Cancel</v-btn>
                                            <v-btn color="green white--text" width="200" @click="(dialog.submit = true)">Submit</v-btn>
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
    <!-- TAMBAH KENDARAAN END -->
                       
    </v-col>
</template>

<script>
import axios from 'axios'
import { api_url } from '../global_variable/global_variable.js';
export default {
    name: "TambahKendaraan",
    components: {},

    data() {
        return {
            msg: null,
            item_select: ['MOBIL', 'MOTOR'],
            kepemilikan_select: [],
            data_kepemilikan: null,
            total_kendaraan: null,
            total_mobil: null,
            total_motor: null,
            cost_center: null,
            count_kendaraan: null,
            alert:{
                success: false,
                fail: false,
            },
            dialog:{
                loading: false,
                nik: false,
                submit: false,
                cancel: false,
                success: false,
                fail: false
            },
            options: {
                locale: "en-US",
                length: 11,
                precision: 0
            },
            textInputRules: [(v) => !!v || "Kolom harus diisi"],
            formatRules: [ (v) => /^[A-Za-z]{0,2} [0-9]{0,4} [A-Za-z]{0,3}$/.test(v) || "No. Pol tidak sesuai"],
            data_kendaraan:{
                prk_nik: null,
                prk_nama: null,
                prk_nopol: null,
                prk_type: null,
                prk_biaya_parkir: null,
                prk_biaya_kartu: null,
                prk_biaya_subsidi: null,
                prk_total_biaya_awal: null,
                prk_total_biaya_perbulan: null,
                prk_tipe_kepemilikan: null
            },
            header_list: [
                {
                    text: "Action",
                    align: "center",
                    width: '250',
                    sortable: false,
                    value: "action",
                    class: "black--text grey lighten-2 arrow"
                },
                
                {
                    text: "NIK", 
                    align: "center",
                    width: '275',
                    sortable: false,
                    value: "nik",
                    class: "black--text grey lighten-2"
                },
                
                {
                    text: "Nama",
                    align: "center",
                    width: '300',
                    sortable: false,
                    value: "nama",
                    class: "black--text grey lighten-2"
                },
            ],

            headers:{
                a: {
                    'nik': 'XXX',
                    'nama': '-'
                    },

                b: null,
                c: []
            },
            search: '',

        };
    },

    methods:{
        pilihKaryawan(nik, nama){
            this.data_kendaraan.prk_nik = nik;
            this.data_kendaraan.prk_nama = nama == '-' ? null : nama
            this.search = null;
            this.headers.c = [];
            this.headers.c.push(this.headers.a);
            this.data_kendaraan.prk_nopol = null;
            this.data_kendaraan.prk_type = null;
            this.data_kendaraan.prk_biaya_parkir = null;
            this.data_kendaraan.prk_biaya_subsidi = null;
            this.data_kendaraan.prk_biaya_kartu = null;
            this.data_kendaraan.prk_total_biaya_awal = null;
            this.data_kendaraan.prk_total_biaya_perbulan = null;
            this.dialog.nik = false
            this.getTotalKendaraan(this.data_kendaraan.prk_nik)
        },
        async getKaryawan(){
            try{
                this.headers.c = [];
                this.headers.c.push(this.headers.a);

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
                    "get-karyawan?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') + 
                    "&cari=" + this.search,
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

                    if(response.data.status == false){
                        alert('NIK atau nama yang anda cari tidak ditemukan!');
                        this.search = null;
                        this.headers.b = {};
                        this.dialog.loading = false;
                        return;
                    }

                    else{
                        var data = response.data.data
                        this.headers.b = data;
                        this.headers.c = this.headers.b;
                        this.headers.c.unshift(this.headers.a);
                    }

                    
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data banyak kendaraan!");
                    this.dialog.loading = false;
                    return;
                })
            }
            catch (e){
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                return;
            }
            this.dialog.loading = false;
        },

        async getKepemilikan(){
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
                    "get-kepemilikan?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    // console.log(response)
                    this.data_kepemilikan = response.data.data;

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

                    else{
                        var sorted = this.data_kepemilikan.sort(function(a, b) {return a.pmk_id - b.pmk_id})
                        this.data_kepemilikan = sorted;
                        console.log(this.data_kepemilikan)
                    
                        for(let i = 0; i < this.data_kepemilikan.length; i++){
                            this.kepemilikan_select.push(this.data_kepemilikan[i].pmk_kepemilikan);
                        }
                        // var kepemilikan = null;
                        // var index = this.kepemilikan_select.indexOf(this.data_kendaraan.prk_tipe_kepemilikan);
                        // kepemilikan = this.data_kepemilikan[index].pmk_id;
                        // console.log(kepemilikan)
                    }  
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data banyak kendaraan!");
                    this.dialog.loading = false;
                    return;
                })
            }
            catch (e){
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                return;
            }
            this.dialog.loading = false;
        },

        async checkTypeKendaraan(prmb_jenis_kendaraan, pmk_kepemilikan){    
            
            if(pmk_kepemilikan == 'CARLOAN'){
                this.item_select = ['MOBIL'];
            }
            else{
                this.item_select = ['MOBIL', 'MOTOR'];
            }

            if(pmk_kepemilikan == 'CARLOAN' && prmb_jenis_kendaraan == 'MOTOR'){
                alert('Untuk tipe kepemilikan CARLOAN tidak bisa memilih jenis kendaraan motor!');
                this.data_kendaraan.prk_biaya_parkir = null;
                this.data_kendaraan.prk_biaya_subsidi = null;
                this.data_kendaraan.prk_biaya_kartu = null;
                this.data_kendaraan.prk_total_biaya_awal = null;
                this.data_kendaraan.prk_total_biaya_perbulan = null;
                return;
            }
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
                    "get-biaya?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') +
                    "&prmb_jenis_kendaraan=" + prmb_jenis_kendaraan +
                    "&pmk_kepemilikan=" + pmk_kepemilikan,
                    headers
                )
                .then((response) => {
                    var data = response.data.data
                    // console.log(data)
                    var kendaraan = response.data.data
                    // if(prmb_jenis_kendaraan == 'MOBIL'){
                        // console.log(Array(kendaraan).filter((item) => item.prmb_jenis_biaya == 'BIAYA_PARKIR'))

                        this.data_kendaraan.prk_biaya_kartu = kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('REGISTER_KARTU')].prmb_biaya;
                        if(pmk_kepemilikan == 'PRIBADI' && this.total_kendaraan > 0){
                            this.data_kendaraan.prk_biaya_subsidi = '0';
                        }
                        else{
                            // this.data_kendaraan.prk_biaya_subsidi = prmb_jenis_kendaraan == 'MOTOR' ? kendaraan[2].prmb_biaya: kendaraan[3].prmb_biaya;
                            this.data_kendaraan.prk_biaya_subsidi = kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('SUBSIDI_PARKIR')].prmb_biaya;
                        }

                        if(this.data_kendaraan.prk_type == 'MOBIL'){
                            this.data_kendaraan.prk_biaya_parkir = this.total_mobil < 1 
                            ? kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('BIAYA_PARKIR')].prmb_biaya
                            : kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('BIAYA_PARKIR2')].prmb_biaya
                        }
                        else if(this.data_kendaraan.prk_type == 'MOTOR'){
                            this.data_kendaraan.prk_biaya_parkir = this.total_motor < 1 
                            ? kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('BIAYA_PARKIR')].prmb_biaya
                            : kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('BIAYA_PARKIR2')].prmb_biaya
                        }

                        this.data_kendaraan.prk_total_biaya_awal = this.data_kendaraan.prk_biaya_parkir + this.data_kendaraan.prk_biaya_kartu - this.data_kendaraan.prk_biaya_subsidi >= 0
                        ?  this.data_kendaraan.prk_biaya_parkir + this.data_kendaraan.prk_biaya_kartu - this.data_kendaraan.prk_biaya_subsidi : '0'

                        this.data_kendaraan.prk_total_biaya_perbulan = this.data_kendaraan.prk_biaya_parkir - this.data_kendaraan.prk_biaya_subsidi >= 0 
                        ? this.data_kendaraan.prk_biaya_parkir - this.data_kendaraan.prk_biaya_subsidi : '0';

                        
                        // this.data_kendaraan.prk_biaya_kartu =  pmk_kepemilikan == 'CARLOAN' || pmk_kepemilikan == 'ROP' ? kendaraan[1].prmb_biaya : kendaraan[2].prmb_biaya
                        // this.data_kendaraan.prk_biaya_parkir = pmk_kepemilikan == 'PRIBADI' ? kendaraan[0].prmb_biaya : kendaraan[3].prmb_biaya;
                    // }
                    // else if(prmb_jenis_kendaraan == 'MOTOR'){
                    //     this.data_kendaraan.prk_biaya_kartu =  pmk_kepemilikan == 'ROP' ? kendaraan[1].prmb_biaya : (prmb_jenis_kendaraan == 'MOTOR' ? kendaraan[3].prmb_biaya: kendaraan[2].prmb_biaya);

                    //     if(pmk_kepemilikan == 'PRIBADI' && this.total_kendaraan > 0){
                    //         this.data_kendaraan.prk_biaya_subsidi = '0';
                    //     }
                    //     else{
                    //         this.data_kendaraan.prk_biaya_subsidi = prmb_jenis_kendaraan == 'MOTOR' ? kendaraan[2].prmb_biaya: kendaraan[3].prmb_biaya;
                    //     }
                        
                    //     // this.data_kendaraan.prk_biaya_subsidi = pmk_kepemilikan == 'PRIBADI' && 
                    //     // (this.total_kendaraan > 0 || this.total_kendaraan == null)  ? '0' : kendaraan[2].prmb_biaya;
                        
                    //     this.data_kendaraan.prk_biaya_parkir = pmk_kepemilikan != 'ROP' ? kendaraan[0].prmb_biaya : kendaraan[3].prmb_biaya;
                    //     this.data_kendaraan.prk_total_biaya_awal = this.data_kendaraan.prk_biaya_parkir + this.data_kendaraan.prk_biaya_kartu - this.data_kendaraan.prk_biaya_subsidi >= 0
                    //     ?  this.data_kendaraan.prk_biaya_parkir + this.data_kendaraan.prk_biaya_kartu - this.data_kendaraan.prk_biaya_subsidi : '0'

                    //     this.data_kendaraan.prk_total_biaya_perbulan = kendaraan[0].prmb_biaya - this.data_kendaraan.prk_biaya_subsidi >= 0 
                    //     ? kendaraan[0].prmb_biaya - this.data_kendaraan.prk_biaya_subsidi : '0';
                    // }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data informasi biaya!");
                    this.dialog.loading = false;
                    return;
                })
            }
            catch (e){
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                return;
            }
            // var kepemilikan = null;
            // var index = this.kepemilikan_select.indexOf(this.data_kendaraan.prk_tipe_kepemilikan);
            // kepemilikan = this.data_kepemilikan[index].pmk_id;
            // console.log(kepemilikan)
            this.dialog.loading = false;
        },

        getBiayaPerbulan(){
            this.data_kendaraan.prk_total_biaya_perbulan = this.data_kendaraan.prk_biaya_parkir - this.data_kendaraan.prk_biaya_subsidi;
            if(this.data_kendaraan.prk_total_biaya_perbulan <= 0){
                this.data_kendaraan.prk_total_biaya_perbulan = '0';
            }

            if(this.data_kendaraan.prk_biaya_parkir < 0){
                this.data_kendaraan.prk_biaya_parkir = '0'
            }

            this.data_kendaraan.prk_total_biaya_awal = parseInt(this.data_kendaraan.prk_biaya_parkir) + this.data_kendaraan.prk_biaya_kartu - this.data_kendaraan.prk_biaya_subsidi;
            if(this.data_kendaraan.prk_total_biaya_awal <= 0){
                this.data_kendaraan.prk_total_biaya_awal = '0';
            }

            else if(isNaN(this.data_kendaraan.prk_total_biaya_awal)){
                this.data_kendaraan.prk_total_biaya_awal = null;
            }
        },

        getTotalBiaya(){
            if(this.data_kendaraan.prk_total_biaya_perbulan < 0){
                this.data_kendaraan.prk_total_biaya_perbulan = '0'
            }

            if(this.data_kendaraan.prk_total_biaya_awal < 0){
                this.data_kendaraan.prk_total_biaya_awal = '0'
            }
        },

        async getTotalKendaraan(nik){
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
                    "get-nopol-count?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') + 
                    "&nik=" + nik,
                    headers
                )
                .then((response) => {
                    // console.log(response.data.data)
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
                    else{
                        var data = response.data.data
                        this.total_kendaraan = data[0].nopol_count;
                        this.total_mobil = data[1].mobil;
                        this.total_motor = data[2].motor;
                        this.count_kendaraan = data[0].nopol_count + 1;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal mengambil data banyak kendaraan!");
                    return;
                })
            }
            catch (e){
                console.error(e);
                alert("Error: koneksi gagal");
                return;
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
            this.route('login')
        },

        async onSubmit() {
            if(this.data_kendaraan.prk_nopol != null && !/^[A-Za-z]{0,2} [0-9]{0,4} [A-Za-z]{0,3}$/.test(this.data_kendaraan.prk_nopol)){
                this.alert.fail = true;
                this.msg = 'No. Pol tidak sesuai!'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }
            else if(this.data_kendaraan.prk_nopol == null || this.data_kendaraan.prk_type == null){
                this.msg = 'Lengkapi kolom yang wajib diisi'
                this.alert.fail = true;
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }
            else if(this.cost_center == 'HRGA' && (this.data_kendaraan.prk_nopol == null ||
            this.data_kendaraan.prk_type == null ||
            this.data_kendaraan.prk_nama == null||
            this.data_kendaraan.prk_nik == null ||
            this.data_kendaraan.prk_biaya_subsidi == null)){
                this.alert.fail = true;
                this.msg = 'Lengkapi kolom yang wajib diisi'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }
            var kepemilikan = null;
            var index = this.kepemilikan_select.indexOf(this.data_kendaraan.prk_tipe_kepemilikan);
            kepemilikan = this.data_kepemilikan[index].pmk_id;
            
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
                    "nopol": this.data_kendaraan.prk_nopol,
                    "type": this.data_kendaraan.prk_type,
                    "kepemilikan": kepemilikan,
                    "nik": this.data_kendaraan.prk_nik,
                    "nama": String(this.data_kendaraan.prk_nama).toUpperCase(),
                    "biaya_parkir": this.data_kendaraan.prk_biaya_parkir,
                    "biaya_kartu": this.data_kendaraan.prk_biaya_kartu,
                    "biaya_subsidi": this.data_kendaraan.prk_biaya_subsidi,
                    "total_biaya_awal": this.data_kendaraan.prk_total_biaya_awal,
                    "total_biaya_perbulan": this.data_kendaraan.prk_total_biaya_perbulan
                }
                await axios
                .post(
                    api_url +
                    "kendaraan?mu_token=" +
                    localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik'),
                    body,
                    headers
                )
                .then((response) => {
                    this.data = response.data.data;
                    // console.log(this.data)
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
                    else if(response.data.response_code == '12'){
                        this.dialog.loading = false;
                        this.dialog.submit = false;
                        this.dialog.fail = true;
                        return;
                    }
                    else if (this.data == []) {
                        this.dialog.loading = false;
                        this.dialog.submit = false;
                        return;
                    }
                    else if (!this.data) {
                        // console.log(response)
                        this.dialog.loading = false;
                        this.dialog.submit = false;
                        this.msg = 'Gagal menambahkan data!'
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
                        return;
                    }
                    else if(response.data.data.status == true){
                        this.dialog.loading = false;
                        this.dialog.submit = false;
                        this.dialog.success = true;
                        // return this.$router.push({ path: '/home' }); 
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    this.msg = 'Gagal menambahkan data! Silahkan coba lagi'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.loading = false;
                    this.dialog.submit = false;
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
                this.msg = 'Error: koneksi gagal'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.loading = false;
                this.dialog.submit = false;
                this.dialog.fail = true;
                return;
            }
            this.dialog.loading = false;
            
        },
        
        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },

    },

    mounted(){
        if (!localStorage.nama) {
                this.removeLocalStorage();
        }
        this.data_kendaraan.prk_tipe_kepemilikan = 'PRIBADI';
        if(localStorage.getItem('cost_center') == 'HRGA'){
            this.cost_center = localStorage.getItem('cost_center')
        }
        else{
            this.data_kendaraan.prk_nik = localStorage.getItem('nik');
            this.data_kendaraan.prk_nama = localStorage.getItem('nama');
        }
        this.headers.c.push(this.headers.a);
        this.getKepemilikan();
        this.getTotalKendaraan(this.data_kendaraan.prk_nik);
        // console.log()
    }
}
</script>

<style scoped>
.cursor :deep(input) {
  cursor: pointer;
}
</style>
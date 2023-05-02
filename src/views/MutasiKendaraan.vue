<template>
    
    <v-col>
        <v-dialog 
        width="500"
        v-model="alert.fail" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="error">
                {{msg}}
            </v-alert>
        </v-dialog>
        <v-dialog 
        width="550"
        v-model="alert.success" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="success">
                {{'Berhasil memutasikan No. Polisi ' + data_mutasi.prmk_nopol_lama + ' menjadi ' + data_mutasi.prmk_nopol_baru}}
            </v-alert>
        </v-dialog>
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
                <v-card-text>Apakah anda yakin untuk melakukan mutasi kendaraan?</v-card-text>
                    <v-btn
                        class="mr-3 mb-10"
                        color="primary"
                        width="100"
                        @click="onSubmit">
                        YA
                    </v-btn>
                    <v-btn
                        class="mb-10"
                        color="error"
                        width="100"
                        @click="dialog.submit = false">
                        TIDAK
                    </v-btn>
                <!-- </v-card-actions> -->
            </v-card>
        </v-dialog>
        <!-- DIALOG SUBMIT END -->
        <!-- DIALOG SUBMIT SUCCESS START-->

        <!-- DIALOG SUBMIT SUCCESS END -->
        <!-- DIALOG SUBMIT FAIL START-->

        <!-- DIALOG SUBMIT FAIL END -->
        <!--  TAMBAH KENDARAAN -->
        <div style="display: flex; align-items: start; justify-content: center">
        <v-card
            flat
            tile
            width="80%"
            class="mb-4 px-8 py-4 mt-5 text-center"
            style="border-radius: 25px 25px 25px 25px !important">
            <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                <v-card elevation="3" outlined style="width: 100% !important">
                    <v-row>
                        <v-col>
                            <div class="ma-3 ml-5 pa-2 d-flex flex-row">
                                <h3 style="font-weight: 500">Mutasi Kendaraan</h3>
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
                                                <v-row class="pr-4 text-start mb">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8" class="mb-5">
                                                        <v-text-field
                                                        v-model="data_mutasi.prmk_nik"
                                                        outlined
                                                        dense
                                                        hide-details="auto"
                                                        :rules="textInputRules"
                                                        @change="getKendaraanGA"
                                                        :filled="cost_center != 'HRGA'"
                                                        :readonly="cost_center != 'HRGA'"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-text-field
                                                        v-if="cost_center != 'HRGA'"
                                                        v-model="data_mutasi.prmk_nama"
                                                        dense
                                                        hide-details="auto"
                                                        outlined
                                                        filled
                                                        readonly
                                                        ></v-text-field>
                                                        <v-select
                                                        v-else
                                                        v-model="data_mutasi.prmk_nama"
                                                        :rules="textInputRules"
                                                        @change="getNopolGA"
                                                        dense
                                                        hide-details="auto"
                                                        :items="item_nama"
                                                        :filled="data_mutasi.prmk_nik == null || data_mutasi.prmk_nik == ''"
                                                        :readonly="data_mutasi.prmk_nik == null || data_mutasi.prmk_nik == ''"
                                                        outlined
                                                        ></v-select>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col class="" cols="6">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Polisi Lama <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-row class="ma-0">
                                                            <!-- <v-text-field v-if="cost_center == 'HRGA'"
                                                                @input="data_mutasi.prmk_nopol_lama = data_mutasi.prmk_nopol_lama.toUpperCase()"
                                                                v-model="data_mutasi.prmk_nopol_lama"
                                                                :rules="textInputRules.concat(formatRules)"
                                                                @change="getKendaraanGA"
                                                                required
                                                                outlined
                                                                hide-details="auto"
                                                            ></v-text-field> -->
                                                            <v-select
                                                                v-model="data_mutasi.prmk_nopol_lama"
                                                                :rules="textInputRules"
                                                                @change="checkTipeKendaraan"
                                                                :items="item_nopol"
                                                                :filled="data_mutasi.prmk_nama == null || data_mutasi.prmk_nama == ''"
                                                                :readonly="data_mutasi.prmk_nama == null || data_mutasi.prmk_nama == ''"
                                                                required
                                                                outlined
                                                                dense
                                                                hide-details="auto"
                                                            ></v-select>
                                                        </v-row>
                                                        <v-row class="ma-0">
                                                            <small>*A 1234 ABC</small>
                                                        </v-row>


                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tipe Kendaraan <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-row class="ma-0">
                                                            <v-text-field
                                                                v-model="data_mutasi.prmk_type"
                                                                filled
                                                                dense
                                                                readonly
                                                                :rules="textInputRules"
                                                                hide-details="auto"
                                                                outlined
                                                            ></v-text-field>
                                                        </v-row>
                                                        <v-row class="ma-0">
                                                            <small>*Mutasi dapat dilakukan untuk tipe kendaraan yang sama</small>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Polisi Baru <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="8">
                                                        <v-row class="ma-0">
                                                            <v-text-field
                                                            v-model="data_mutasi.prmk_nopol_baru"
                                                            @input="data_mutasi.prmk_nopol_baru = data_mutasi.prmk_nopol_baru.toUpperCase()"
                                                            :rules="textInputRules.concat(formatRules).concat(duplicateRules)"
                                                            required
                                                            :filled="data_mutasi.prmk_nopol_lama == null || data_mutasi.prmk_nopol_lama == ''"
                                                            :readonly="data_mutasi.prmk_nopol_lama == null || data_mutasi.prmk_nopol_lama == ''"
                                                            dense
                                                            hide-details="auto"
                                                            outlined
                                                            ></v-text-field>
                                                        </v-row>
                                                        <v-row class="ma-0 mb-5">
                                                            <small>*A 1234 ABC</small>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-divider style="border-width: 0.5px;"></v-divider>
                                        <v-row class="mt-5">
                                            <v-col cols="6">
                                                
                                            </v-col>
                                            <v-col class="pl-7" cols="6">
                                                <v-row class="pr-7 text-start">
                                                    <v-row>
                                                        <v-col cols="4" class="text-start ma-0 pa-auto">
                                                            <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Biaya Mutasi <strong v-if="cost_center == 'HRGA'" class="red--text">*</strong></h3>
                                                        </v-col>
                                                        <v-col cols="8" class="mb-5">
                                                            <v-row class="ma-0">
                                                                <v-currency-field
                                                                    filled
                                                                    dense
                                                                    hide-details="auto"
                                                                    v-model="data_mutasi.prmk_biaya_mutasi"
                                                                    :rules="cost_center == 'HRGA' ? textInputRules : []"
                                                                    :filled="cost_center != 'HRGA'"
                                                                    :readonly="cost_center != 'HRGA'"
                                                                    outlined/>
                                                            </v-row>
                                                            <v-row class="ma-0">
                                                                <small>*Uang diberikan tunai ke GA</small>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
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
            alert:{
                success: false,
                fail: false,
            },
            data_mutasi:{
                prmk_nopol_lama: null,
                prmk_nik: null,
                prmk_nopol_baru: null,
                prmk_type: null,
                prmk_kepemilikan: null,
                prmk_biaya_parkir: null,
                prmk_biaya_kartu: null,
                prmk_biaya_subsidi: null,
                prmk_total_biaya_awal: null,
                prmk_total_biaya_perbulan: null,
                prmk_nama: null,
                prmk_biaya_mutasi: null,
            },
            index:{
                nama: null,
                nopol_lama: null
            },
            data: [],
            data_ga: [],
            cost_center: null,
            item_nopol:[],
            item_nama: [],
            dialog:{
                loading: false,
                submit: false,
                cancel: false,
                success: false,
                fail: false
            },
            textInputRules: [(v) => !!v || "Kolom harus diisi"],
            formatRules: [ (v) => /^[A-Za-z]{0,2} [0-9]{0,4} [A-Za-z]{0,3}$/.test(v) || "No. Pol tidak sesuai"],
            duplicateRules: [ (v) => v != this.data_mutasi.prmk_nopol_lama|| "No. Pol Baru tidak boleh sama dengan No. Pol Lama"]
        };
    },

    methods:{
        
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
        
        async onSubmit(){
            if(this.data_mutasi.prmk_nopol_lama == null ||
            this.data_mutasi.prmk_nopol_baru == null ||
            this.data_mutasi.prmk_type == null){
                this.alert.fail = true;
                this.msg = 'Lengkapi kolom yang wajib diisi!'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }


            if(this.cost_center == 'HRGA' && this.data_mutasi.prmk_nopol_lama != null && !/^[A-Za-z]{0,2} [0-9]{0,4} [A-Za-z]{0,3}$/.test(this.data_mutasi.prmk_nopol_lama)){
                this.alert.fail = true;
                this.msg = 'No. Pol tidak sesuai!'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }

            if(this.data_mutasi.prmk_nopol_baru != null && !/^[A-Za-z]{0,2} [0-9]{0,4} [A-Za-z]{0,3}$/.test(this.data_mutasi.prmk_nopol_baru)){
                this.alert.fail = true;
                this.msg = 'No. Pol tidak sesuai!'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }

            if(this.data_mutasi.prmk_nopol_baru == this.data_mutasi.prmk_nopol_lama){
                this.alert.fail = true;
                this.msg = 'No. Polisi Baru tidak boleh sama dengan No. Polisi lama'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
                return;
            }

            if(this.cost_center == 'HRGA' && this.data_mutasi.prmk_biaya_mutasi == null){
                this.alert.fail = true;
                this.msg = 'Biaya mutasi wajib diisi'
                window.setTimeout(() => {
                    this.alert.fail = false;
                }, 2000)
                this.dialog.submit = false;
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

                const body = {
                    "nopol_lama": this.data_mutasi.prmk_nopol_lama,
                    "nik": this.data_mutasi.prmk_nik,
                    "nopol_baru": this.data_mutasi.prmk_nopol_baru,
                    "type": this.data_mutasi.prmk_type,
                    "kepemilikan": this.data_mutasi.prmk_kepemilikan,
                    "nama": String(this.data_mutasi.prmk_nama).toUpperCase(),
                    "biaya_parkir": this.data_mutasi.prmk_biaya_parkir,
                    "biaya_kartu": this.data_mutasi.prmk_biaya_kartu,
                    "biaya_subsidi": this.data_mutasi.prmk_biaya_subsidi,
                    "total_biaya_awal": this.data_mutasi.prmk_total_biaya_awal,
                    "total_biaya_perbulan": this.data_mutasi.prmk_total_biaya_perbulan,
                    "biaya_mutasi": this.data_mutasi.prmk_biaya_mutasi
                }

                await axios
                .post(
                    api_url +
                    "mutasi-kendaraan?mu_token=" +
                    localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik'),
                    body,
                    headers
                )
                .then((response) => {
                    this.data = response.data.data;
                    console.log(response)
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
                        this.alert.fail = true;
                        this.msg = 'No. Polisi ' + this.data_mutasi.prmk_nopol_baru + ' sudah terdaftar!'
                        this.dialog.submit = false;
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
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
                        this.alert.fail = true;
                        this.msg = 'Gagal memutasi kendaraan!'
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
                        return;
                    }

                    else if(response.data.data.status == true){
                        this.dialog.loading = false;
                        this.alert.success = true;
                        this.dialog.submit = false;
                        window.setTimeout(() => {
                            this.alert.success = false;
                            this.route('home');
                        }, 2000)
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    this.alert.fail = true;
                    this.msg = 'Gagal memutasi kendaraan! Silahkan coba lagi'
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
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                this.dialog.submit = false;
                this.dialog.fail = true;
                return;
            }
            this.dialog.loading = false;
            return;
        },

        checkTipeKendaraan(){
            if(this.cost_center == 'HRGA'){
                this.index.nopol_lama = parseInt(this.item_nopol.indexOf(this.data_mutasi.prmk_nopol_lama));
                this.data_mutasi.prmk_type = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_type;
                this.data_mutasi.prmk_biaya_kartu = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_biaya_kartu;
                this.data_mutasi.prmk_biaya_parkir = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_biaya_parkir;
                this.data_mutasi.prmk_biaya_subsidi = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_biaya_subsidi;
                this.data_mutasi.prmk_total_biaya_awal = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_total_biaya_awal;
                this.data_mutasi.prmk_total_biaya_perbulan = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_total_biaya_perbulan
                this.data_mutasi.prmk_kepemilikan = this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_kepemilikan
                // console.log(this.data_mutasi)
                console.log(this.data_ga[this.index.nama].list_kendaraan[this.index.nopol_lama].prk_biaya_kartu)
            }
            else{
                var index = this.item_nopol.indexOf(this.data_mutasi.prmk_nopol_lama)
                this.data_mutasi.prmk_type = this.data[index].prk_type;
                this.data_mutasi.prmk_biaya_kartu = this.data[index].prk_biaya_kartu;
                this.data_mutasi.prmk_biaya_parkir = this.data[index].prk_biaya_parkir;
                this.data_mutasi.prmk_biaya_subsidi = this.data[index].prk_biaya_subsidi;
                this.data_mutasi.prmk_total_biaya_awal = this.data[index].prk_total_biaya_awal;
                this.data_mutasi.prmk_total_biaya_perbulan = this.data[index].prk_total_biaya_perbulan;
                this.data_mutasi.prmk_kepemilikan = this.data[index].prk_kepemilikan;
                // console.log(this.data_mutasi)
            }
            this.getBiaya();
        },

        async getAllKendaraan(){
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
                    "get-nopol-lama?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    this.data = response.data.data
                    console.log(this.data)
                    for (var i = 0; i < this.data.length; i++){
                        this.item_nopol.push(this.data[i].prk_nopol)
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

        async getKendaraanGA(){
            if(this.data_mutasi.prmk_nik != null && this.data_mutasi.prmk_nik != ''){
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
                        "get-nopol-ga?mu_username=" + localStorage.getItem('nik') +
                        "&mu_token=" + localStorage.getItem('token') + 
                        "&nik=" + String(this.data_mutasi.prmk_nik),
                        headers
                    )
                    .then((response) => {
                        this.data_ga = response.data.data
                        console.log(this.data_ga.length)
                        if(this.data_ga.length <= 0){
                            alert('NIK ' + this.data_mutasi.prmk_nik + ' tidak ditemukan!');
                            this.data_mutasi.prmk_nik = null;
                            this.data_mutasi.prmk_nama = null;
                            this.data_mutasi.prmk_nopol_lama = null;
                            this.dialog.loading = false;
                            return;
                        }
                        else{
                            for (var i = 0; i < this.data_ga.length; i++){
                                this.item_nama.push(this.data_ga[i].prk_nama);
                            }
                            // this.item_nama.push = data[0].prk_nama;
                            
                            console.log(this.item_nama)
                            // this.item_nopol = data[0].list_kendaraan;
                        }
                    })
                    .catch((error) => {
                        console.log("ParkingRegistration.vue (error) :: ", error);
                        alert("Gagal mengambil data kendaraan untuk No. Polisi " + this.data_mutasi.prmk_nopol_lama +" !");
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
            }
            else{
                this.data_mutasi.prmk_nama = null;
                this.data_mutasi.prmk_nopol_lama = null;
                this.data_mutasi.prmk_type = null;
            }
            this.dialog.loading = false;
        },

        async getNopolGA(){
            if(this.data_mutasi.prmk_nama != null || this.data_mutasi.prmk_nama != ''){
                this.dialog.loading = true;
                this.index.nama = parseInt(this.item_nama.indexOf(this.data_mutasi.prmk_nama));
                console.log(this.index.nama)

                this.item_nopol = [];
                this.data_mutasi.prmk_nopol_lama = null;
                this.data_mutasi.prmk_type = null;
                
                for (var i = 0; i < this.data_ga[this.index.nama].list_kendaraan.length; i++){
                    this.item_nopol.push(this.data_ga[this.index.nama].list_kendaraan[i].prk_nopol);
                }
                this.dialog.loading = false;
            }
        },

        async getBiaya(){
            try{
                this.dialog.loading = true;
                var check = 'PRIBADI';
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
                    "&prmb_jenis_kendaraan=MOTOR" +
                    "&pmk_kepemilikan=" + check,
                    headers
                )
                .then((response) => {
                    // console.log(response.data.data)
                    var kendaraan = response.data.data
                    this.data_mutasi.prmk_biaya_mutasi = kendaraan[kendaraan.map(e => e.prmb_jenis_biaya).indexOf('MUTASI_KENDARAAN')].prmb_biaya
            
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
            this.dialog.loading = false;
        },

        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },
    },

    async created(){
        if(localStorage.getItem('cost_center') == 'HRGA'){
            // this.data_mutasi.prmk_nik = localStorage.getItem('nik');
            // this.data_mutasi.prmk_nama = localStorage.getItem('fullname');
            this.cost_center = localStorage.getItem('cost_center')
        }
        else{
            this.data_mutasi.prmk_nik = localStorage.getItem('nik');
            this.data_mutasi.prmk_nama = localStorage.getItem('nama');
        }
    },

    async mounted(){
        if (!localStorage.nama) {
                this.removeLocalStorage();
        }
        // this.getBiaya();
        console.log(this.data_mutasi.prmk_biaya_mutasi)
        if(localStorage.getItem('cost_center') == 'HRGA'){
            this.cost_center = localStorage.getItem('cost_center')
        }
        else{
            this.data_mutasi.prmk_nik = localStorage.getItem('nik');
            this.data_mutasi.prmk_nama = localStorage.getItem('nama');
            this.getAllKendaraan();
        }
    }
}
</script>
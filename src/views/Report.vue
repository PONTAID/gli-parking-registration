<template>
    <v-col class="d-flex justify-center">
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
        <!-- DIALOG DATEPICKER START -->
        <v-dialog ref="dialog" v-model="dialog.date" :return-value.sync="date" persistent class="ma-0 pa-0" width="290px">                               
            <v-row justify="center" class="ma-0 pa-0">
                <v-date-picker
                v-model="date"
                locale="id"
                width="290px"
                height="300px"
                type="month">
                    <v-btn text color="primary" @click="dialog.date = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
            </v-row>
        </v-dialog>
        <!-- DIALOG DATEPICKER END -->
        <div style="display: flex; align-items: start; justify-content: center">
        <v-card
            flat
            tile
            width="800"
            class="mb-4 px-8 py-4 mt-15 text-center"
            style="border-radius: 25px 25px 25px 25px !important">
            <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                <v-card elevation="3" outlined style="width: 100% !important">
                    <v-row>
                        <v-col>
                            <div class="ma-4 pa-2 d-flex flex-row">
                                <h1 style="font-weight: 400">Report {{ mode == 'finance' ? 'Finance' : (mode == 'quality-parking' ? 'Quality Parking' : 'GoCorp')}}</h1>
                            </div>
                        </v-col>
                    </v-row>    
                    <v-divider class="ml-8 mr-8"></v-divider>
                    <div
                        style="width: 100%;">
                        <v-col cols="12" md="12">
                            <v-card flat class="ma-0 pa-0" width="100%">
                                <v-card-text width="100%">
                                    <v-row class="ma-0 pa-0 mt-5 mb-7">
                                        <h2 class="black--text">Pilih data report {{ mode == 'finance' ? 'finance' : (mode == 'quality-parking' ? 'Quality Parking' : 'GoCorp') }} yang ingin di download:</h2>
                                    </v-row>
                                    <v-row v-if="mode=='finance' || mode == 'report-gocorp'" class="ma-0 pa-0">
                                        <v-text-field
                                            label="Pilih Tanggal"
                                            :value="getDateString()"
                                            prepend-inner-icon="mdi-calendar"
                                            hide-details
                                            outlined
                                            readonly
                                            @click="dialog.date = true"
                                        ></v-text-field>
                                    </v-row>
                                    <v-row v-else-if="mode=='quality-parking'" class="ma-0 pa-0">
                                        <v-col cols="12" md="12" class="ma-0 pa-0">
                                            <v-row class="ma-0 pa-0">
                                                <v-col cols="4" class="pa-0">
                                                    <v-text-field
                                                        label="Pilih Tanggal"
                                                        :value="getDateString()"
                                                        prepend-inner-icon="mdi-calendar"
                                                        hide-details
                                                        outlined
                                                        readonly
                                                        @click="dialog.date=true"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="4" class="pa-0 pr-1 pl-1">
                                                    <v-select
                                                        v-model="kepemilikan"
                                                        @change="changeType"
                                                        label="Tipe Kepemilikan"
                                                        :items="kepemilikan_select"
                                                        required
                                                        outlined
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="4" class="pa-0">
                                                    <v-select
                                                        v-model="type"
                                                        label="Tipe Kendaraan"
                                                        :items="type_select"
                                                        :readonly="kepemilikan == 'COMPANY'"
                                                        :filled="kepemilikan == 'COMPANY'"
                                                        required
                                                        outlined
                                                    ></v-select>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-0 mt-10">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            width="150"
                                            class="mb-5"
                                            @click="downloadReport"
                                            style="text-transform: unset;color:black;font-size: small;"
                                            color="green darken-1 white--text">
                                            <v-icon small dark class="mr-2">mdi-download</v-icon>&nbsp;Download
                                        </v-btn>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </div>
                </v-card>
            </div>
        </v-card>
    </div>    
    </v-col>
</template>

<script>
import axios from 'axios';
import { api_url, api_url_gocorp } from "../global_variable/global_variable.js";  

export default {
    name: "Report",
    components: {},

    data() {
        return {
            counter: 0,
            kepemilikan_select: ['PRIBADI', 'COMPANY'],
            type_select: ['SEMUA', 'MOBIL', 'MOTOR'],
            date: String((new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2))),
            kepemilikan: null,
            type: 'SEMUA',
            search: '',
            mode: null,
            dialog:{
                date: false,
                loading: false
            },
        };
    },

    methods:{
        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },

        changeType(){
            // console.log(this.date)
            if(this.kepemilikan == 'COMPANY'){
                this.type = 'SEMUA';
                this.type_select = ['SEMUA', 'MOBIL', 'MOTOR']
            }
            else if(this.kepemilikan == 'PRIBADI'){
                this.type = 'MOBIL';
                this.type_select = ['MOBIL', 'MOTOR']
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

        async downloadReport(){
            var url = '';
            

            if(this.mode == 'finance'){
                url = api_url + 'get-report-finance';
            }
            else if(this.mode == 'quality-parking'){
                if(this.kepemilikan == null){
                    alert("Wajib mengisi kolom tipe kepemilikan!");
                    return;
                }
                var index = this.kepemilikan == 'PRIBADI' ? 'P' : 'C'
                // url = 'https://development.gli.id/gli-parking-registration/#/qp-download?flag=' + index + '&period=' + this.date;
                url = 'https://development.gli.id/gli-parking-registration/#/qp-download?flag=' + index + '&period=' + this.date;
                // url = 'http://localhost:8080/#/qp-download?flag=' + index + '&period=' + this.date;
                if(this.type == 'MOBIL' || this.type == 'MOTOR'){
                    url = url + '&type='+String(this.type).toLowerCase();
                }
                var link = document.createElement("a");
                link.href = url;
                link.target = '_blank'
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // const routeData = this.$router.resolve({path: url});
                // window.open(routeData.href, '_blank');
                return;
            }

            else if(this.mode == 'report-gocorp'){
                url = api_url_gocorp + 'get-report';
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
                    url +
                    "?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') + 
                    '&period=' + String(this.date),
                    headers
                )
                .then((response) => {
                    // console.log(this.date)
                    // this.data = response.data.data;
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
                    else if(response.statusText == 'OK'){
                        var link = document.createElement("a");
                        link.href = url + "?mu_token=" + localStorage.getItem('token') + "&mu_username=" + localStorage.getItem('nik') + "&period=" + String(this.date);
                        link.target = '_blank'
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    else{
                        alert("Gagal mendownload file excel. Silahkan coba lagi!")
                        this.dialog.loading = false;
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

        // async getTotalReport(){
        //     this.$refs.dialog.save(this.date)
        //     var url = '';
            
        //     if(this.mode == 'finance'){
        //         url = 'get-total-finance';
        //     }
        //     else if(this.mode == 'quality-parking'){
        //         url = 'get-total-qp';
        //     }

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

        //         await axios
        //         .get(
        //             api_url + url +
        //             "?mu_username=" + localStorage.getItem('nik') +
        //             "&mu_token=" + localStorage.getItem('token') + 
        //             '&period=' + this.date,
        //             headers
        //         )
        //         .then((response) => {
        //             var data = response.data.data;
        //             // console.log(data)
        //             if(this.mode == 'quality-parking'){
        //                 this.biaya.biaya_a = data[0].total_biaya_berlangganan
        //                 this.biaya.biaya_b = data[0].total_biaya_kartu
        //                 this.biaya.biaya_c = data[0].total_pembayaran_parkir
        //             }
        //             else if(this.mode == 'finance'){
        //                 this.biaya.biaya_a = data[0].total_tanggungan_perusahaan
        //                 this.biaya.biaya_b = data[0].total_tanggungan_karyawan
        //                 this.biaya.biaya_c = data[0].total_pembayaran_parkir
        //             }
        //             if(response.data.response_code == '22'){
        //                 localStorage.removeItem("user_fname");
        //                 localStorage.removeItem("user_lname");
        //                 localStorage.removeItem("token");
        //                 localStorage.removeItem("nik");
        //                 alert('Token sudah kadaluarsa. Silahkan Login kembali!')
        //                 this.removeLocalStorage();
        //             }
        //             else if(response.data.response_code == '21'){
        //                 localStorage.removeItem("user_fname");
        //                 localStorage.removeItem("user_lname");
        //                 localStorage.removeItem("token");
        //                 localStorage.removeItem("nik");
        //                 alert('NIK tidak ditemukan. Silahkan Login kembali!')
        //                 this.removeLocalStorage();
        //             }

        //             else if(response.data.response_code == '20'){
        //                 localStorage.removeItem("user_fname");
        //                 localStorage.removeItem("user_lname");
        //                 localStorage.removeItem("token");
        //                 localStorage.removeItem("nik");
        //                 alert('Token tidak sesuai. Silahkan Login kembali!')
        //                 this.removeLocalStorage();
        //             }
        //             else if (this.data == []) {
        //                 return;
        //             }
        //             else if (!this.data) {
        //                 alert("Gagal mengambil data! Server timeout. Silahkan coba lagi.");
        //                 return;
        //             }
        //         })
        //         .catch((error) => {
        //             console.log("ParkingRegistration.vue (error) :: ", error);
        //             alert("Gagal mengambil data! Silahkan coba lagi.");
        //         });

        //         // Break if request failed
        //         if (!this.data) {
        //             // this.dialog.loading = false;
        //             return;
        //         }
        //     }
        //     catch (e) {
        //         console.error(e);
        //         alert("Error: koneksi gagal");
        //         return;
        //     }
        //     // this.dialog.loading = false;
        // },

        getDateString(){
            const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Agustus", "September", "Oktober", "November", "Desember"]    
            return monthNames[new Date(this.date).getMonth()] + ' ' + String(new Date(this.date).getFullYear())
        }, 

        formatCurrency(number){
            return new Intl.NumberFormat("id-ID", {style: "currency", currency: 'IDR'}).format(number).split(',00').join('').replaceAll('.', ',');
        },

        getHeader(){
            if(this.mode == 'finance'){
                return [
                    {
                        text: "No",
                        align: "center",
                        value: "id",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "NIK",
                        align: "center",
                        value: "prkr_nik",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Nama Karyawan",
                        align: "center",
                        value: "prkr_nama",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Jenis Kendaraan",
                        align: "center",
                        value: "prkr_type",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Keterangan Kendaraan",
                        align: "center",
                        value: "prkr_kepemilikan",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "No. Polisi",
                        align: "center",
                        value: "prkr_nopol",
                        class: "black--text grey lighten-2"
                    },
                    
                    {
                        text: "Tanggungan Perusahaan", 
                        align: "center",
                        sortable: false,
                        value: "prkr_biaya_subsidi",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Tanggungan Karyawan",
                        align: "center",
                        value: "tanggungan_karyawan",
                        class: "black--text grey lighten-2"
                    }
                ]
            }
            else if(this.mode == 'quality-parking'){
                return [
                    {
                        text: "No",
                        align: "center",
                        value: "id",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Nama Karyawan",
                        align: "center",
                        value: "prkr_nama",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "No. Polisi",
                        align: "center",
                        value: "prkr_nopol",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Jenis Kendaraan",
                        align: "center",
                        value: "prkr_type",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Biaya Berlangganan",
                        align: "center",
                        value: "prkr_total_biaya_perbulan",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Biaya Kartu", 
                        align: "center",
                        sortable: false,
                        value: "prkr_biaya_kartu",
                        class: "black--text grey lighten-2"
                    },
                    // {
                    //     text: "No. Lot",
                    //     align: "center",
                    //     value: "no_lot",
                    //     class: "black--text grey lighten-2"
                    // }
                ]
            }
        },
    },

    async mounted(){
        if (!localStorage.nama) {
                this.removeLocalStorage();
        }
        // console.log(this.date)
        this.mode = this.$route.meta.mode
        // console.log(this.mode)
        
        if(localStorage.getItem('cost_center') != 'HRGA' && this.mode != 'report-gocorp'){
            this.route('home');
        }
        else if(localStorage.getItem('manager') == 'Y'){
            this.route('home-gocorp')
        }
        else if(localStorage.getItem('cost_center') != 'HRGA' && this.mode == 'report-gocorp'){
            this.route('home-gocorp')
        }

        if(this.mode == null){
            this.route('home')
        }
        else{
            // this.getDataReport();
            // this.getTotalReport();
        }
    }
}
</script>
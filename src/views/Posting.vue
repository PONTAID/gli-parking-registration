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
        <div style="display: flex; align-items: start; justify-content: center">
        <v-card
            flat
            tile
            width="800"
            class="mb-4 px-8 py-4 mt-12 text-center"
            style="border-radius: 25px 25px 25px 25px !important">
            <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                <v-card elevation="3" outlined style="width: 100% !important">
                    <v-row>
                        <v-col>
                            <div class="ma-4 pa-2 d-flex flex-row">
                                <h1 style="font-weight: 400">Posting</h1>
                            </div>
                        </v-col>
                    </v-row>    
                    <v-divider class="ml-8 mr-8"></v-divider>
                    <div
                        style="width: 100%;">
                        <v-col cols="12" md="12">
                            <v-card flat class="ma-0 pa-0" width="100%">
                                <v-card-text width="100%">
                                    <!-- DIALOG DATEPICKER START -->
                                    <v-dialog ref="dialog" v-model="dialog.date" :return-value.sync="date" persistent class="ma-0 pa-0" width="290px">
                                        <template v-slot:activator="{ on, attrs }" height="">
                                            <v-row class="ma-0 pa-0 mt-5 mb-7">
                                                <h2 class="black--text">Pilih tanggal data yang ingin di posting ke dalam report:</h2>
                                            </v-row>
                                            <v-text-field
                                                label="Pilih Tanggal"
                                                :value="getDateString()"
                                                prepend-inner-icon="mdi-calendar"
                                                hide-details
                                                outlined
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-row justify="center" class="ma-0 pa-0">
                                            <v-date-picker
                                            v-model="date"
                                            locale="id"
                                            width="290px"
                                            :max="dateMax"
                                            height="300px"
                                            type="month">
                                                <v-btn text color="primary" @click="dialog.date = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-row>
                                    </v-dialog>
                                    <!-- DIALOG DATEPICKER END -->
                                    <v-row class="ma-0 pa-0 mt-10">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            width="150"
                                            class="mb-5"
                                            @click="posting"
                                            style="text-transform: unset;color:black;font-size: small;"
                                            color="blue lighten-1">
                                            <v-icon small class="mr-2">mdi-typewriter</v-icon>&nbsp;Posting
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
import { api_url } from "../global_variable/global_variable.js";  

export default {
    name: "Posting",
    components: {},

    data() {
        return {
            date: new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().substr(0, 10),
            dateMax: new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().substr(0, 10),
            dialog:{
                date: false,
                loading: false
            }
        
        };
    },

    methods:{
        getDateString(){
            const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Agustus", "September", "Oktober", "November", "Desember"] 
            console.log(this.date + ' ' + this.dateMax)   
            return monthNames[new Date(this.date).getMonth()] + ' ' + String(new Date(this.date).getFullYear())
        }, 

        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
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

        async posting(){
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
                    "posting?mu_token=" + localStorage.getItem('token') + 
                    "&mu_username=" + localStorage.getItem('nik') + 
                    "&month=" + this.date,
                    headers
                )
                .then((response) => {
                    this.data = response.data.data;
                    console.log(response)
                    if(response.data.response_code == '22'){
                        localStorage.removeItem("nik");
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
                        alert('Data bulan ' + this.getDateString() + ' sudah pernah di posting!');
                        this.dialog.loading = false;
                        return;
                    }

                    else if(response.data.status == false){
                        alert('Data bulan ' + this.getDateString() + ' masih kosong!');
                        this.dialog.loading = false;
                        return;
                    }

                    else if (this.data == []) {
                        return;
                    }
                    else if (!this.data) {
                        // console.log(response)
                        alert("Gagal Posting Data!");
                        return;
                    }
                })
                .catch((error) => {
                    console.log("ParkingRegistration.vue (error) :: ", error);
                    alert("Gagal posting data kendaraan! Silahkan coba lagi.");
                    this.dialog.loading = false;
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
                return;
            }
            alert('Posting data bulan ' + this.getDateString() + ' berhasil!')
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
        
        // date: String((new Date().getFullYear() + '-' + (new Date().getMonth() + 1, 0))),
        //     dateMax: String((new Date().getFullYear() + '-' + (new Date().getMonth() + 1, 0))),

        // if((new Date().getMonth + 1, 0) == 0){
        //     this.date = String((new Date().getFullYear()-1) + '-12');
        //     this.dateMax = String((new Date().getFullYear()-1) + '-12');
        // }
    }
}
</script>
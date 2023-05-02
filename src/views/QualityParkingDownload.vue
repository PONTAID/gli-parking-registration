<template>
    <body id="content">
         <!-- DIALOG SUBMIT FAIL START-->
         <v-dialog
            persistent
            v-model="dialog.fail"
            width="500">
            <v-card class="text-center">
                <v-icon size="100" color="error" class="mt-5 mb-3">mdi-close-circle-outline</v-icon>
                <v-card-text style="font-size: 16px;">Gagal mengambil data atau Data tidak ada!</v-card-text>
                    <v-btn
                        class="mb-10"
                        color="primary"
                        width="100"
                        @click="close">
                        OK
                    </v-btn>
            </v-card>
        </v-dialog> 
        <!-- DIALOG SUBMIT FAIL END -->
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
        <div class="block pa-5 mt-10 mb-15">
            <v-col>
                <v-row class="ma-0 ">
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-col>
                        <p class="mb-1 ml-2" style="font-size: 12px;">Property Management:</p>
                        <img crossorigin="anonymous" class="image-container" src="../assets/qp-1.png" style="height:30px;" />
                    </v-col>                
                </v-row>
                <v-row class="center" width="100%">
                    <div class="mb-9">
                        <h3 style="text-decoration: underline;">FORMULIR REGISTRASI PARKIR</h3>
                    </div>
                </v-row>
                <v-row>   
                    <v-col cols="6" class="ma-0 pb-0">
                        <v-row class="mb-3">
                            <v-col cols="5" class="ma-0 pa-0">
                                <h5 style="font-size: 13px;">NAMA PERUSAHAAN</h5>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row style="width:250px" class="">
                                    <h5 class="mt-3 mr-3">:</h5>
                                    <v-text-field
                                        value="PT. GLOBAL LOYALTY INDONESIA"
                                        class="black--text mt-2"
                                        style="font-size: 13px; font-weight: bold;"
                                        hide-details
                                        dense>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="mb-3">
                            <v-col cols="5" class="ma-0 pa-0">
                                <h5 style="font-size: 13px;">LANTAI/ UNIT</h5>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row style="width:250px" class="">
                                    <h5 class="mt-3 mr-3">:</h5>
                                    <v-text-field
                                        value="LT. 24"
                                        class="black--text mt-2"
                                        style="font-size: 13px; font-weight: bold;"
                                        hide-details
                                        dense>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="pb-0">
                            <v-col cols="5" class="ma-0 pa-0">
                                <h5 style="font-size: 13px;">JENIS KENDARAAN</h5>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row style="width:250px" class="">
                                    <h5 class="mt-3 mr-3">:</h5>
                                    <v-checkbox
                                    v-model="checkMobil"
                                    label="Mobil"
                                    class="mr-15 mt-2 black--text"
                                    color="black"
                                    readonly
                                    hide-details
                                    >
                                        <template v-slot:label>
                                            <span class="black--text" style="font-size: 14px">Mobil</span>
                                        </template>
                                    </v-checkbox>
                                    <v-checkbox
                                    v-model="checkMotor"
                                    label="Motor"
                                    readonly
                                    class="mt-2 black--text"
                                    color="black"
                                    hide-details
                                    >
                                        <template v-slot:label>
                                            <span class="black--text" style="font-size: 14px">Motor</span>
                                        </template>
                                    </v-checkbox>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6" class="ma-0 pa-0">
                        <v-row class="mb-3 mt-0">
                            <v-col cols="5"  class="ma-0 pa-0">
                                <h5 style="font-size: 13px;">NO. TELP. KANTOR</h5>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row style="width:250px" class="">
                                    <h5 class="mt-3 mr-3">:</h5>
                                    <v-text-field
                                        value="021-8082 1510"
                                        class="black--text mt-2"
                                        style="font-size: 13px; font-weight: bold;"
                                        hide-details
                                        dense>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="mb-3">
                            <v-col cols="5"  class="ma-0 pa-0">
                                <h5 style="font-size: 13px;">NO. HP</h5>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row style="width:250px" class="">
                                    <h5 class="mt-3 mr-3">:</h5>
                                    <v-text-field
                                        value="085692858620"
                                        class="black--text mt-2"
                                        style="font-size: 13px; font-weight: bold;"
                                        hide-details
                                        dense>
                                    </v-text-field>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row class="mb-1 pb-0">
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-col cols="2" class="ma-0 pa-0 mt-4">
                                <p style="font-size: 13px;">Tanggal: </p>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-row class="mt-3">
                                   <input type="text" style="border:1px solid black; width:168px"/>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2" class="ma-0 mr-10 pa-0">
                        <h5 style="font-size: 13px;">JENIS PERMINTAAN</h5>
                    </v-col>
                    <v-col class="ma-0 pa-0">
                        <v-row style="width:200px;height:50px" class="pb-0">
                            <h5 class="mt-3 mr-3">:</h5>
                            <p class="mt-3" style="font-size: 15px;">Status</p>
                        </v-row>
                        <v-row style="width:200px;height:40px" class="pb-0">
                            <p class="ma-0 pa-0 ml-4" style="font-size: 15px;">Registrasi Kartu Parkir</p>
                        </v-row>
                    </v-col>
                    <v-col class="ma-0 pa-0" style="max-width:200px">
                        <v-row style="width:250px" class="">
                            <v-checkbox
                            label="Registrasi Baru"
                            class="mt-2 black--text"
                            style="font-size: 13px;"
                            readonly
                            color="black"
                            hide-details>
                                <template v-slot:label>
                                    <span class="black--text" style="font-size: 14px">Registrasi Baru</span>
                                </template>
                            </v-checkbox>
                        </v-row>
                        <v-row style="width:250px" class="">
                            <v-checkbox
                            label="Baru"
                            class="mt-2 black--text"
                            color="black"
                            readonly
                            hide-details>
                                <template v-slot:label>
                                    <span class="black--text" style="font-size: 14px">Baru</span>
                                </template>
                            </v-checkbox>
                        </v-row>
                    </v-col>
                    <v-col class="ma-0 pa-0">
                        <v-row style="width:250px" class="">
                            <v-checkbox
                            v-model="checkbox"
                            readonly
                            label="Perpanjangan"
                            class="mt-2 black--text"
                            color="black"
                            hide-details>
                                <template v-slot:label>
                                    <span class="black--text" style="font-size: 14px">Perpanjangan</span>
                                </template>
                            </v-checkbox>
                        </v-row>
                        <v-row style="width:250px" class="">
                            <v-checkbox
                            readonly
                            label="Penggantian Kartu Rusak/Hilang"
                            class="mt-2 black--text"
                            color="black"
                            hide-details>
                                <template class="black--text" v-slot:label>
                                    <span class="black--text" style="font-size: 14px">Penggantian Kartu Rusak/Hilang</span>
                                </template>
                            </v-checkbox>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-row class="mb-1 mt-8 pb-0 ml-15 pl-12">
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-col class="ma-0 pa-0">
                                <v-row class="mt-0 pr-5">
                                   <input type="text" value="  Order No. : " style="border:1px solid black; width:355px"/>
                                   <!-- <v-text-field outlined dense hide-details></v-text-field> -->
                                </v-row>
                            </v-col>
                        </v-row>
                </v-row>
                <div style="min-height: 1000px">
                    <v-row class="mt-12">
                        <v-data-table
                            :headers="headers"
                            dense
                            :items="data"
                            class="border-all"
                            :sort-by="['prkr_type']"
                            :sort-desc="[true]"
                            :hide-default-footer="true"
                            disable-pagination>
                            <template v-slot:item.no="{item, index}">
                                <td :key="index" class="border-all text-center">{{ index+1 }}</td>
                            </template>
                            <template v-slot:item.prkr_nama="{item, index}">
                                <td :key="'A' + index" class="border-all text-center">{{ item.prkr_nama }}</td>
                            </template>
                            <template v-slot:item.prkr_nopol="{item, index}">
                                <td :key="'B' + index" class="border-all text-center">{{ item.prkr_nopol }}</td>
                            </template>
                            <template v-slot:item.prkr_type="{item, index}">
                                <td :key="'C' + index" class="border-all text-center">{{ item.prkr_type }}</td>
                            </template>
                            <template v-slot:item.prkr_total_biaya_perbulan="{item, index}">
                                <td :key="'D' + index" class="border-all text-center">{{ formatCurrency(item.prkr_total_biaya_perbulan) }}</td>
                            </template>
                            <!-- {{ formatCurrency(item.prkr_biaya_kartu) }} -->
                            <template v-slot:item.prkr_biaya_kartu="{item, index}">
                                <td :key="'E' + index" class="border-all text-center">{{ ''}}</td>
                            </template>
                            <template v-slot:item.prkr_nolot="{item, index}">
                                <td :key="'F' + index" class="border-all text-center">{{ '' }}</td>
                            </template>
                            <template v-if="flag=='P'" v-slot:body.append>
                                <tr style="">
                                    <td colspan="4" class="grey lighten-2 text-center" style="border: 1px solid black !important; font-weight: bold;">TOTAL PEMBAYARAN </td>
                                    <!-- <td style="border: 1px solid black !important;"></td>
                                    <td style="border: 1px solid black !important;"></td>
                                    <td style="border: 1px solid black !important;"></td> -->
                                    <!-- {{ formatCurrency(total_biaya_kartu) }}
                                    {{ formatCurrency(total_pembayaran_parkir) }} -->
                                    <td class="grey lighten-2 text-center" style="font-weight: bold; border:1px solid black !important;">{{ formatCurrency(total_biaya_berlangganan) }}</td>
                                    <td class="grey lighten-2 text-center" style="font-weight: bold; border: 1px solid black !important;">{{ '' }}</td> 
                                    <!-- <td class="grey lighten-1 text-center" style="font-weight: bold; border: 1px solid black !important;">{{ formatCurrency(total_biaya_berlangganan) }}</td> -->
                                    <td class="grey lighten-2 text-center" style="font-weight: bold; border: 1px solid black !important;">{{ '' }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-row>
                </div>
                <v-row>
                    <v-col>
                        <v-row class="mt-3">
                            <p style="font-size: 13px; text-decoration: underline; font-weight: bold;" class="black--text ma-0 ml-1">Catatan:</p>
                        </v-row>
                        <v-row class="">
                            <ol type="1" style="font-size: 13px;" class="black--text ma-0 pa-0 ml-5">
                                <li>Mohon untuk melampirkan surat permohonan di atas kop surat dan berstempel dan ditandatangani oleh pejabat perusahaan</li>
                                <li>Mohon untuk melampirkan 1 (satu) lembar fotocopy STNK dan KTP yang masih berlaku atas nama pemilik kendaraan.</li>
                            </ol>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="border-all mt-5">
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px;">Dipesan oleh:</h5>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px;">Disetujui oleh:</h5>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px;">Diverifikasi Pembayaran oleh:</h5>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px;">Diterima oleh:</h5>
                    </v-col>
                </v-row>
                <v-row class="border-all">
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <br/>
                        <br/>
                        <br/>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">

                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">

                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">

                    </v-col>
                </v-row>
                <v-row class="border-all">
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px; font-style: italic; text-decoration: underline;">Perwakilan Tenant</h5>
                        <p style="font-size: 12px;" class="ma-0">Nama&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Jabatan&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Tgl&nbsp;:</p>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px; font-style: italic; text-decoration: underline;">Property Manager</h5>
                        <p style="font-size: 12px;" class="ma-0">Nama&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Tgl&nbsp;:</p>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px; font-style: italic; text-decoration: underline;">Admin Parkir</h5>
                        <p style="font-size: 12px;" class="ma-0">Nama&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Tgl&nbsp;:</p>
                        <p style="font-size: 12px; font-weight: bold;" class="ma-0">Bank Transfer</p>
                        <p style="font-size: 12px;" class="ma-0">Tgl. Transfer&nbsp;:</p>
                    </v-col>
                    <v-col class="border-all black--text" style="border-bottom: 0px !important;" cols="3">
                        <h5 style="font-size: 12px; font-style: italic; text-decoration: underline;">Perwakilan Tenant</h5>
                        <p style="font-size: 12px;" class="ma-0">Nama&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Jabatan&nbsp;:</p>
                        <p style="font-size: 12px;" class="ma-0">Tgl&nbsp;:</p>
                    </v-col>
                </v-row>
                <v-row class="mb-5">
                    <v-spacer></v-spacer>
                    <small style="font-size: 10px;">FRM/TNC-00-19   07-06-2017   REV.00</small>
                </v-row>
            </v-col>
        </div>
    </body>
</template>
<script>
    import axios from 'axios'
    import { api_url } from '../global_variable/global_variable.js';
    import { jsPDF } from "jspdf";
    import html2canvas from 'html2canvas';


    export default {
    name: "QualityParkingDownload",
    components: {},

        data() {
            return {
                data: [],
                type: null,
                flagDownload: true,
                period: null,
                flag: null,
                checkbox: true,
                checkMotor: false,
                checkMobil: false,
                total_biaya_berlangganan: 0,
                total_biaya_kartu: 0,
                total_pembayaran_parkir: 0,
                dialog:{
                    loading: false,
                    fail: false,
                },
                headers: [
                {
                    text: "No. ",
                    align: "center",
                    value: "no",
                    sortable: false,
                    width: '100px',
                    class: "black--text green border-all"
                },
                {
                    text: "Nama Pemilik Kendaraan",
                    align: "center",
                    value: "prkr_nama",
                    sortable: false,
                    width: ' 175px',
                    class: "black--text green border-all"
                },
                {
                    text: "No. Polisi",
                    align: "center",
                    value: "prkr_nopol",
                    sortable: false,
                    width: ' 175px',
                    class: "black--text green border-all"
                },
                {
                    text: "Type Kendaraan/ Jenis",
                    align: "center",
                    value: "prkr_type",
                    sortable: false,
                    width: ' 175px',
                    class: "black--text green border-all"
                },
                {
                    text: "Biaya Berlangganan (Rp)",
                    align: "center",
                    value: "prkr_total_biaya_perbulan",
                    sortable: false,
                    width: ' 175px',
                    class: "black--text green border-all"
                },
                {
                    text: "Biaya Kartu (Rp)",
                    align: "center",
                    value: "prkr_biaya_kartu",
                    sortable: false,
                    width: ' 175px',
                    class: "black--text green border-all"
                },
                {
                    text: "No. Lot",
                    align: "center",
                    value: 'prkr_nolot',
                    sortable: false,
                    width: '157px',
                    class: "black--text green border-all"
                },
                ]
            };
        },

        methods:{
            formatCurrency(number){
                if(isNaN(number)){
                    return number;
                }
                else{
                    return new Intl.NumberFormat("id-ID", {style: "currency", currency: 'IDR'}).format(number).split(',00').join('').replaceAll('.', ',');       
                }
            },
            async getDataKendaraan(){
                try{
                    
                    this.dialog.loading = true;
                    var url = '&flag='+ String(this.flag) + '&period='+this.period;
                    if(this.type){
                        url = url + '&tipe=' +String(this.type).toUpperCase();
                    }
                    console.log(url)
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
                        "get-report-qp?mu_username=" + localStorage.getItem('nik') +
                        "&mu_token=" + localStorage.getItem('token')+url,
                        headers
                    )
                    .then((response) => {
                        // this.total_biaya_berlangganan = response.data.total_biaya_berlangganan
                        // this.total_biaya_kartu = response.data.total_biaya_kartu
                        // this.total_pembayaran_parkir = response.data.total_pembayaran_parkir
                        
                        console.log(response)
                        if (this.data == []) {
                            return;
                        }
                        else if (!this.data) {
                            this.dialog.fail = true;
                            return;
                        }
                        else{
                            this.master_data = response.data.data;
                            var item = this.master_data;
                            this.dialog.loading = true;
                            var t = this;
                            var chunk = [];
                            var i = 0;
                            while(item.length > 0){
                                chunk.push(item.splice(0, 30));
                            }
                            var element = document.getElementById('content');
                            var name = 'report_quality_parking_' + String(this.period).split('-').join('') + '.pdf';
                            var doc = new jsPDF('p', 'mm', [297, 210]);
                            t.data = chunk[0]
                            this.total_biaya_berlangganan = t.data.reduce(function (s, a){ return s + parseInt(a.prkr_total_biaya_perbulan);}, 0);

                            setInterval(() => {
                                html2canvas(element).then(function(canvas) {
                                    if(i < chunk.length){
                                        t.data = chunk[i+1]
                                        if(t.data){
                                            t.total_biaya_berlangganan = t.data.reduce(function (s, a){ return s + parseInt(a.prkr_total_biaya_perbulan); }, 0);
                                        }
                                        if(i < chunk.length){
                                            
                                            var imgData = canvas.toDataURL('image/jpeg');
                                            doc.addImage(imgData, 'jpeg', 0, 0 , 210, 297);
                                        }
                                        if(i != chunk.length - 1){
                                            doc.addPage();
                                        }
                                        i++;
                                    }
                                    else if (i == chunk.length){
                                        t.dialog.loading = false;
                                        doc.save(name);
                                        i++;
                                    }
                                    else{
                                        window.close();
                                    }
                                });
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        console.log("ParkingRegistration.vue (error) :: ", error);
                        this.dialog.fail = true;
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
            },

            close(){
                this.dialog.fail = false;
                window.close();
            }
        },
        
        mounted(){
            this.flag = this.$route.query.flag;
            this.period = this.$route.query.period
            this.type = this.$route.query.type != undefined || this.$route.query.type != null ? this.$route.query.type : null
            if(this.type == 'motor'){
                this.checkMotor = true;
            }
            else if (this.type == 'mobil'){
                this.checkMobil = true;
            }
            else{
                // this.checkMotor = true;
                // this.checkMobil = true;
            }
            this.getDataKendaraan();
        },
    }

</script>

<style scoped>
    body{
        background: white;
        background-size: cover;
        background-repeat: no-repeat;
        /* width: 21cm;
        height: 29.7cm; */
        width: 793;
        height: 1054.488189;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .border td{
        border: 1px solid black;
    }

    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .block {
        width: 1175px;
        padding: 20px;
        background: white;
        /* border: 1px solid black; */
    }

    .image-container{
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
    }

    .border-all{
        border: 1px solid black !important;
        border-radius: 0px 0px 0px 0px !important;
    }


</style>
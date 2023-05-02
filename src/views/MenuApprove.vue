<template>
    <v-col>
        <v-dialog 
        width="400"
        v-model="alert.success" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="success">
                {{ msg }}
            </v-alert>
        </v-dialog>

        <v-dialog 
        width="400"
        v-model="alert.fail" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="error">
                {{ msg }}
            </v-alert>
        </v-dialog>
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
                    <v-btn text color="primary" @click="$refs.dialog.save(date); getDataTrip(data_trip_url)">OK</v-btn>
                </v-date-picker>
            </v-row>
        </v-dialog>
        <!-- DIALOG DATEPICKER END -->
        <!-- DIALOG CANCEL START-->
        <v-dialog
            persistent
            v-model="dialog.approve"
            width="500">
            <v-card>
                <v-card-title class="text-h5">Approve</v-card-title>
                <v-card-text>Apakah anda yakin ingin melakukan approval?</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        color="error"
                        text
                        @click="dialog.approve = false">
                        TIDAK
                    </v-btn>
                    <v-btn
                        color="green darken-3"
                        text
                        @click="approval('approve')">
                        YA 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- DIALOG CANCEL END -->
        <!-- DIALOG DETAIL START -->
        <v-dialog
            persistent
            content-class="elevation-0"
            v-model="dialog.detail"
            width="1400">
            <div style="display: flex; align-items: start; justify-content: center">
                <v-card
                    flat
                    tile
                    width="100%"
                    class="text-center"
                    style="border-radius: 25px 25px 25px 25px !important">
                    <div class="my-4 pa-4 px-6 d-flex flex-row" style="width: 100% !important">
                        <v-card elevation="3" outlined style="width: 100% !important">
                            <v-row>
                                <v-col>
                                    <div class="ma-0 ml-5 pa-3 d-flex flex-row">
                                        <h2 style="font-weight: 400">{{ title_detail }}</h2>
                                        <v-spacer></v-spacer>
                                        <v-hover v-slot="{hover}">
                                            <v-btn icon class="mr-5" :class="hover ? 'red--text' : '' " @click="dialog.detail = false; detail.approval = null"><v-icon >mdi-close</v-icon></v-btn>
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
                                                <v-row class="">
                                                    <v-col cols="6">
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.nik"
                                                                outlined
                                                                hide-details
                                                                dense
                                                                filled
                                                                readonly
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.nama"
                                                                outlined
                                                                filled
                                                                dense
                                                                readonly
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nomor Telepon</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.phone"
                                                                outlined
                                                                filled
                                                                readonly
                                                                hide-details
                                                                dense
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row v-if="approve=='history-trip'" class="pr-4 text-start mb-3">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Trip</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.total_trip"
                                                                outlined
                                                                dense
                                                                filled
                                                                readonly
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>          
                                                    </v-col>
                                                    <v-col class="" cols="6">
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Email</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-row class="ma-0">
                                                                    <v-text-field
                                                                        v-model="detail.email"
                                                                        required
                                                                        hide-details
                                                                        dense
                                                                        outlined
                                                                        readonly
                                                                        filled
                                                                    ></v-text-field>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text" style="font-weight: 400; font-size: 16px">Departemen Cost Center</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-row class="ma-0">
                                                                    <v-text-field
                                                                        v-model="detail.cost_center"
                                                                        required
                                                                        hide-details
                                                                        dense
                                                                        outlined
                                                                        readonly
                                                                        filled
                                                                    ></v-text-field>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row v-if="approve=='history-trip'" class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tanggal Pengajuan</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                    <v-text-field
                                                                        v-model="detail.create_date"
                                                                        filled
                                                                        hide-details
                                                                        dense
                                                                        readonly
                                                                        outlined
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row v-else-if="approve!='history-trip'" class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama Atasan</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                    <v-text-field
                                                                        v-model="detail.leader_name"
                                                                        filled
                                                                        hide-details
                                                                        dense
                                                                        readonly
                                                                        outlined
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="approve!='history-trip'">
                                                    <v-divider style="border-width: 1px;" class="mb-3 mt-3"></v-divider>
                                                </v-row>
                                                <v-row class="mb-3">
                                                    <v-col v-if="approve!='history-trip'" cols="6">
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text" style="font-weight: 400; font-size: 16px">Tanggal Awal Trip</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.start_date"
                                                                outlined
                                                                dense
                                                                filled
                                                                readonly
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text" style="font-weight: 400; font-size: 16px">Tanggal Akhir Trip</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                <v-text-field
                                                                v-model="detail.end_date"
                                                                outlined
                                                                dense
                                                                filled
                                                                readonly
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col v-if="approve!='history-trip'" cols="6">
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Trip</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                    <v-text-field
                                                                        v-model="detail.total_trip"
                                                                        filled
                                                                        hide-details
                                                                        readonly
                                                                        dense
                                                                        outlined
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tujuan Trip</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                    <v-text-field
                                                                        v-model="detail.desc_trip"
                                                                        filled
                                                                        hide-details
                                                                        readonly
                                                                        outlined
                                                                        dense
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="3" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 15px">Total Penumpang</h3>
                                                            </v-col>
                                                            <v-col cols="9">
                                                                    <v-text-field
                                                                        v-model="detail.total_penumpang"
                                                                        filled
                                                                        hide-details
                                                                        readonly
                                                                        outlined
                                                                        dense
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="approve!='history-trip'">
                                                    <v-spacer></v-spacer>
                                                    <v-card-actions style="width:40% !important">
                                                        <div v-if="approve != 'history-trip' && ((manager == 'Y' && (detail.status == '0' || detail.status == '1')) || (cost_center == 'HRGA' && detail.status == '2'))">
                                                            <v-btn
                                                                height="48"
                                                                color="red white--text"
                                                                width="200"
                                                                @click="approval('reject')"
                                                                class=""
                                                            >REJECTED</v-btn>
                                                            <v-btn
                                                                height="48"
                                                                color="green white--text"
                                                                width="200"
                                                                @click="approval('approve')"
                                                                class="ml-8 mr-5"
                                                            >APPROVED</v-btn>
                                                            </div>
                                                        <v-text-field
                                                            v-else-if="approve!='history-trip'"
                                                            :value="detail.status_text"
                                                            readonly
                                                            outlined
                                                            hide-details
                                                            class="centered-input mr-5"
                                                            filled
                                                        >
                                                        </v-text-field>
                                                        <!-- <v-btn
                                                            height="48"
                                                            
                                                            :color="detail.status=='Approved' ? 'green white--text' : 'red white--text'"
                                                            width="200"
                                                            class="ml-5 mr-7"
                                                        >{{ detail.status }}</v-btn> -->
                                                    </v-card-actions>
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
        <!-- DIALOG DETAIL END -->
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
        <div class="mt-5 px-0 py-0 text-center d-flex flex-row" flat tile style="width: 100% !important; border-radius: 50px 50px 50px 50px !important">
            <v-card elevation="3" outlined style="width: 100% !important">
                <v-row class="ma-0 ml-5 pa-0">
                    <v-card-title>{{ title }}</v-card-title>
                    <v-divider v-if="approve=='report-gocorp'" vertical class="pa-3 mt-2 mb-2 mr-5"></v-divider>
                    <v-btn v-if="approve=='report-gocorp'" class="mt-3" color="primary" dark style="text-transform: none;">Download</v-btn>
                </v-row>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-row>
                    <v-col cols="4" class="pa-7 ml-5">
                        <!-- MENU FILTER START -->
                        <v-menu v-if="manager == 'Y'" offset-y max-width="185%"  :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row class="ma-0 pa-0">
                                    <v-col class="pa-0 text-left ml-0">
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
                                        <v-radio value="waiting" color="yellow darken-3">
                                            <template v-slot:label>
                                                <div><strong class="yellow--text text--darken-3">Menunggu Approval Atasan</strong></div>
                                            </template>
                                        </v-radio>
                                        <v-radio value="approved" color="green">
                                            <template v-slot:label>
                                                <div><strong class="success--text">Diapprove oleh Manager</strong></div>
                                            </template>
                                        </v-radio>
                                        <v-radio value="rejected" color="error">
                                            <template v-slot:label>
                                                <div><strong class="error--text">Ditolak oleh Manager</strong></div>
                                            </template>
                                        </v-radio>
                                        <v-radio value="cancel" color="red">
                                            <template v-slot:label>
                                                <div><strong class="error--text">Trip Dibatalkan</strong></div>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </v-container>
                            </v-card>
                        </v-menu>
                        <!-- MENU FILTER END -->
                    </v-col>
                    <v-col cols="4">

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
                            :headers="getHeader()"
                            :items="data"
                            height="65vh"
                            fixed-header
                            :search="search"
                            :sort-by="['gct_start_date']"
                            :sort-desc="[true]"
                            :items-per-page="10"
                            :footer-props="{
                                'items-per-page-options': [10, 25, 100, 150],
                                'show-current-page': true,
                                'show-first-last-page': true,
                            }"
                            class="elevation-1"
                        >
                            <template v-slot:item.gct_status="{item}">
                                <v-chip
                                    dark
                                    :color="checkColor(item.gct_status)">
                                    {{ checkStatus(item.gct_status) }}
                                </v-chip>
                            </template>
                            <!-- <template v-slot:item.gct_start_date="{item}">
                                <div
                                    :class="checkColor(item.gct_status, true)" 
                                    style="font-weight: 500;">
                                    {{ item.gct_start_date }}
                                </div>
                            </template>
                            <template v-slot:item.gct_end_date="{item}">
                                <div 
                                    :class="checkColor(item.gct_status, true)"
                                    style="font-weight: 500;">
                                    {{ item.gct_end_date }}
                                </div>
                            </template> -->
                            <template v-slot:item.gct_created_date="{item}">
                                {{ item.gct_created_date.split(' ')[0] }}
                            </template>
                            <template v-slot:item.action="{item}">
                                <v-chip
                                    :color="'blue darken-3'"
                                    @click="checkDetail(item.gct_id)"
                                    dark    
                                >
                                    Detail
                                </v-chip>
                                
                                <v-chip
                                    v-if="approve == 'request-trip'"
                                    class="ml-3"
                                    :color="'green lighten-1'"
                                    @click="dialog.approve = true; detail.id = item.gct_id"
                                    :disabled="manager == 'Y' && item.gct_status != 0 && item.gct_status != 1"
                                    dark    
                                >
                                    Approve
                                </v-chip>
                                <v-chip
                                    v-else-if="approve == 'menu-ga'"
                                    class="ml-3"
                                    :color="'green lighten-1'"
                                    @click="dialog.approve = true; detail.id = item.gct_id"
                                    :disabled="cost_center == 'HRGA' && item.gct_status != 2"
                                    dark    
                                >
                                    Approve
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
    name: "",
    components: {},

        data() {
            return {
                msg: null,
                alert: {
                    success: false,
                    fail: false,
                },
                radioFilter: null,
                search: '',    
                date: String((new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2))),
                cost_center: null,
                manager: null,
                body: {},
                url: '',
                data_trip_url: '',
                textInputRules: [(v) => !!v || "Kolom harus diisi"],
                detail:{
                    id: null,
                    nik: null,
                    nama: null,
                    phone: null,
                    id: null,
                    total_trip: null,
                    total_penumpang: null,
                    email: null,
                    cost_center: null,
                    leader_name: null,
                    create_date: null,
                    start_date: null,
                    end_date: null,
                    desc_trip: null,
                    status: null,
                    approval: null,
                    status_text: null,
                },
                approve: null,
                dialog:{
                    loading: false,
                    date: false,
                    change: false,
                    approve: false,
                    detail: false,
                },
                title_detail: null,
                title: null,
                header_list: [
                    {
                        text: "NIK",
                        align: "start",
                        value: "gct_nik",
                        class: "black--text grey lighten-2 arrow"
                    },
                    
                    {
                        text: "Nama", 
                        align: "start",
                        sortable: false,
                        value: "gct_nama",
                        class: "black--text grey lighten-2"
                    },
                    
                    {
                        text: "Tanggal Awal Trip",
                        align: "center",
                        sortable: true,
                        value: "gct_start_date",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Tanggal Akhir Trip",
                        align: "center",
                        value: "gct_end_date",
                        class: "black--text grey lighten-2"
                    },
                    {
                        text: "Status",
                        align: "center",
                        value: "gct_status",
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

                data:[],
                master_data: [],
                data_detail: []
            };
        },
        methods:{
            async getFilterData(){
                this.dialog.loading = true;
                var filtered_array = []
                if(this.radioFilter == 'waiting'){
                    filtered_array = this.master_data.filter((item) => item.gct_status == 0);
                    this.data = filtered_array
                }

                else if(this.radioFilter == 'approved'){
                    filtered_array = this.master_data.filter((item) => item.gct_status == 2);
                    this.data = filtered_array
                }
                else if(this.radioFilter == 'rejected'){
                    filtered_array = this.master_data.filter((item) => item.gct_status == 5);
                    this.data = filtered_array
                }
                else if(this.radioFilter == 'cancel'){
                    filtered_array = this.master_data.filter((item) => item.gct_status == 4);
                    this.data = filtered_array
                }
                else{
                    this.data = this.master_data;
                }
                this.dialog.loading = false;
            },

            getDateString(){
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Agustus", "September", "Oktober", "November", "Desember"]    
                return monthNames[new Date(this.date).getMonth()] + ' ' + String(new Date(this.date).getFullYear())
            }, 

            checkDate(start_date){
                var today = new Date();
                if(Date.parse(new Date(start_date)) > Date.parse(today) ){
                    return true;
                }
                else{
                    return false;
                }
            },

            checkStatus(status){
                if(status == 0){
                    return 'Menunggu Approval Atasan'
                }
                else if(status == 1){
                    return 'Reschedule: Menunggu Approval Atasan'
                }
                else if(status == 2){
                    return localStorage.getItem('manager')=='Y' ? 'Atasan sudah Approved' : 'Atasan sudah Approved, Menunggu GA'
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
            checkColor(status, text){    
                if(localStorage.getItem('manager') != 'Y'){
                    if(status == 0 || status == 2 || status == 1){
                        return text==true ? 'yellow--text text--darken-3' : 'yellow darken-3'
                    }
                    
                    else if(status == 3){
                        return text==true ? 'green--text text--lighten-1' : 'green lighten-1'
                    }

                    else{
                        return text==true ? 'red--text text--lighten-1' : 'red lighten-1'
                    }
                }    
                else if(localStorage.getItem('manager') == 'Y'){
                    if(status == 0 || status == 1){
                        return text==true ? 'yellow--text text--darken-3' : 'yellow darken-3'
                    }
                    
                    else if(status == 3 || status == 2 ){
                        return text==true ? 'green--text text--lighten-1' : 'green lighten-1'
                    }

                    else{
                        return text==true ? 'red--text text--lighten-1' : 'red lighten-1'
                    }
                }            
               
            },

            getHeader(){
                if(this.approve == 'history-trip'){
                    return this.header_list
                }
                else if(this.approve == 'report-gocorp'){
                    return [
                        {
                            text: "NIK",
                            align: "start",
                            value: "gct_nik",
                            class: "black--text grey lighten-2 arrow"
                        },
                        
                        {
                            text: "Nama", 
                            align: "start",
                            sortable: false,
                            value: "gct_nama",
                            class: "black--text grey lighten-2"
                        },
                        
                        {
                            text: "Departemen",
                            align: "center",
                            sortable: false,
                            value: "nama_cost_center",
                            class: "black--text grey lighten-2"
                        },
                        // {
                        //     text: "Status",
                        //     align: "center",
                        //     sortable: true,
                        //     value: "gct_status",
                        //     class: "black--text grey lighten-2"
                        // },
                        {
                            text: "Tanggal Awal Trip",
                            align: "center",
                            sortable: false,
                            value: "date_of_filing",
                            class: "black--text grey lighten-2"
                        },
                        {
                            text: "Total Trip",
                            align: "center",
                            value: "gct_total_trip",
                            sortable: false,
                            class: "black--text grey lighten-2 arrow"
                        },
                    ]
                }
                else{
                    return this.header_list
                }
            },

            async checkDetail(id){
                try{
                    this.dialog.loading = true;
                    this.title_detail = this.approve == 'history-trip' ? 'History Trip' : 'Detail Trip';

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
                        api_url_gocorp +
                        "trip-by-id?mu_username=" + localStorage.getItem('nik') +
                        "&mu_token=" + localStorage.getItem('token') +
                        "&gct_id="+id,
                        headers
                    )
                    .then((response) => {
                        var data = response.data.data[0];
                        this.detail.nik = data.gct_nik;
                        this.detail.nama = data.gct_nama;
                        this.detail.phone = data.gct_phone;
                        this.detail.leader_name = data.gct_nama_atasan;
                        this.detail.desc_trip = data.gct_descp_trip;
                        this.detail.total_trip = data.gct_total_trip;
                        this.detail.total_penumpang = data.gct_total_penumpang;
                        this.detail.email = data.gct_email;
                        this.detail.id = id
                        this.detail.cost_center = data.nama_cost_center;
                        this.detail.start_date = data.gct_start_date;
                        this.detail.end_date = data.gct_end_date;
                        this.detail.create_date = data.gct_created_date.split(' ')[0];
                        this.detail.status = data.gct_status;
                        this.detail.status_text = this.checkStatus(data.gct_status);
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
                        else{
                            this.dialog.detail = true;
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
                    this.dialog.loading = false;
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

            async route(route, selection) {
                this.$router.push({ name: route }).catch((error) => {
                    console.log(error);
                });
                localStorage.setItem('selection', selection)
                this.$store.commit('setSelection', localStorage.getItem('selection'))
            },

            routeTrip(name, mode){
                this.$router.push({ name: name, query:{ change: mode } }).catch((error) => {
                    console.log(error);
                });
            },

            async approval(status){
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

                    this.body = {
                                    "gct_id": this.detail.id
                                };

                    this.url = '';
                    this.url = status == 'approve' ? 'approve-' : 'rejected-'
                    this.url = localStorage.getItem('manager') == 'Y' ? this.url + 'manager' : this.url + 'ga'
                    // console.log(this.url)
                    await axios
                    .post(
                        api_url_gocorp +
                        this.url + "?mu_token=" +
                        localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik'),
                        this.body,
                        headers
                    )
                    .then((response) => {
                        this.data_detail = response.data.data;
                        if(response.data.response_code == '22'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
                            alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                            this.removeLocalStorage();
                        }
                        else if(response.data.response_code == '21'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
                            alert('NIK tidak ditemukan. Silahkan Login kembali!')
                            this.removeLocalStorage();
                        }

                        else if(response.data.response_code == '20'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
                            alert('Token tidak sesuai. Silahkan Login kembali!')
                            this.removeLocalStorage();
                        }

                        else if (this.data_detail == []) {
                            this.dialog.loading = false;
                            this.dialog.approve = false;
                            return;
                        }
                        else if (!this.data_detail) {
                            // console.log(response)
                            this.dialog.loading = false;
                            this.dialog.approve = false;
                            this.alert.fail = true;
                            this.msg = 'Gagal melakukan approve/reject trip'
                            window.setTimeout(() => {
                                this.alert.fail = false;
                            }, 2000)
                            return;
                        }

                        else{
                            this.alert.success = true;
                            this.msg = 'Berhasil melakukan approve/reject trip'
                            window.setTimeout(() => {
                                this.alert.success = false;
                            }, 2000)
                            this.dialog.detail = false;
                            this.dialog.approve = false;
                            this.getDataTrip(this.data_trip_url);
                            return;
                        }
                    })
                    .catch((error) => {
                        console.log("GoCorp.vue (error) :: ", error);
                        this.alert.fail = true;
                        this.msg = 'Gagal melakukan approve/reject trip! Silahkan coba lagi'
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
                        this.dialog.loading = false;
                        this.dialog.approve = false;
                        return;
                    });

                    // Break if request failed
                    if (!this.data_detail) {
                        this.dialog.loading = false;
                        this.dialog.approve = false;
                        return;
                    }
                }
                catch (e) {
                    console.error(e);
                    this.alert.fail = true;
                    this.msg = 'Error: koneksi gagal'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.loading = false;
                        this.dialog.approve = false;
                    return;
                }
                this.dialog.loading = false;
            },

            async getDataTrip(url){
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
                    var link = this.approve == 'report-gocorp' 
                    ? api_url_gocorp + url + "?mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token') + '&month='+this.date
                    : (this.approve == 'request-trip' 
                        ? api_url_gocorp + url + "?mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token') +"&cost_center="+localStorage.getItem('cost_center')
                        : api_url_gocorp + url + "?mu_username=" + localStorage.getItem('nik') + "&mu_token=" + localStorage.getItem('token'));

                    await axios
                    .get(
                       link,
                        headers
                    )
                    .then((response) => {
                        this.data = response.data.data;
                        this.master_data = response.data.data;
                        // console.log(response)
                        if(response.data.response_code == '22'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
                            alert('Token sudah kadaluarsa. Silahkan Login kembali!')
                            this.removeLocalStorage();
                        }
                        else if(response.data.response_code == '21'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
                            alert('NIK tidak ditemukan. Silahkan Login kembali!')
                            this.removeLocalStorage();
                        }

                        else if(response.data.response_code == '20'){
                            localStorage.removeItem("user_fname");
                            localStorage.removeItem("user_lname");
                            localStorage.removeItem("token");
                            localStorage.removeItem("nik");
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
        },

        
        
        mounted(){
            if (!localStorage.nama) {
                    this.removeLocalStorage();
            }
            localStorage.setItem('selection', 'gocorp')
            this.manager = localStorage.getItem('manager');
            this.cost_center = localStorage.getItem('cost_center');
            this.$store.commit('setSelection', localStorage.getItem('selection'))
            this.approve = this.$route.meta.mode
            if(this.manager != 'Y' && this.cost_center != 'HRGA'){
                this.route('home-gocorp')
            }
            if(this.approve == 'history-trip'){
                this.title = 'History Trip';
                this.data_trip_url = 'get-history';
            }
            else if(this.approve == 'report-gocorp'){
                this.title = 'Report';
                this.data_trip_url = 'get-report';
            }
            else if(this.approve == 'menu-ga'){
                this.title = 'GA Menu'
                this.data_trip_url = 'get-trip-ga';
            }
            else{
                this.title = 'Request Trip'
                this.data_trip_url = 'get-trip-manager';
                if(this.manager != 'Y'){
                    this.route('home-gocorp')
                }
            }
            this.getDataTrip(this.data_trip_url);
            // this.header_list
            // console.log(this.header_list)
        },
    }
</script>

<style>
    .shake-card:hover {
        animation: shake .5s;
        animation-iteration-count: infinite;
        cursor: pointer;
    }

    .centered-input input {
      text-align: center
    }

    @keyframes shake {
        0%, 100%{ transform: rotate(-1deg);}
        50%{ transform: rotate(1deg); }
    }
</style>
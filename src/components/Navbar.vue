<template>
    <v-navigation-drawer
        v-show="!$route.meta.hideNavbar"
        permanent
        color="#073e5d"
        style="border-right: 2.5px solid #f46d3d !important; width: 23% !important;">
        <!-- ALERT START -->
        <v-dialog 
        width="250"
        v-model="alert.success" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="success">
                Update Profile Berhasil!
            </v-alert>
        </v-dialog>

        <v-dialog 
        width="250"
        v-model="alert.fail" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="error">
                Update Profile Gagal!
            </v-alert>
        </v-dialog>
        <!-- ALERT END -->
        <!-- DIALOG PROFILE START -->
        <v-dialog
            persistent
            content-class="elevation-0"
            v-model="dialog.profile"
            width="750">
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
                                    <div class="ma-2 ml-6 pa-2 d-flex flex-row">
                                        <h2 style="font-weight: 500">Profile</h2>
                                        <v-spacer></v-spacer>
                                        <v-hover v-if="flag" v-slot="{hover}">
                                            <v-btn icon class="mr-5" :class="hover ? 'red--text' : '' " @click="closeDialog"><v-icon >mdi-close</v-icon></v-btn>
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
                                                <v-row class="d-flex">
                                                    <v-col cols="12">
                                                        <v-row class="pr-4 text-start mb">
                                                            <v-col cols="4" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-text-field
                                                                outlined
                                                                :value="nik"
                                                                hide-details
                                                                dense
                                                                filled
                                                                :readonly="true"
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-text-field
                                                                :value="fullname"
                                                                outlined
                                                                filled
                                                                dense
                                                                :readonly="true"
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Departemen</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-text-field
                                                                :value="cost_center"
                                                                outlined
                                                                filled
                                                                dense
                                                                :readonly="true"
                                                                hide-details
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Telepon</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-row class="ma-0">
                                                                    <v-text-field
                                                                    v-model="profile.phone"
                                                                    outlined
                                                                    :class="phone ? '' : 'outline-red hint-red'"
                                                                    :hint="phone ? '' : 'Kolom wajib diisi!'"
                                                                    persistent-hint
                                                                    dense
                                                                    hide-details="auto"
                                                                    ></v-text-field>
                                                                </v-row>
                                                                <v-row class="ma-0 pb-0">
                                                                    <small>*No Telepon Akun Gojek</small>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row class="pr-4 text-start">
                                                            <v-col cols="4" class="text-start ma-0 pa-auto">
                                                                <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Email</h3>
                                                            </v-col>
                                                            <v-col cols="8">
                                                                <v-row class="ma-0">
                                                                    <v-text-field
                                                                    v-model="profile.email"
                                                                    outlined
                                                                    :class="email ? '' : 'outline-red hint-red'"
                                                                    :hint="email ? '' : 'Kolom wajib diisi!'"
                                                                    persistent-hint
                                                                    dense
                                                                    hide-details="auto"
                                                                    ></v-text-field>    
                                                                </v-row>
                                                                <v-row class="ma-0 pb-0">
                                                                    <small>*Email Kantor</small>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                
                                                <v-row class="d-flex justify-center">
                                                    <v-btn color="green white--text" width="350" class="pr-7 pl-7 mt-3" @click="onSubmit"><v-icon small>mdi-account-cog</v-icon> &nbsp;Update Profile</v-btn>
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
        <!-- DIALOG PROFILE END -->
        <v-list-item class="px-2 py-6">
            
            <v-img src="../assets/gli-logo-white-no-bg.png" max-height="40" max-width="40" class="mr-3" :class="selection=='gocorp' ? 'ml-7' : 'ml-3'" contain></v-img>
            
            <v-list-item-subtitle
                style="
                color: #fff !important;
                font-size: 13px;
                letter-spacing: 1.1px;
                line-height: 1.5;">
                <span v-html="title"></span>
            </v-list-item-subtitle>
        </v-list-item>
        <v-divider color="#f26d3b" style="border-width: 1px;"></v-divider>
        <v-list dense class="pa-0 ma-0">
            <v-menu open-on-click style="border-radius: 10px">
                <template v-slot:activator="{ on }">
                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                    <v-list-item v-on="on" class="pb-3" link>
                        <v-list-item-avatar>
                            <v-icon color="#fff" x-large>mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-col>
                            <v-row>
                                <v-list-item-title style="color: #fff !important" class="mt-1">{{fullname}}</v-list-item-title>
                            </v-row>
                            <v-row>
                                <v-list-item-subtitle style="color: lightslategrey !important" class="mt-1">{{ manager == 'Y' ? cost_center + ' Manager' : cost_center   }}</v-list-item-subtitle>
                            </v-row>
                        </v-col>
                    </v-list-item>
                    <v-list-item>    
                        <v-row class="d-flex justify-center">
                            <v-btn @click="dialog.profile = true" block class="mb-3" color="#f26d3b" dark><v-icon small>mdi-account</v-icon>&nbsp;Profile</v-btn>
                        </v-row>
                    </v-list-item>
                </template>
                <v-list min-height="100" min-width="250" class="pa-3">
                    <v-row class="px-1 d-flex flex-row justify-center align-center">
                        <v-col class="mr-0 pr-0" style="width:104px !important">
                            <v-avatar color="primary" size="80">
                                <span class="white--text text-h5">{{user_init}}</span>
                            </v-avatar>
                        </v-col>
                        <v-col class="ml-0 pl-0">
                            <h4 class="text-left">{{fullname}}</h4>
                            <h5 class="text-left" style="font-weight: 500">{{nik}}</h5>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-3 mb-3"></v-divider>
                    <v-row>
                        <v-col class="mb-3 pb-1">
                            <v-btn
                            small
                            right
                            color="red darken-1"
                            class="noTextTransform ml-auto"
                            style="color: white; float: left"
                            @click="onLogout"
                            >
                            Logout
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-list>
            </v-menu>
        </v-list>
        <v-divider color="#f26d3b" style="border-width: 1px;"></v-divider>
        <!-- Navbar Parking START -->
        <v-expansion-panels  v-model="panel" accordion>
            <v-expansion-panel class="rounded-0" style="border-bottom: 2px solid #f46d3d !important;">
                <v-expansion-panel-header dark style="background:#073e5d !important" class="white--text">
                    Parking
                    <template v-slot:actions>
                        <v-icon color="white">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on" class="pb-3" link @click="route('home')">
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-home</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important">Beranda</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu v-if="cost_center == 'HRGA'"  open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on"  @click="route('list-kendaraan')" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-clipboard-list-outline</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important; font-size: small;">List Kendaraan</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu v-if="cost_center == 'HRGA'"  offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on" v-bind="attrs" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-receipt-text-outline</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important">Report</v-list-item-title>
                                    </v-list-item>
                                </template>
                                <!-- @click="route('report')" -->
                                <v-list class="ma-0 pa-0">
                                    <v-list-item>
                                        <v-btn @click="routeFinance('report-finance', 'finance')" text style="text-transform: unset; font-size: 13px;" block>Finance<v-spacer></v-spacer></v-btn>
                                    </v-list-item>
                                </v-list>
                                <v-list>
                                    <v-list-item>
                                        <v-btn @click="routeFinance('report-quality-parking', 'quality-parking')" text style="text-transform: unset; font-size: 13px;" block>Quality Parking<v-spacer></v-spacer></v-btn>
                                    </v-list-item>
                                </v-list>
                                <v-list>
                                    <v-list-item>
                                        <v-btn @click="route('posting')" text style="text-transform: unset; font-size: 13px;" block>Posting<v-spacer></v-spacer></v-btn>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-list>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- Navbar Parking END -->
            <!-- Navbar Gocorp START -->
            <v-expansion-panel :value="panel" class="rounded-0" style="border-bottom: 2px solid #f46d3d !important;">
                <v-expansion-panel-header dark style="background:#073e5d !important" class="white--text">
                    GoCorp
                    <template v-slot:actions>
                        <v-icon color="white">$expand</v-icon>
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on" class="pb-3" link @click="route('home-gocorp')">
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-home</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important">Beranda</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <!-- Menu GA -->
                        <v-list dense class="pa-0 ma-0">
                            <v-menu v-if="cost_center == 'HRGA' && manager != 'Y' && manager != 'T'"  open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on"  @click="route('menu-ga')" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-playlist-edit</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important; font-size: small;">Menu GA</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu v-if="cost_center == 'HRGA' && manager != 'Y'"  open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on"  @click="route('report-gocorp')" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-receipt-text-outline</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important; font-size: small;">Report</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <v-list dense class="pa-0 ma-0">
                            <v-menu v-if="cost_center == 'HRGA' && manager != 'Y'"  open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on"  @click="route('history-trip')" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-history</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important; font-size: small;">History Trip</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <!-- Menu GA -->
                        <!-- Menu Level Manager -->
                        <v-list dense class="pa-0 ma-0">
                            <v-menu  open-on-click style="border-radius: 10px">
                                <template v-slot:activator="{ on }">
                                    <!-- <v-icon color="grey darken-2" class="mr-8">mdi-alert-circle-outline</v-icon> -->
                                    <v-list-item v-on="on"  @click="route('request-trip')" class="pb-3" link>
                                        <v-list-item-avatar>
                                            <v-icon color="#fff" x-large>mdi-folder-account-outline</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-title style="color: #fff !important; font-size: small;">Request Trip</v-list-item-title>
                                    </v-list-item>
                                </template>
                            </v-menu>
                        </v-list>
                        <!-- Menu Level Manager -->
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- Navbar Gocorp END -->
        </v-expansion-panels>
        <v-list-item>    
            <v-row class="d-flex justify-center">
                <v-btn 
                @click="changeRole('normal')"
                :disabled="manager == 'T' || manager == 'Y'"
                block
                class="mt-3" 
                color="#f26d3b" dark>
                <v-icon small>mdi-account</v-icon>&nbsp;Karyawan Biasa</v-btn>
            </v-row>
        </v-list-item>
        <!-- <v-list-item v-if="manager != 'T' && manager != 'Y'">    
            <v-row class="d-flex justify-center">
                <v-btn 
                @click="changeRole('normal')"
                block
                class="mt-3" 
                color="#f26d3b" dark>
                <v-icon small>mdi-account</v-icon>&nbsp;Karyawan Biasa</v-btn>
            </v-row>
        </v-list-item> -->
        <v-list-item>    
            <v-row class="d-flex justify-center">
                <v-btn 
                block 
                @click="changeRole('hrga')"
                :disabled="manager == 'T' || manager == 'Y'"
                class="mt-3" 
                color="#f26d3b" dark>
                <v-icon small>mdi-account-card</v-icon>&nbsp;HRGA</v-btn>
            </v-row>
        </v-list-item>
        <v-list-item> 
            <v-row class="d-flex justify-center">
                <v-btn
                block 
                @click="changeRole('manager')"
                :disabled="manager == 'N' || manager == 'F'"
                class="mt-3" 
                color="#f26d3b" dark>
                <v-icon small>mdi-account-child</v-icon>
                Manager</v-btn>
            </v-row>
        </v-list-item>
        
    </v-navigation-drawer>
</template>

<script>
    import axios from "axios";
    import vuetify from "@/plugins/vuetify";
    import { api_url_gocorp } from "@/global_variable/global_variable";
  
    // import NavBar from "./components/NavBar";
  
    export default {
      name: "app",
      vuetify,
  
      components: {
  },
  
      data() {
        return {
          fullname: null,
          alert:{
            success: false,
            fail: false,
          },
          flag: true,
          title: 'Aplikasi<br/>Transportasi<br/>Online',
          selection: null,
          user_init: null,
          user: null,
          nik: null,
          phone: null,
          profile:{
            email: null,
            phone: null,
          },
          email: null,
          manager: null,
          cost_center: null,
          nama_cost_center: null,
          dialog:{
            profile: false,
          },
          panel: 0,
          textInputRules: [(v) => !!v || "Kolom harus diisi"],
          btnDisable: "",
        };
      },
  
    computed:{
        checkSelection(){
            return this.$store.state.selection
        }
    },
    
    watch: {
        checkSelection(newVal){
            this.selection = this.$store.state.selection
            this.title = this.selection == 'parking' ? 'Parking<br/>Registration' : (this.selection == 'gocorp'? 'GoCorp' : 'Aplikasi<br/>Transportasi<br/>Online')
            this.panel = this.selection == 'parking' ? 0 : 1
        },
    },
      
    async created(){ 
        this.fullname = localStorage.getItem('nama')
        this.nik = localStorage.getItem('nik')
        var match = this.fullname.match(/\b(\w)/g);
        this.cost_center = localStorage.getItem('cost_center');
        // this.phone = localStorage.getItem('phone');
        // this.email = localStorage.getItem('email');
        this.getCostCenter();
        this.manager = localStorage.getItem('manager');
        this.user_init = match.join('');
        this.phone = localStorage.getItem('phone');
        this.email = localStorage.getItem('email')
        this.nama = localStorage.getItem('nama');
        if(localStorage.getItem('phone') == null || localStorage.getItem('phone') == '' || localStorage.getItem('email') == null || localStorage.getItem('email') == ''){
            this.flag = false,
            this.dialog.profile = true;
        }
        else{
            this.flag = true;
        }
    },
      
  
      methods: {
        changeRole(role){
            if(role == 'hrga'){
                localStorage.setItem('cost_center', 'HRGA')
                localStorage.setItem('manager', 'N')
            }
            else if (role == 'manager'){
                localStorage.setItem('manager', 'Y')
            }
            else{
                localStorage.setItem('cost_center', this.nama_cost_center)
                localStorage.setItem('manager', 'N')
            }
            location.reload();
        },

        closeDialog(){
            this.dialog.profile = false;
            this.profile.phone = this.phone;
            this.profile.email = this.email;
        },
        async getCostCenter(){
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
                    api_url_gocorp + "get-cost-center?" + "mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token'),
                    headers
                )
                .then((response) => {
                    var data = response.data.data[0];
                    this.email = data.email;
                    this.profile.email = data.email;
                    this.phone = data.phone;
                    this.profile.phone = data.phone;
                    this.nama_cost_center = data.nama_cost_center;
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    // alert("Gagal mengambil data Cost Center!");
                    this.dialog.loading = false;
                    return;
                })
            }
            catch (e){
                console.error(e);
                // alert("Error: koneksi gagal");
                this.dialog.loading = false;
                return;
            }
            this.dialog.loading = false;
        },

        async onSubmit() {
            if(this.profile.phone == null || this.profile.phone == ''){
                alert('No. Hp tidak boleh kosong!')
                return;
            }
            
            else if(this.profile.email == null || this.profile.email == ''){
                alert('Email tidak boleh kosong!')
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
                    "nik": this.nik,
                    "phone": this.profile.phone,
                    "email": this.profile.email    
                }

                await axios
                .post(
                    api_url_gocorp +
                    "get-cost-center?mu_token=" +
                    localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik'),
                    body,
                    headers
                )
                .then((response) => {
                    var data = response.data.data;
                    console.log(data)
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
                        this.dialog.profile = false;
                        return;
                    }

                    else if(response.data.response_message == "success"){
                        this.dialog.loading = false;
                        localStorage.setItem('email', this.email);
                        localStorage.setItem('phone', this.phone);
                        this.email = this.profile.email;
                        this.phone = this.profile.phone;
                        this.alert.success = true;
                        this.dialog.profile = false;
                        window.setTimeout(() => {
                            this.alert.success = false;
                        }, 2000)
                    }
                    else {
                        // console.log(response)
                        this.dialog.loading = false;
                        this.dialog.profile = false;
                        this.alert.fail = true;
                        
                        window.setTimeout(() => {
                            this.alert.fail = false;
                        }, 2000)
                        return;
                    }
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    this.alert.fail = true;
                    this.dialog.loading = false;
                    this.dialog.profile = false;
                    return;
                });
            }
            catch (e) {
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                this.dialog.profile = false;
                return;
            }
            this.getCostCenter();
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

        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },

        routeFinance(route, param) {
            this.$router.push({ name: route, params:{ mode: param } }).catch((error) => {
                console.log(error);
            });
        },
        async onLogout() {
          const headers = {
            "Content-Type": "application/json",
            Host: "<calculated when request is sent>",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            token: localStorage.token,
            username: localStorage.nik,
            app: "sso",
          };
  
          await axios
            // .post("http://10.4.1.135:5001/sso/logout", headers)
            .post("https://development.gli.id:5002/api/sso/logout", headers)
            .then((response) => {
  
            if (response.data.response_code == 200) {
                alert("Server error !");
            }
              localStorage.removeItem("nama");
              localStorage.removeItem("phone");
              localStorage.removeItem("email");
              localStorage.removeItem("manager");
              localStorage.removeItem("phone");
              localStorage.removeItem("cost_center");
              localStorage.removeItem("token");
              localStorage.removeItem("selection");
              localStorage.removeItem("nik");
              this.$router.push({ name: "login" });
            })
            .catch((error) => {
              console.log("Header.vue (error) :: ", error);
              alert("Server error!");
              localStorage.removeItem("nama");
              localStorage.removeItem("selection");
              localStorage.removeItem("phone");
              localStorage.removeItem("email");
              localStorage.removeItem("manager");
              localStorage.removeItem("phone");
              localStorage.removeItem("cost_center");
              localStorage.removeItem("token");
              localStorage.removeItem("nik");
          });
        },
        
      },
    };
  </script>
<style scoped>
    .v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
        padding: 0 !important;
        background-color: #073e5d ;
    }
    .v-expansion-panel::before {
        box-shadow: none;
    }
    .outline-red :deep(fieldset) {
        border: 2px solid rgb(250, 87, 87);
    }
    .hint-red  :deep(.v-messages__message){
        color: red;
    }

</style>
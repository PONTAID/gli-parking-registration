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
        width="250"
        v-model="alert.success" 
        content-class="elevation-0" 
        hide-overlay>
            <v-alert type="success">
                {{change == 'cancel' ? 'Cancel Trip berhasil!' : 'Tambah Trip berhasil!'}}
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
                <v-card-text>Apakah anda yakin ingin keluar dari halaman tambah trip?</v-card-text>
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
                        @click="route('home-gocorp')">
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
                <v-card-text style="font-size: 16px;">Apakah anda yakin untuk {{ change=='reschedule' ? 'reschedule' : (change == 'cancel' ? 'cancel' : 'menambah') }} trip?</v-card-text>
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
                <v-card-text style="font-size: 16px;">Tambah Trip berhasil!<br/>kartu parkir di Tim General Affair</v-card-text>
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
            width="90%"
            class="mb-4 px-8 py-4 mt-5 text-center"
            style="border-radius: 25px 25px 25px 25px !important">
            <div id="card" class="my-2 pa-2 px-2 d-flex flex-row" style="width: 100% !important">
                <v-card elevation="3" outlined style="width: 100% !important">
                    <v-row>
                        <v-col>
                            <div class=" ma-1 pa-2 d-flex flex-row ml-5">
                                <h2 style="font-weight: 400">{{ title}}</h2>
                            </div>
                        </v-col>
                    </v-row>    
                    <v-divider class="ml-8 mr-8"></v-divider>
                    <div
                        style="width: 100%;">
                        <v-col cols="12" md="12" class="mt-0 pt-0">
                            <v-card flat class="ma-0 pa-0" width="100%">
                                <v-card-text width="100%">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="6" class="pa-0">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">NIK</h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                        v-model="data_trip.nik"
                                                        :rules="textInputRules"
                                                        outlined
                                                        dense
                                                        hide-details="auto"
                                                        filled
                                                        readonly
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama</h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                        v-model="data_trip.nama"
                                                        dense
                                                        hide-details="auto"
                                                        :rules="textInputRules"
                                                        outlined
                                                        filled
                                                        readonly
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start mb-3">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">No. Telepon</h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                        style=""
                                                        dense
                                                        hide-details="auto"
                                                        v-model="data_trip.phone"
                                                        :rules="textInputRules"
                                                        filled
                                                        readonly
                                                        outlined
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="6" class="pa-0">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Email</h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.email"
                                                            dense
                                                            hide-details="auto"
                                                            :rules="textInputRules"
                                                            outlined
                                                            filled
                                                            readonly
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama Cost Center </h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.cost_center"
                                                            :rules="textInputRules"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                            filled
                                                            readonly
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 mb-10 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Nama Atasan</h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.leader_name"
                                                            :rules="textInputRules"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                            filled
                                                            readonly
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-divider style="border-width: 1px;"></v-divider>
                                        <v-row class="mt-5">
                                            <v-col cols="6" class="pa-0">
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tanggal Awal Trip <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-menu
                                                            v-model="menu.start_trip_menu"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                        >
                                                            <template v-slot:activator="{ on: menu, attrs }">
                                                                <v-text-field
                                                                    v-bind="attrs"
                                                                    v-model="data_trip.start_date"
                                                                    persistent-hint
                                                                    :class="getOutlineDate(data_trip.start_date, data_trip.end_date) == true ? 'outline-red hint-red' : ''"
                                                                    :hint="getOutlineDate(data_trip.start_date, data_trip.end_date) == true ? 'Tanggal Awal tidak boleh lebih dari tanggal akhir!' : ''"
                                                                    v-on="{...menu}"
                                                                    dense
                                                                    hide-details="auto"
                                                                    readonly
                                                                    :filled="change != null"
                                                                    outlined
                                                                    prepend-inner-icon="mdi-calendar"
                                                                >
                                                                </v-text-field>
                                                            </template>
                                                            <v-date-picker v-if="change == null"
                                                            v-model="data_trip.start_date"
                                                            :min="dateNow"
                                                            @input="menu.start_trip_menu = false"
                                                            ></v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start pb-0">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pb-0">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tanggal Akhir Trip <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-menu
                                                            v-model="menu.end_trip_menu"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="auto"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-bind="attrs"
                                                                v-model="data_trip.end_date"
                                                                persistent-hint
                                                                :class="getOutlineDate(data_trip.start_date, data_trip.end_date) == true ? 'outline-red hint-red' : ''"
                                                                :hint="getOutlineDate(data_trip.start_date, data_trip.end_date) == true ? 'Tanggal Awal tidak boleh lebih dari tanggal akhir!' : ''"
                                                                v-on="on"
                                                                dense
                                                                readonly
                                                                :filled="change != null"
                                                                outlined
                                                                prepend-inner-icon="mdi-calendar"
                                                            >
                                                            </v-text-field>
                                                            </template>
                                                            <v-date-picker v-if="change == null"
                                                            v-model="data_trip.end_date"
                                                            :min="dateNow"
                                                            @input="menu.end_trip_menu = false"
                                                            ></v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                </v-row>
                                                <v-col cols="12" class="pa-0">
                                                    <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pt-0">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Trip <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mt-0 pt-0">
                                                        <v-text-field
                                                        v-model="data_trip.total_trip"
                                                            :rules="textInputRules.concat(minRules)"
                                                            type="number"
                                                            min="0"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                            :filled="change != null"
                                                            :readonly="change != null"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                </v-col>
                                            </v-col>
                                            <v-col cols="6" class="pa-0">
                                                <!-- <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Penumpang <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.total_trip"
                                                            :rules="textInputRules.concat(minRules)"
                                                            type="number"
                                                            min="0"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                            :filled="change != null"
                                                            :readonly="change != null"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row> -->
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Penumpang <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.total_penumpang"
                                                            :rules="textInputRules.concat(minRules)"
                                                            type="number"
                                                            min="0"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                            :filled="change != null"
                                                            :readonly="change != null"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 mb-5 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tujuan Trip <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3 mb-3">
                                                        <v-textarea
                                                            v-model="data_trip.desc_trip"
                                                            class="hide-scrollbar pa-0 ma-0"
                                                            :rules="textInputRules"
                                                            :filled="change != null"
                                                            rows="3"
                                                            :readonly="change != null"
                                                            outlined
                                                            dense
                                                            no-resize
                                                            hide-details="auto"
                                                        ></v-textarea>
                                                    </v-col>
                                                </v-row>
                                                <v-row v-if="change == 'cancel'" class="pr-4 text-start">
                                                    <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                        <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Deskripsi Pembatalan <strong class="red--text">*</strong></h3>
                                                    </v-col>
                                                    <v-col cols="7" class="mr-3">
                                                        <v-text-field
                                                            v-model="data_trip.desc_cancel"
                                                            :rules="textInputRules"
                                                            outlined
                                                            dense
                                                            hide-details="auto"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <!-- Reschedule START -->
                                        <!-- <div v-if="change=='reschedule'">
                                            <v-divider class="mt-5" style="border-width: 1px;"></v-divider>
                                            <v-row class="mt-5 mb-5">
                                                <h2 style="font-weight: 400" class="black--text">Input Trip Baru</h2>
                                            </v-row>
                                            <v-row >
                                                <v-col cols="6" class="pa-0">
                                                    <v-row class="pr-4 text-start">
                                                        <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                            <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tanggal Awal Trip</h3>
                                                        </v-col>
                                                        <v-col cols="7" class="mr-3">
                                                            <v-menu
                                                                v-model="menu.change_start_date_menu"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    v-bind="attrs"
                                                                    v-model="data_trip.change_start_date"
                                                                    v-on="on"
                                                                    readonly
                                                                    persistent-hint
                                                                    :class="getOutlineDate(data_trip.change_start_date, data_trip.change_end_date) == true ? 'outline-red hint-red' : ''"
                                                                    :hint="getOutlineDate(data_trip.change_start_date, data_trip.change_end_date) == true ? 'Tanggal Awal tidak boleh lebih dari tanggal akhir!' : ''"
                                                                    outlined
                                                                    dense
                                                                    hide-details="auto"
                                                                    prepend-inner-icon="mdi-calendar"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="data_trip.change_start_date"
                                                                :min="dateNow"
                                                                @input="menu.change_start_date_menu = false"
                                                                ></v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="pr-4 text-start">
                                                        <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                            <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Tanggal Akhir Trip</h3>
                                                        </v-col>
                                                        <v-col cols="7" class="mr-3" >
                                                            <v-menu
                                                                v-model="menu.change_end_date_menu"
                                                                :close-on-content-click="false"
                                                                :nudge-right="40"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="auto"
                                                            >  
                                                                <template v-slot:activator="{ on, attrs }">
                                                                <v-text-field
                                                                    v-bind="attrs"
                                                                    v-model="data_trip.change_end_date"
                                                                    v-on="on"
                                                                    readonly
                                                                    persistent-hint
                                                                    :class="getOutlineDate(data_trip.change_start_date, data_trip.change_end_date) == true ? 'outline-red hint-red' : ''"
                                                                    :hint="getOutlineDate(data_trip.change_start_date, data_trip.change_end_date) == true ? 'Tanggal Awal tidak boleh lebih dari tanggal akhir!' : ''"
                                                                    outlined
                                                                    dense
                                                                    hide-details="auto"
                                                                    prepend-inner-icon="mdi-calendar"
                                                                ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                v-model="data_trip.change_end_date"
                                                                :min="dateNow"
                                                                @input="menu.change_end_date_menu = false"
                                                                ></v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col cols="6" class="pa-0">
                                                    <v-row class="pr-4 text-start">
                                                        <v-col cols="4" class="text-start mt-0 ma-0 pa-auto">
                                                            <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Total Trip</h3>
                                                        </v-col>
                                                        <v-col cols="7" class="mr-3">
                                                            <v-text-field
                                                                v-model="data_trip.change_total_trip"
                                                                :rules="textInputRules"
                                                                outlined
                                                                type="number"
                                                                min="0"
                                                                dense
                                                                hide-details="auto"
                                                            ></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="pr-4 text-start">
                                                        <v-col cols="4" class="text-start mt-0 ma-0 mb-5 pa-auto">
                                                            <h3 class="black--text pt-2" style="font-weight: 400; font-size: 16px">Deskripsi Trip</h3>
                                                        </v-col>
                                                        <v-col cols="7" class="mr-3 mb-3">
                                                            <v-textarea
                                                                class="hide-scrollbar pa-0 ma-0"
                                                                v-model="data_trip.change_desc_trip"
                                                                :rules="textInputRules"
                                                                no-resize
                                                                rows="3"
                                                                outlined    
                                                                dense
                                                                hide-details="auto"
                                                            ></v-textarea>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </div> -->
                                        <!-- Reschedule END -->
                                        <v-row class="mt-7">
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-8 white--text" width="200" color="red lighten-1" @click="(dialog.cancel = true)">Cancel</v-btn>
                                            <v-btn class="mr-6" color="green white--text" width="200" @click="(dialog.submit = true)">Submit</v-btn>
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
    <!-- TAMBAH TRIP END -->
                       
    </v-col>
</template>

<script>
import axios from 'axios'
import { api_url, api_url_gocorp } from '../global_variable/global_variable.js';
export default {
    name: "TambahTrip",
    components: {},

    data() {
        return {
            title: 'Tambah Trip',
            alert: {
                success: false,
                fail: false,
            },
            msg: null,
            change: null,
            email: null,
            phone: null,
            url_submit: null,
            dateNow: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
            mode: null,
            menu:{
                start_trip_menu: false,
                end_trip_menu: false,
                change_start_date_menu: false,
                change_end_date_menu: false,
            },
            cost_center: null,
            manager: null,
            dialog:{
                loading: false,
                profile: false,
                cancel: false,
                submit: false,
            },
            body: {},
            textInputRules: [(v) => !!v || "Kolom harus diisi"],
            minRules: [(v) => parseInt(v) > 0 || "Total Trip wajib lebih dari 0"],
            data_trip:{
                id: null,
                mcc_id: null,
                nik: null,
                nama: null,
                phone: null,
                email: null,
                mcc_id: null,
                nik_atasan: null,
                cost_center: null,
                leader_name: null,
                change_start_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
                change_end_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
                change_total_trip: null,
                change_desc_trip: null,
                start_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
                desc_cancel: null,
                end_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
                total_trip: null,
                total_penumpang: null,
                desc_trip: null
            },
        };
    },

    methods:{
        async updateProfile() {
            if(this.data_trip.phone == null || this.data_trip.phone == ''){
                alert('No. Hp tidak boleh kosong!')
                return;
            }
            
            else if(this.data_trip.email == null || this.data_trip.email == ''){
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
                    "nik": this.data_trip.nik,
                    "phone": this.data_trip.phone,
                    "email": this.data_trip.email    
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
                        return;
                    }

                    else if(response.data.response_message == "success"){
                        this.dialog.loading = false;
                        localStorage.setItem('email', this.email);
                        localStorage.setItem('phone', this.phone);
                        alert('Berhasil mengupdate Profile!');            
                        this.getCostCenter();
                        this.dialog.profile = false;
                    }
                    else {
                        // console.log(response)
                        this.dialog.loading = false;
                        alert("Gagal Mengupdate Profile!");
                        return;
                    }
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    alert("Gagal menngupdate profile! Silahkan coba lagi.");
                    this.dialog.loading = false;
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
            this.dialog.loading = false;
        },

        getOutlineDate(startDate,endDate){
            startDate = Date.parse(startDate);
            endDate = Date.parse(endDate);

            if(startDate > endDate){
                return true;
            }
            else{
                return false;
            }
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
                    // console.log(response.data.data[0])
                    var data = response.data.data[0];
                    this.data_trip.leader_name = this.manager == 'Y' ? data.nama_atasan : '-'
                    this.data_trip.leader_name = data.nama_atasan == null ? '-' : data.nama_atasan
                    this.data_trip.cost_center = data.nama_cost_center
                    this.data_trip.mcc_id = data.mcc_id;
                    this.data_trip.nik_atasan = this.manager == 'Y' ? data.nik_atasan : '-'
                    this.data_trip.nik_atasan = data.nik_atasan == null ? '-' : data.nik_atasan
                    this.data_trip.email = data.email;
                    this.data_trip.phone = data.phone;

    
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    alert("Gagal mengambil data Cost Center!");
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
            // console.log(this.change)
           if(this.change == 'cancel'){
                if(this.data_trip.desc_cancel == null){
                    this.alert.fail = true;
                    this.msg = 'Lengkapi kolom yang wajib diisi'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.submit = false;
                    return;
                }
                else{
                    this.body = {
                        "gct_id": this.data_trip.id,
                        "notes": this.data_trip.desc_cancel
                    }
                    console.log(this.body)
                    this.url_submit = api_url_gocorp + "cancel?mu_token=" + localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik')
                }
            }
            else if(this.change != 'cancel'){
                if(this.data_trip.phone == null || this.data_trip.email == null || this.data_trip.total_trip == null || this.data_trip.desc_trip == null || this.data_trip.total_penumpang == null){
                    this.alert.fail = true;
                    this.msg = 'Lengkapi kolom yang wajib diisi'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.submit = false;
                    return;
                }
                else if(Date.parse(this.data_trip.start_date) > Date.parse(this.data_trip.end_date)){
                    this.alert.fail = true;
                    this.msg = 'Tanggal awal trip tidak boleh lebih dari tanggal akhir trip'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.submit = false;
                    return;
                }
                else if(parseInt(this.data_trip.total_trip) <= 0){
                    this.alert.fail = true;
                    this.msg = 'Total Trip wajib lebih dari 0'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.submit = false;
                    return;
                }
                else if(parseInt(this.data_trip.total_penumpang) <= 0){
                    this.alert.fail = true;
                    this.msg = 'Total Penumpang wajib lebih dari 0'
                    window.setTimeout(() => {
                        this.alert.fail = false;
                    }, 2000)
                    this.dialog.submit = false;
                    return;
                }
                else{
                    this.body = {
                        "nik": this.data_trip.nik,
                        "nama": this.data_trip.nama,
                        "phone": this.data_trip.phone,
                        "email": this.data_trip.email,
                        "mcc_id": this.data_trip.mcc_id,
                        "nik_atasan": this.data_trip.nik_atasan,
                        "nama_atasan": this.data_trip.leader_name,
                        "nama_cost_center": this.data_trip.cost_center,
                        "start_date": this.data_trip.start_date,
                        "end_date": this.data_trip.end_date,
                        "total_trip": this.data_trip.total_trip, 
                        "total_penumpang": this.data_trip.total_penumpang,
                        "descp_trip": this.data_trip.desc_trip
                    }
                    console.log(this.body)
                    if(this.manager == 'Y'){
                        this.url_submit = api_url_gocorp + "add-trip-manager?mu_token=" + localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik')
                }
                    else{
                        this.url_submit = api_url_gocorp + "trip?mu_token=" + localStorage.getItem('token')+"&mu_username=" + localStorage.getItem('nik')
                    }
                }
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
                .post(
                    this.url_submit,
                    this.body,
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

                    else if(response.data.response_message == 'success'){
                        
                        // this.change == 'cancel' ? alert('Cancel Trip berhasil!') : alert('Tambah Trip berhasil!')

                        this.alert.success = true;
                        this.dialog.submit = false;
                        window.setTimeout(() => {
                            this.alert.success = false;
                            this.route('home-gocorp');
                        }, 2000)
                        return;
                    }
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    this.alert.fail = true;
                    this.msg = this.change == 'cancel' ? 'Gagal membatalkan Trip! Silahkan coba lagi.' : "Gagal menambahkan Trip! Silahkan coba lagi.";
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
                this.alert.fail = true;
                    this.msg = 'Error Koneksi Gagal'
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
        
        async getData(id){
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
                    api_url_gocorp +
                    "trip-by-id?mu_username=" + localStorage.getItem('nik') +
                    "&mu_token=" + localStorage.getItem('token') +
                    "&gct_id="+id,
                    headers
                )
                .then((response) => {
                    var data = response.data.data[0];
                    this.data_trip.desc_trip = data.gct_descp_trip;
                    this.data_trip.total_trip = data.gct_total_trip;
                    this.data_trip.total_penumpang = data.gct_total_penumpang;
                    this.data_trip.start_date = data.gct_start_date;
                    this.data_trip.end_date = data.gct_end_date;
                    this.data_trip.id = id;
                    this.data_trip.mcc_id = data.mcc_id;

                    // console.log(data)
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
                })
                .catch((error) => {
                    console.log("GoCorp.vue (error) :: ", error);
                    alert("Gagal mengambil data! Silahkan coba lagi.");
                    this.route('home-gocorp');
                    return;
                });
            }
            catch (e) {
                console.error(e);
                alert("Error: koneksi gagal");
                this.dialog.loading = false;
                this.route('home-gocorp');
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
        this.change = this.$route.query.change;
        if(this.change != null && this.change != 'cancel'){
            this.route('home-gocorp');
            
            if(this.$route.query.id == null || this.$route.query.id == ''){
                this.route('home-gocorp')
                return;
            }
        }

        else{
            this.title = this.change == 'reschedule' ? 'Reschedule Trip' : (this.change == 'cancel' ? 'Cancel Trip' : 'Tambah Trip');
        }
        this.cost_center = localStorage.getItem('cost_center');
        this.manager = localStorage.getItem('manager');
        this.data_trip.nik = localStorage.getItem('nik');
        // this.data_trip.phone = localStorage.getItem('phone');
        // this.data_trip.email = localStorage.getItem('email');
        if(this.change == 'reschedule' || this.change == 'cancel'){
            this.getData(this.$route.query.id);
        }
        
        this.data_trip.nama = String(localStorage.getItem('nama')).toUpperCase();
        this.getCostCenter();
    // console.log()
    }
}
</script>

<style scoped>
    .hide-scrollbar :deep(::-webkit-scrollbar){
        width: 1vh;
    }

    .hide-scrollbar :deep(::-webkit-scrollbar-track){
        /* background: #e6e6e6; */
        margin:0.5vh;
        
    }

    .hide-scrollbar :deep(::-webkit-scrollbar-thumb){
        background: #5c5b5b;
        border-radius: 1vh;
        background-clip: padding-box;
    }
    .cursor :deep(input) {
    cursor: pointer;
    }
    .outline-red :deep(fieldset) {
        border: 2px solid rgb(250, 87, 87);
    }
    .hint-red  :deep(.v-messages__message){
        color: red;
    }
</style>
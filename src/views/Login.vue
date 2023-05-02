<template>
    <body>
        <!-- START LOADING DIALOG -->
        <v-dialog
            v-model="loading"
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
        <div class="login-block pa-8 mt-16">
            <v-col>
                <v-row class="center">
                    <div>
                        <v-row class="mb-10">
                            <v-col class="pa-0 ma-0">
                                <v-img src="../assets/gli-logo-no-bg.png" max-height="120" max-width="120" class="mr-7" contain></v-img>
                            </v-col>
                            <v-col class="pa-0 ma-0">
                                <h1 style="font-size: 25px; color: #073e5d;">Aplikasi<br/>Transportasi<br/>Online</h1>
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <form @submit.prevent="submit">
                    <v-row>
                        <v-text-field
                            background-color="rgba(128, 128, 128, 0.4)"
                            label="NIK"
                            style="border-radius: 5px;"
                            filled
                            v-model="login.login"
                            dense
                            rounded
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            background-color="rgba(128, 128, 128, 0.4)" 
                            style="border-radius: 5px;"
                            rounded
                            class=""
                            v-model="login.password"
                            type="password"
                            label="PIN"
                            filled
                            dense
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <button type="submit" class="mt-4" v-on:click="submit">Login</button>
                    </v-row>
                </form>
            </v-col>
        </div>
    </body>
</template>

<script>
    import axios from "axios";
    import sha256 from "js-sha256";

    export default {
    name: "Login",

    components: {},

    data() {
        return {
            user: null,
            nama_jabatan: null,
            login: {
                login: "",
                password: "",
            },
            loading: false,
        };
    },

    created() {
        // this.user = this.$store.state.u;
    },
    computed:{
    },

    mounted() {
        // console.log("name", this.$route.name);
        // localStorage.setItem("token", "token");
        // localStorage.setItem("user_fname", "QA");
        // localStorage.setItem("user_lname", "A");
        // localStorage.setItem("nik", "1020001008QA");
        
        if (localStorage.nama) {
                this.$router.push({ name: "home" }).catch((error) => {
                    console.log(error);
                });
        }
    },

    methods: {
        async submit(e){
            await this.onSubmit(e);
            if(!String(localStorage.getItem('jabatan')).toLowerCase().includes('intern') && localStorage.getItem('jabatan')){
                setTimeout(function(){ location.reload() }, 500);
            }
        },
        async onSubmit(event) {
            event.preventDefault();
            this.loading = true;
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
            app: "aplikasi-transportasi-online",
            };
            const body = {
            username: this.login.login,
            password: this.login.password,
            // password: sha256(this.login.password) ,
            app: 'aplikasi-transportasi-online'
            };
    
            await axios
            // .post("http://10.4.1.135:5002/sso/login", body, headers)
            .post("https://development.gli.id:5002/api/sso/login-v5", body, headers)
            // ({method: 'post', url: 'https://development.gli.id:5002/api/sso/login-v4', headers: headers, params: body})
            .then((response) => {
                console.log(response)
                if (response.data.data.length != 0) {
                    // let basic_role = response.data.data[0].basic_role;
                    // const checkApplicationRole = (obj) =>
                    // obj.ma_id === "ALFAGIFT_WELCOME_OFFER";

                    // if (basic_role.some(checkApplicationRole)) {
                        localStorage.setItem('jabatan', response.data.data[0].nama_jabatan);
                        if(!String(localStorage.getItem('jabatan')).toLowerCase().includes('intern')){
                            localStorage.setItem("nik", response.data.data[0].nik);
                            localStorage.setItem("token", response.data.data[0].token);
                            localStorage.setItem("nama", response.data.data[0].nama);
                            localStorage.setItem("email", response.data.data[0].email);
                            localStorage.setItem("cost_center", response.data.data[0].nama_cost_center);
                            localStorage.setItem("phone", response.data.data[0].phone);    
                            this.$store.commit('setUser', localStorage.getItem('nama'));
                            this.$store.commit('setNik', localStorage.getItem('nik'));
                            localStorage.setItem("manager", response.data.data[0].is_manager);
                            this.$router.push({ name: "home" }).catch((error) => {
                                console.log(error);
                            });
                        }
                        else{
                            alert('Intern harap melakukan pendaftaran secara manual ke GA!')
                            localStorage.removeItem('jabatan');
                            return;
                        }
                }
                else {
                    alert("Username/ Password incorrect !");
                    this.login.login = null;
                    this.login.password = null;
                }
            })
            .catch((error) => {
                console.log("Login.vue (error) :: ", error);
                alert("Aplikasi error!");
            });
            this.loading = false;
            // location.reload()
        }
    },
    };
</script>

<style scoped>
    body {
        background: url("../assets/bg-login-parking.png") no-repeat fixed center center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-block {
        width: 500px;
        padding: 20px;
        background: 1E1E1E;
        margin: 0 auto;
    }

    .login-block h1 {
        text-align: left;
        color: #f26d3b;
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 20px;
    }


    .login-block button {
        width: 100%;
        height: 40px;
        background: #f26d3b;
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #f26d3b;
        height: 50px;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        outline: none;
        cursor: pointer;
    }

    .login-block button:hover {
        background: #f26d3b;
        opacity: 0.9;
    }

</style>
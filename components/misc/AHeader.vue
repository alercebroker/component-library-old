<template>
    <v-app-bar app dark dense>
        <a :to="{'path':'/'}">
            <v-img
                :src="_logo"
                max-width="40px"
                class="mr-4"
            ></v-img>
        </a>
        <v-toolbar-title class="white--text mr-4"> {{ _title }} </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-toolbar-items v-if="items">
            <v-btn
            class="pl-5 pr-5 d-none d-md-flex text-capitalize"
            target="_blank"
            v-for="item in items"
            :key="item.to"
            :href="item.to"
            text>
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
    data() {
        return {
            logo_white: "https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png",
            logo_blue: "https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png",
            logo_all_white: "https://alerce-static.s3.amazonaws.com/logos/fullAlerceWHITE.png"
        }
    },
    props: {
        "title": String,
        "logo": String,
        "items": Array,
    },
    computed: {
        _title() {
            return this.title ? this.title : "Title";
        },
        _logo() {
            switch(this.logo) {
                case "blue":
                    return this.logo_blue;
                case "white":
                    return this.logo_white;
                case "allwhite":
                    return this.logo_all_white;
                default:
                    return this.logo_white;
                }
        }
    },
    mounted(){
        
    }
};
</script>
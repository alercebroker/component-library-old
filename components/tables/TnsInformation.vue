<template>
    <v-flex>
        <v-data-table
            :headers="headers"
            :items="values"
            :mobile-breakpoint="250"
            dense
            hide-default-footer
        ></v-data-table>
        <a-footer-tns :tns_id="name"></a-footer-tns>
    </v-flex>
</template>
<script>
import AFooterTns from '~/components/misc/AFooterTns.vue'
export default {
    props: {
        type: String,
        name: String,
        redshift: Number
    },
    components: {
        AFooterTns
    },
    data() {
        return {
            headers: [
                { text: "Type", value: "type", sortable: false, align: "center" },
                { text: "Name", value: "name", sortable: false, align: "center" },
                { text: "Redshift", value: "redshift", sortable: false, align: "center" }
            ],
        }
    },
    computed: {
        values() {
            return [
                {
                    type: this.type ? this.type : "-",
                    name: this.name ? this.name : "-" ,
                    redshift: this.redshift? this.redshift : "-"
                }
            ]
        }
    }
}
</script>
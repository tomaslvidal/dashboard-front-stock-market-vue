export default {
    methods:{
        setInitPagination(){
            this.$store.dispatch('Step2/PAGE_PAGINATION', 1);
        }
    }
}
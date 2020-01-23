export default {
    methods: {
        async toItem(id_rate){
            await this.$store.dispatch('Step2/CLEAR_FILTERS');

            let rate = this.$store.getters['Step2/rates'].map((item, index) => ({...item, index})).filter((item, index) => item.numero == id_rate)[0];
            
            let page = Math.ceil((rate.index + 1) / this.$store.state.Step2.pagination.perPage);

            if(this.$store.state.Step2.pagination.currentPage === page){
                this.$root.$emit('scrollIntoView', rate.numero);
            }
            else{
                this.$store.dispatch('Step2/PAGE_PAGINATION', page);

                this.$store.dispatch('Step2/SET_SCROLL_INTO_VIEW', rate.numero);
            }
        },
    }
};
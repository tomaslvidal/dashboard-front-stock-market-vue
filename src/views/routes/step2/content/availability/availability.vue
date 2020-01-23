<template>
    <div>
        <air-grid />

        <b-pagination
            v-if="items.length"
            v-model="pagination.currentPage"
            :limit="pagination.limit"
            :size="pagination.size"
            :total-rows="items.length"
            :per-page="pagination.perPage"
            align="fill"
        />

        <div 
            v-if="items.length"
        >
            <keep-alive
                v-for="(item, key) in clusters_for_page"
                :key="item.numero"
            >
                <cluster
                    :key="item.numero"
                    :index="key"
                    :page="pagination.currentPage"
                    :item="item"
                />
            </keep-alive>
        </div>

        <b-pagination
            v-if="items.length"
            v-model="pagination.currentPage"
            :limit="pagination.limit"
            :size="pagination.size"
            :total-rows="items.length"
            :per-page="pagination.perPage"
            align="fill"
        />
        <not-found
            v-if="!this.$store.getters['Step2/rates'].length"
        />
    </div>
</template>

<script>
    import { AirGrid, Cluster, NotFound } from './components';

    import { BPagination } from 'bootstrap-vue'

    export default {
        components: {
            Cluster,
            AirGrid,
            NotFound,
            BPagination
        },
        computed:{
            pagination(){
                return this.$store.state.Step2.pagination;
            },
            clusters_for_page(){
                return this.items.slice(this.pagination.start, this.pagination.end);
            },
            items(){
                return this.$store.getters['Step2/rates'];
            },
        },
        watch:{
            '$store.state.Step2.request_made.availability': function(){
                if(!this.$store.state.Step2.request_made.availability){
                    this.pagination.currentPage = 1;
                }
            },
            'pagination.currentPage': function(){
                this.pagination.start = (this.pagination.currentPage * this.pagination.perPage) - this.pagination.perPage;

                this.pagination.end = this.pagination.currentPage * this.pagination.perPage;
            },
        },
        methods:{
            updateCurrentPage(){
                if(this.items.length>0){
                    let qty_pages = Math.ceil(this.items.length / this.pagination.perPage);

                    if(this.pagination.currentPage > qty_pages){
                        this.pagination.currentPage = qty_pages;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
import { getHour, totalDuration } from '@/methods';

export default {
    methods:{
        getHour(date){
            return getHour(date);
        },
        totalDuration(hour_in_minutes){
            return totalDuration(hour_in_minutes);
        },
    },
    computed:{
        total_duration(){
            return this.totalDuration(this.item.duracionTotal);
        },
    }
}
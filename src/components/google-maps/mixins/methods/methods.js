import { officeSchedule } from '@/methods';

export default {
    methods:{
        generateFrontInfoWindow(self){
            let el = document.createElement('div');

            el.className = "content";

            let p1 = document.createElement('div');

            p1.className = "d-flex justify-content-center align-items-center";

            let p2 = document.createElement('div');

            p2.className = "row w-100";

            let p21 = document.createElement('div');

            p21.className = "col-12 title px-4 py-2 mb-2 rounded border border-left-0 border-right-0";

            let p211 = document.createElement('div');

            p211.className = "row pt-1";

            p211.innerHTML = `
                <div class="col-6 d-flex justify-content-center align-items-center"> 
                    <img style="width: 80px" src="#" alt="rentadora" class="img-fluid">
                </div>
            `;

            let address = document.createElement('div');

            address.className = "col-12 d-flex justify-content-center align-items-center text-center";

            address.innerHTML = `
                <span style="color: #6c757d;">${self.marker.rentalLocation.address.addressDetails.line1} - ${self.marker.rentalLocation.address.locationDetails.name}</span>
            `;

            let p211a = document.createElement('div');

            p211a.className = "col-6 d-flex justify-content-center align-items-center office_select_d";

            let button = document.createElement('button');

            button.className= "btn btn-sm btn-secondary office_select";

            button.textContent="Seleccionar";

            button.addEventListener('click', function(){
                // eslint-disable-next-line
                self.$emit('waitSelection', self.marker);
            });

            let p211b = document.createElement('div');

            p211b.className = "info col-12 text-center";

            let schedules = officeSchedule(self.marker);

            let schdules_html = '';

            for(let i=0; i<schedules.length; i++){
                if(typeof schedules[i] !== "undefined"){
                    schdules_html += `<span>- ${schedules[i]}</span>`;
                }
            }

            p211b.innerHTML = `
                <span>
                    <div class="d_schedule pl-1 d-flex flex-column" style="color:#6c757d">
                        ${schdules_html}
                    </div>
                </span>
            `;

            p211a.appendChild(button); p211.appendChild(p211a); p211.appendChild(address); p21.appendChild(p211); p2.appendChild(p21); p2.appendChild(p211b); p1.appendChild(p2); el.appendChild(p1);

            return el;
        }
    }
}
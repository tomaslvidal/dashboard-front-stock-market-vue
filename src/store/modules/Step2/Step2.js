import getters from './getters';

import actions from './actions';

import mutations from './mutations';

// import { availability } from '@/test/modules/default_state';

// const getDefaultState = () => (availability);

let ajax = {
    items: {},
    agency_data: {},
};

const getDefaultState = () => ({
    scroll_into_view: {
        id: ''
    },
    config: {
        motor: '',
    },
    motor_types: [
        {
            name: 'b2b',
            search_additional: {
                agencia_id: ''
            }
        },
        {
            name: 'b2c',
            search_additional: {}
        }
    ],
    search: {
        type_search: 1,
        flex: false,
        passenger: {
            adults: 1,
            children: 0,
            babies: 0
        },
        flights: [
            {
                origin: null,
                destination: null,
                date: ''
            }
        ],
        without_stopovers: '',
        cabin: '0',
        qty_flights: 1
    },
    data: {
        rates: [],
        b2b: {
            agencia: {},
            usuario: {}
        }
    },
    request_made: {
        availability: false
    },
    filter: {
        price: {
            since: {
                value: ''
            },
            until: {
                value: ''
            }
        },
        airline: {
            items: [],
            selected: [],
            state: false
        },
        stopover: {
            arrival: {
                items: [],
                selected: []
            },
            departure: {
                items: [],
                selected: []
            },
            state: false
        },
        airport: {
            arrival: {
                egress: {
                    items: [],
                    selected: []
                },
                finish: {
                    items: [],
                    selected: []
                }
            },
            departure: {
                egress: {
                    items: [],
                    selected: []
                },
                finish: {
                    items: [],
                    selected: []
                }
            },
            state: false
        },
        schedule: {
            arrival: {
                egress: {
                    items: [],
                    selected: []
                },
                finish: {
                    items: [],
                    selected: []
                }
            },
            departure: {
                egress: {
                    items: [],
                    selected: []
                },
                finish: {
                    items: [],
                    selected: []
                }
            },
            state: false
        }
    },
    sort: {
        price: {
            selected: -1,
            options: [
                { text: 'Mayor precio', value: 1 },
                { text: 'Menor precio', value: -1 }
            ]
        },
        stopovers: {
            selected: 0,
            options: [
                { text: 'Mayor escala', value: 1 },
                { text: 'Menor escala', value: -1 }
            ]
        },
        duration: {
            selected: 0,
            options: [
                { text: 'Mayor duración', value: 1 },
                { text: 'Menor duración', value: -1 }
            ]
        }
    },
    ajax: {
        availability: {
            progress: {
                items: 0,
            }
        }
    },
    pagination: {
        limit: 25,
        size: "sm",
        start: 0,
        perPage: 5,
        end: 5,
        currentPage: 1
    },
    backup: {
        flight: {}
    }
});

const Step2 = {
    namespaced: true,
    state: getDefaultState(),
    getters,
    mutations,
    actions
}
 
export { getDefaultState };

export default Step2;
<template>
    <div>
        <div class="row form_datos">
            <div class="form-group col-12 col-sm-6">
                <label for="">Nombre *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="nombre"
                    :vid="`nombre${_uid}`"
                >
                    <input
                        v-model="form.name"
                        type="text"
                        class="form-control form-control-sm required"
                        placeholder="Escribir nombre"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Apellido *</label>

                <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="apellido"
                    :vid="`apellido${_uid}`"
                >
                    <input
                        v-model="form.last_name"
                        type="text"
                        class="form-control form-control-sm required"
                        placeholder="Escribir apellido"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Teléfono *</label>
                
                <div class="form-row">
                    <div class="form-group col-12 col-sm-3">
                        <validation-provider
                            :rules="{ required: true, max: 5, numeric: true }"
                            v-slot="{ errors }"
                            name="código de area"
                            :vid="`area_code${_uid}`"
                        >
                            <input
                                v-model="form.area_code"
                                type="text"
                                class="form-control form-control-sm required"
                                placeholder="Cód. Area"
                            >

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="form-group col-12 col-sm-9">
                        <validation-provider
                            :rules="{ required: true, numeric: true }"
                            v-slot="{ errors }"
                            name="número de teléfono"
                            :vid="`phone${_uid}`"
                        >
                            <input
                                v-model="form.phone"
                                type="text"
                                class="form-control form-control-sm required"
                                placeholder="Escribir número de teléfono"
                            >

                            <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                </div>
            </div>

            <div class="form-group col-12 col-sm-6">
                <label for="">Email *</label>

                <validation-provider
                    :rules="{ required: true, email: true }"
                    v-slot="{ errors }"
                    name="email"
                    :vid="`email${_uid}`"
                >
                    <input
                        v-model="form.email"
                        type="text"
                        class="form-control form-control-sm required"
                        placeholder="Escribir email"
                    >

                    <span class="invalid-feedback d-flex">{{ errors[0] }}</span>
                </validation-provider>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            form: {
                default: () => new Object(),
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
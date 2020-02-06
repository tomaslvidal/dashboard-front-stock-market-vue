<template>
    <div class="container-fluid">
        <div class="row root">
            <slot />

            <scrollarrow />
        </div>
    </div>
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';

    // import { fas } from '@fortawesome/free-solid-svg-icons';

    // import { fab } from '@fortawesome/free-brands-svg-icons';

    import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';

    import { Scrollarrow } from '@/components';

    library.add(faHandPointUp);

    export default{
        components: {
            Scrollarrow
        }
    }
</script>
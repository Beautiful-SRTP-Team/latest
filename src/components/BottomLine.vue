<template>
    <div class="bottom">
        <PaiHang/>
        <QianDao/>
        <Tongji/>
        <CuoTi/>

    </div>
</template>

<script>
    import PaiHang from './PaiHang.vue'
    import QianDao from './QianDao.vue'
    import Tongji from './TongJi.vue'
    import CuoTi from './CuoTi.vue'

    export default {
        name: 'BottomLine',

        components: {
            PaiHang,
            QianDao,
            Tongji,
            CuoTi
        }

    }
</script>

<style scoped>
    .bottom{
    height: 20vh;
    }
</style>

<template>
    <div class="div">
        <ul class="ul nav nav-pills">
            <router-link active-class="active" tag="li" to="/" ><a class="a">Ürün İşlemleri </a></router-link>
        </ul>
        <ul class="ul nav nav-pills">
            <router-link active-class="active" tag="li" to="/user" ><a class="a">Ürün Listesi</a></router-link>
        </ul>
        <ul class="ul nav nav-pills">
            <router-link active-class="active" tag="li" to="/ProductOut" ><a class="a">Ürün Çıkışı</a></router-link>
        </ul>
    </div>
</template>
<style scoped>
.div{
    width: 100%;
    height: 40px;
    background-color: rgb(42, 21, 156);
    display: flex;
}
.ul{
    padding-top: 5px;
    margin-left: 30px;
    text-align: center;
    text-decoration: white;
}
.a{
    color:white;
}
</style>
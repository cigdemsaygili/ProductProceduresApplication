<template>
    <div class="container">
    <div class="row">
        <div class="col-6 offset-3 pt-3 card mt-5 shadow">
            <div class="card-body">
                <h3>Ürün İşlemleri</h3>
                <hr>
                <div class="form-group">
                    <label>Ürün Adı</label>
                    <input type="text" class="form-control" placeholder="Ürün adını giriniz.." v-model="$store.state.productInfo.name">
                </div>
                <div class="form-group">
                    <label>Adet</label>
                    <input type="text" class="form-control" placeholder="Ürün adetini giriniz.." v-model="$store.state.productInfo.count">
                </div>
                <div class="form-group">
                    <label>Fiyat</label>
                    <input type="text" class="form-control" placeholder="Ürün fiyatı giriniz.." v-model="$store.state.productInfo.price">
                </div>
                <div class="form-group">
                    <label>Açıklama</label>
                    <textarea cols="30" rows="5" placeholder="Ürüne ait bir açıklama giriniz..."
                              class="form-control" v-model="$store.state.productInfo.description"></textarea>
                </div>
                <hr>
                <button @click="writeUserData" class="btn btn-primary">Kaydet</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getDatabase, ref, push, set} from "firebase/database";

export default {
    data:function(){
        return{
            sayi:null,
        }
    },
    computed:{
        value:{
            get(){
                return this.$store.getters.getValue;
            },
            set(value){
                return this.$store.dispatch("setValueData",value);
            }
        }
    },
    methods:{
        writeUserData(){
            const db = getDatabase();
            const postListRef = ref(db, 'products');
            const newPostRef = push(postListRef);
            set(newPostRef, {
                name:this.$store.state.productInfo.name,
                price:this.$store.state.productInfo.price,
                count:this.$store.state.productInfo.count,
                description:this.$store.state.productInfo.description,
                id:newPostRef.key
            });
            this.$store.state.productInfo={}
        }
    }
}
</script>
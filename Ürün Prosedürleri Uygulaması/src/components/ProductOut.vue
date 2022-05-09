<template>
    <div class="container">
        <div class="container">
    <div class="row">
        <div class="col-6 offset-3 pt-3 card mt-5 shadow">
            <div class="card-body">
                <h3>Ürün Çıkışı</h3>
                <hr>
                <div class="form-group">
                    <label>Ürün Adı</label>
                    <select class="form-control" v-model="selectedProduct" @change="productSelected(selectedProduct)">
                        <option v-for="item in itemList" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="card mb-2 border border-danger">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 text-center" v-if="show">
                                <div class="mb-3">
                                    <span class="badge badge-info">Stok : {{product[0].count}}</span>
                                    <span class="badge badge-primary">Fiyat : {{product[0].price}}</span>
                                </div>
                                <p class="border border-warning p-2 text-secondary">{{product[0].description}} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Adet</label>
                    <input type="text" class="form-control" placeholder="Ürün adetini giriniz.." v-model="count">
                </div>
                <hr>
                <button class="btn btn-primary" @click="productOut">Kaydet</button>
            </div>
        </div>
    </div>
</div>
<nav class="navbar fixed-bottom  navbar-light" style="background-color: #e3f2fd;">
    <span class="navbar-text mr-auto">
        <strong>Bakiye Bilgileri</strong> 
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Alış Tutarı : </strong>
        <span class="badge badge-danger">34,56</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Satış Tutarı : </strong>
        <span class="badge badge-success">34,56</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0">
        <strong>Bakiye : </strong>
        <span class="badge badge-primary">34,56</span>
    </span>
</nav>
<div class="loading">
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
</div>
    </div>
</template>

<script>
import { getDatabase, ref, push,set,child, get, onValue, onChildAdded ,onChildRemoved, onChildChanged, update} from "firebase/database";
export default {
    data:function(){
        return{
            itemList:[],
            selectedProduct:null,
            product:[],
            productTwo:{},
            show:false,
            count:""
        }
    },
    methods:{
        productSelected(selectedProduct){
            console.log(this.selectedProduct)
            this.product = this.itemList.filter( element => {
                // console.log(element)
                return element.id == this.selectedProduct
            })
            // console.log( JSON.parse(JSON.stringify(this.product)))
            this.show = true
            // console.log(this.product[0].count)
        },
        productOut(){
            let price = this.product[0].price
            let name = this.product[0].name
            let description =this.product[0].description
            let id = this.product[0].id
            let count = this.product[0].count

            if(parseInt(this.count) > parseInt(count)){
                alert("Yeterince ürün yok")
            }else if(parseInt(this.count) ==parseInt(count)){
                const postData = {
                    name:name,
                    description:description,
                    price:price,
                    id:id,
                    count:"0"
                };
                const db = getDatabase();
                const newPostKey = push(child(ref(db), 'products')).key;
                const updates={}
                updates['/products/'+id+'/']= postData
                return update(ref(db),updates)
            }else {
                const postData = {
                    name:name,
                    description:description,
                    price:price,
                    id:id,
                    count:(parseInt(count)-parseInt(this.count)).toString()
                };
                const db = getDatabase();
                const newPostKey = push(child(ref(db), 'products')).key;
                const updates={}
                updates['/products/'+id+'/']= postData
                return update(ref(db),updates)
            }
        }

    },  

    created(){
        const dbRef = ref(getDatabase());
        get(child(dbRef,'products')).then((snapshot) => {
            if(snapshot.val()!=null){
                this.show=true                   
            }else{
                this.show=false
            }
        })
            
        const db = getDatabase()
        const productRef = ref(db, 'products')
        onChildAdded(productRef,(obj) => {
            let  data=JSON.parse(JSON.stringify(obj))
            this.itemList.push(data)
  
        })
        onChildRemoved(productRef,(data) => {
            this.itemList.pop(data);
            console.log("child")
        })

    },
}
</script>
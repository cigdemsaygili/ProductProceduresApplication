<template>
    <div class="container">
        <div class="container">
        <div class="row">
            <div class="col-12 mb-5 card mt-5 shadow">
                <div class="card-body">
                    <h3>Ürün Listesi</h3>
                    <hr>
                    
                    <table v-if="show" class="table table-hover table-striped table-bordered">
                        <thead >
                            <th>id</th>
                            <th>Ürün Adı</th>
                            <th>Adet</th>
                            <th>Fiyat</th>
                            <th>Açıklama</th>
                        </thead>
                        <tbody>
                        <tr v-for="item in itemList">
                            <td class="align-middle text-center"><span class="badge badge-info"> {{item.val().id}} </span></td>
                            <td class="align-middle text-center"> {{item.val().name}}</td>
                            <td class="align-middle text-center"> {{item.val().count}} </td>
                            <td style="width: 120px;"> {{item.val().price}}</td>
                            <td class="align-middle"> {{item.val().description}}</td>
                        </tr>
                        
                        </tbody>
                    </table>
                    <div v-else class="alert alert-warning" >
                        <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
                        <br>
                        <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz
                        </small>
                        
                    </div>
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
        <span class="badge badge-danger">{{count}}</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0 mr-3">
        <strong>Satış Tutarı : </strong>
        <span class="badge badge-success">0</span>
    </span>
    <span class="navbar-text navbar-nav my-2 my-lg-0">
        <strong>Bakiye : </strong>
        <span class="badge badge-primary">-{{count}}</span>
    </span>
</nav>
    </div>
</template>
<script>
import { getDatabase, ref, push,set,child, get, onValue, onChildAdded ,onChildRemoved, onChildChanged} from "firebase/database";

export default {
    data:function(){
        return{
            show:false,
            count:0,
            sey:"count",
            itemList:[]   
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
        onChildAdded(productRef,(data) => {
            this.itemList.push(data)
            this.count += parseInt( data.val().price ) * parseInt(data.val().count)
        })
        onChildRemoved(productRef,(data) => {
            this.itemList.pop(data);
            console.log("child")
        })

    },
    

}
</script>
(function(){
    var withdrawVue = new Vue({
        el:'#withdrawVue',
        data:{
            service:null,
            amount:null,
            status:null
        },
        methods:{
            withdraw: function() {
                let self = this;
                let payload = {
                    recipient: self.service,
                    amount: self.amount
                };
                // axios.get('http://localhost:3300')
                axios.post('http://localhost:3300/api/withdraw',payload)
                .then(function(res){
                    self.status = res.data.status
                    alert(res.data.status);
                    self.service= null,
                    self.amount= null
                })
                .catch(function(err){
                    alert(err);
                });
            }
        }
    })
})();
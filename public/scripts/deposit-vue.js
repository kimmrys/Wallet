(function(){
    var depositVue = new Vue({
        el:'#depositVue',
        data:{
            service:null,
            amount:null,
            status:null
        },
        methods:{
            deposit: function() {
                let self = this;
                let payload = {
                    recipient: self.service,
                    amount: self.amount
                };
                // axios.get('http://localhost:3300')
                axios.post('http://localhost:3300/api/deposit',payload)
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
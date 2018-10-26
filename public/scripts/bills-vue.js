(function(){
    var billsVue = new Vue({
        el:'#billsVue',
        data:{
            service: null,
            amount: null,
            status: null
        },
        methods: {
            pay: function() {
                let self = this;
                let payload = {
                    recipient: self.service,
                    amount: self.amount
                };
                axios.post('http://localhost:3300/api/bills', payload)
                .then(function(res){
                    self.status = res.data.status
                    alert(res.data.status);
                    self.account_number = null;
                    self.amount = null;
                })
                .catch(function(err){
                    self.status = "Error"
                });
            },
        }
    })
})();
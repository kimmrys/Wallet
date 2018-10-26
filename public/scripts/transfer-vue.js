(function(){
    var fundtransferVue = new Vue({
        el:'#fundtransferVue',
        data:{
            account_number: null,
            amount: null,
            status: null
        },
        methods: {
            sendFunds: function() {
                let self = this;
                let payload = {
                    recipient: self.account_number,
                    amount: self.amount
                };
                axios.post('http://localhost:3300/api/transfer', payload)
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
(function(){
    var accountVue = new Vue({
        el:'#accountVue',
        data:{
            account_number:null,
            account_name:null,
            balance:null
        },
        created: function() {
            let self = this;
            // axios.get('http://localhost:3300')
            axios.post('http://localhost:3300/api')
            .then(function(res){
                let data = res.data;
                self.account_number = data.account_number;
                self.account_name = data.account_name;
                self.balance = data.balance;
            })
            .catch(function(err){
                self.account_number = "Error";
                self.account_name = "Error";
                self.balance = "Error";
            });
        }
    })
})();
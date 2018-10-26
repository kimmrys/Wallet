(function(){
    var historyVue = new Vue({
        el:'#historyVue',
        data:{
            history:[]
        },
        created: function() {
            let self = this;
            axios.post('http://localhost:3300/api/history')
            .then(function(res){
                self.history = res.data 
            })
            .catch(function(err){
                self.history = [];
            });
        }
    })
})();
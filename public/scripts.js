//função para evitar de entrar strings no valor
/*const input = document.querySelector("input[name=price]")
input.addEventListener('keydown',function(e){

    setTimeout(function(){
        let {value} = e.target

        value = value.replace(/\D/g,"")

        //para converter para real
        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)

        e.target.value = value
    },1)

})
*/

//forma dinamica de fazer a formatação da moeda
const Mask = {
    apply(input, func){
        setTimeout(function(){
            input.value = Mask[func](input.value)
        },1)

    },
    formatBRL(value){
        value = value.replace(/\D/g,"")

        //para converter para real
       return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}
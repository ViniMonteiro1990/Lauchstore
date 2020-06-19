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

/*para pegar os arquivos no input*/

const PhotosUpload = {
    preview:  document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target

        if(PhotosUpload.hasLimit(event)) return
        
        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }
            reader.readAsDataURL(file)
        })

        PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const {uploadLimit} = PhotosUpload
        const {files: fileList} = event.target

        if (fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }
        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },   
    getContainer(image){
        const div = document.createElement('div')

        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML= "close"
        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        photoDiv.remove()
    }
}
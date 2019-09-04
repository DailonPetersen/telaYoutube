const nomeCanal = 'pewdiepie'
const acessoKey = 'AIzaSyC7loU7x0OvSQAk3H9_vu7bG4CGYgZY_og'
var uploadKey

$(document).ready(function(){
    $.get('https://www.googleapis.com/youtube/v3/channels', {
        part:'contentDetails',
        forUsername: nomeCanal,
        key: acessoKey},
        function(data) {
            uploadKey = data.items[0].contentDetails.relatedPlaylists.uploads
            pegarVideos(uploadKey)
        }
    )
    
    function pegarVideos(id) {
        $.get("https://www.googleapis.com/youtube/v3/playlistItems",{
            part: 'snippet',
            maxResults: 12,
            playlistId: id,
            key: acessoKey},
        function(data){
            var imagem
            var arquivo

            $.each(data.items, function(i, item){
                titulo = item.snippet.title
                publicadoEm = formartar(item.snippet.publishedAt)
                imagem = item.snippet.thumbnails.medium.url 
            videoId = item.snippet.resourceId.videoId          
                arquivo = '<li class="principal"><a class="fancybox-media" href="https://www.youtube.com/watch?v='+videoId+'">div class=foto><img src="'+imagem+'"/><div class="legenda"><h5>'+titulo+'<h5><p>'+publicadoEm+'</p></div></div></a><</li>'
                $('div#janela ul').append(arquivo)
            })
        })
    }
})

function formartar(data){
    return data.substr(8,2) + '/' +data.substr(5,2)+'/'+data.substr(0,4)
}
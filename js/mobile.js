var nomeCanal = 'backtotriangle';
var upload_id;

$(document).ready(function() {
    $.get("https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: nomeCanal,
            key: 'AIzaSyB49WfTkgfK2menTbmVCkLG0f9cYWQ9XKU'},
            function(data) {
                upload_id = data.items[0].contentDetails.relatedPlaylists.uploads;
                pegarVideos(upload_id);
            }
    )
    
    function pegarVideos(id) {
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
                    part:'snippet',
                    maxResults: 12,
                    playlistId: id,
                    key: 'AIzaSyB49WfTkgfK2menTbmVCkLG0f9cYWQ9XKU'},
            function(data) {
                var imagem;
                var arquivo;
                console.log(data);
                $.each(data.items, function(i, item) {
                    videoId     = item.snippet.resourceId.videoId;
                    arquivo = '<li><iframe src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe></li>';
                    $('div#janela ul').append(arquivo);
                });
            }
        )
    }
});
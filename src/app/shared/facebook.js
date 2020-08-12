
app.service('facebook', function($http) {

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1741296432772841',
            xfbml      : true,
            version    : 'v2.6'
        })
    }

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {return}
        js = d.createElement(s); js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    this.share = function(post) {

        $http({
            method: 'POST',
            url: 'http://destroctor51.pythonanywhere.com',
            data: {
                image: post.image.split(',')[1]
            }
        })
            .then(function(image) {
                FB.ui({
                    method: 'feed',
                    picture: image.data.url,
                    link: post.url
                })
            })
    }
})

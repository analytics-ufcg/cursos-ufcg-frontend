
app.service('arrayUtils', function() {
    this.equals = function(a, b) {
        if (a === b) return true
        if (a == null || b == null) return false
        if (a.length != b.length) return false

        for (var i = 0; i < a.length; i++)
            if (a[i] !== b[i]) return false
        return true
    }
})

app.service('functionUtils', function() {

    function slice(array, left, right) {
        return Array.prototype.slice.call(array, left, right)
    }

    this.partial = function(func) {
        var base_args = slice(arguments, 1)
        return function() {
            var other_args = slice(arguments)
            var args = base_args.concat(other_args)
            return func.apply(this, args)
        }
    }
})

app.service('stringUtils', function() {
    this.hashCode = function(string){
        var hash = 0;
        if(string.length == 0) return hash;
        for(var i = 0; i < string.length; i++) {
            var char = string.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        } return hash;
    }

    this.normaliza = function(string) {
        var regex = [
            {re: /[\xC0-\xC6]/g, ch: 'A'},
            {re: /[\xE0-\xE6]/g, ch: 'a'},
            {re: /[\xC8-\xCB]/g, ch: 'E'},
            {re: /[\xE8-\xEB]/g, ch: 'e'},
            {re: /[\xCC-\xCF]/g, ch: 'I'},
            {re: /[\xEC-\xEF]/g, ch: 'i'},
            {re: /[\xD2-\xD6]/g, ch: 'O'},
            {re: /[\xF2-\xF6]/g, ch: 'o'},
            {re: /[\xD9-\xDC]/g, ch: 'U'},
            {re: /[\xF9-\xFC]/g, ch: 'u'},
            {re: /[\xC7]/g, ch: 'C'},
            {re: /[\xE7]/g, ch: 'c'},
            {re: /[\xD1]/g, ch: 'N'},
            {re: /[\xF1]/g, ch: 'n'},
            {re: / +/g, ch: ' '}
        ]

        for (var i = 0, len = regex.length; i < len; i++)
            string = string.replace(regex[i].re, regex[i].ch)

        return string.toLowerCase()
    }
})

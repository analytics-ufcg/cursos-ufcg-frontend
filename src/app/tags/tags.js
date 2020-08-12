
app.service('tags', function () {

    var tags = {};

    var valuesTag = new Set();
    var filters = ["", "", ""];
    var barFilters = {};
    var numPosts = 0;

    const TEMA = 0;
    const DATA = 1;
    const AUTOR = 2;

    tags.injectBarFilters = function (bFilters) {
        barFilters = bFilters;
    }

    tags.setThemeFilter = function(tag) {
        if (tags.isAlreadyTagged(tag, TEMA)) {
            tags.cleanFilters();
        } else {
            tags.cleanFilters();
            filters[TEMA] = tag;
        }
    };

    tags.filterByTheme = function (post) {
        for (var i = 0; i < post.tags["Tema"].length; i++)
            if (post.tags["Tema"][i] ==  filters[TEMA]) {
                numPosts++;
                return true;
            }
    }

    tags.setAuthorFilter = function(tag) {
        if (tags.isAlreadyTagged(tag, AUTOR)) {
            tags.cleanFilters();
        } else {
            tags.cleanFilters();
            filters[AUTOR] = tag;
        }
    }

    tags.filterByAuthor = function (post) {
        for (var i = 0; i < post.tags["Autor"].length; i++)
            if (post.tags["Autor"][i] ==  filters[AUTOR]) {
                numPosts++;
                return true;
            }
    }

    tags.setDateFilter = function(tag) {
        if (tags.isAlreadyTagged(tag, DATA)) {
            tags.cleanFilters();
        } else {
            tags.cleanFilters();
            filters[DATA] = tag;
        }
    }

    tags.filterByDate = function (post) {
        for (var i = 0; i < post.tags["Data"].length; i++)
            if (post.tags["Data"][i] ==  filters[DATA]) {
                numPosts++;
                return true;
            }
    }

    tags.setTagType = function (values) {
        if (tags.isToCleanFilter(values)) {
            tags.cleanFilters()
        }
        valuesTag = values;
        return Array.from(values).sort();
    }

    tags.setFilterTag = function (tag) {
        var tagType = tags.searchKeyforValue(valuesTag);
        var temp = filters;

        if (tag == null) {
            filters = temp
        } else if (tagType == "Data") {
            tags.setDateFilter(tag)
        } else if (tagType == "Autor") {
            tags.setAuthorFilter(tag)
        }
    }

    tags.filterByTag = function (post) {
        if (tags.noFilter()) {
            return true

        } else if (filters[TEMA]  !== "" ) {
            return tags.filterByTheme(post)

        } else if (filters[AUTOR]  !== "") {
            return tags.filterByAuthor(post)

        } else if (filters[DATA]  !== "") {
            return tags.filterByDate(post)
        } else {
            return true
        }
    };

    tags.cleanFilters = function () {
        filters = ["", "", ""];
        numPosts = 0;
    };

    tags.isAlreadyTagged = function (tag, typeFilter) {
        if (filters[typeFilter] == tag) {
            return true
        }
    };

    tags.noFilter = function () {
        return (filters[TEMA]  === ""  &&
        filters[AUTOR] === ""  &&
        filters[DATA]  === ""    );
    };

    tags.searchKeyforValue = function (values) {
        for(var key in barFilters) {
            if(barFilters[key] === values && barFilters.hasOwnProperty(key)) {
                return key;
            }
        }
    };

    tags.isToCleanFilter = function (setKeyFilter) {
        var action = tags.searchKeyforValue(setKeyFilter)

        if (action === "Limpar Filtro") {
            return true
        } else {
            return false
        }
    };

    tags.getNumPosts = function () {
        return numPosts;
    };

    return tags;

});
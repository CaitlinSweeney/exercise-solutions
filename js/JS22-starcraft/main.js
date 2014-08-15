var playersPerPage = 20;
var totalPages = 0;
var currentPage = 0;
var originalSet = null;
var columnHeaders = [];
var listData = allData.data;
var itemDisplay, paginationDisplay, headerDisplay, currentSort, currentSortDirection;

/**
 * Force a number to be no smaller than min and no larger than max
 * @param  {number} val value to clamp
 * @param  {number} min minimum for val
 * @param  {number} max maximum for val
 * @return {number}     Clamped number
 */
var clamp = function(val, min, max){
  return Math.min(max, Math.max(min, val));
}

/**
 * Search for a needle in a haystack, string-style
 * @param  {string} needle   Item to search for
 * @param  {string} haystack String to search through
 * @return {boolean}          True if found
 */
var fuzzyStringSearch = function(needle, haystack){
  return haystack.toUpperCase().indexOf(needle.toUpperCase()) > -1;
}

/**
 * Render the headers of the table from the dataset
 * @param  {array} headers List of headers
 */
var renderHeaders = function(headers){
  columnHeaders = [];
  headerDisplay.empty();
  headers.map(function(header, i){
    var printHeader = header[0].toUpperCase() + header.substr(1);
    columnHeaders.push(header);
    headerDisplay.append('<th><a href="#" data-sort="'+header+'">' + printHeader + '</a></th>');
  });
}

/**
 * Render the different filters based on values from dataset
 */
var renderFilters = function() {
  // Render all the data for the "region" select
  //  Pull out only the region values, get only unique items, then sort alphabetically
  var regions = _.chain(listData).pluck('region').uniq().value().sort();
  $('#region').append('<option>All</option>');
  regions.map(function(region){
    $('#region').append('<option>' + region + '</option>');
  });

  // Render all the data for the "race" select
  //  Pull out only the race values, get only unique items, then sort alphabetically
  var races = _.chain(listData).pluck('race').uniq().value().sort();
  $('#race').append('<option>All</option>');
  races.map(function(race){
    $('#race').append('<option>' + race + '</option>');
  });
}

/**
 * Filter the list data based on user inputs
 */
var performFilters = function(){
  var usernameFilter = $('#username').val();
  var fullnameFilter = $('#fullname').val();
  var regionFilter = $('#region').val();
  var raceFilter = $('#race').val();

  // filter the original set by each possible filter item
  listData = _.filter(originalSet.slice(), function(player){
    // assume each item is a match, so any fail case will prevent this from adding
    if(usernameFilter !== '' && !fuzzyStringSearch(usernameFilter, player.username))
      return false;
    if(fullnameFilter !== '' && !fuzzyStringSearch(fullnameFilter, player.fullname))
      return false;
    if(regionFilter !== 'All' && player.region !== regionFilter)
      return false;
    if(raceFilter !== 'All' && player.race !== raceFilter)
      return false;

    return true;
  });

  if(currentSortDirection && currentSort)
    sortData(currentSort, currentSortDirection);

  gotoPage(0);
}

/**
 * Render dataset statistics
 */
var renderStats = function(){
  var totalPlayers = originalSet.length;
  var totalGames = _.reduce(originalSet, function(count, player){
    return count + player.wins;
  }, 0);
  var racePopularity = _.chain(originalSet)
    .groupBy('race')
    .pairs()
    .sortBy(function(item){ return -item[1].length; })
    .map(function(item){
      return item[0] + ' - ' + item[1].length;
    })
    .value();

  $('#total-players').text(totalPlayers);
  $('#total-games').text(totalGames);
  $('#race-popularity').html(racePopularity.join('<br>'));
}

/**
 * Render a single page
 * @param  {array} items Items to display
 */
var renderPage = function(items){
  itemDisplay.empty();
  items.map(function(item){
    var el = $('<tr>');
    for(var ind in item){
      el.append('<td>' + item[ind] + '</td>');
    }
    itemDisplay.append(el);
  });
}

/**
 * Update the pagination display based on the current data and sorting
 * @param  {number} page Page currently on
 */
var updatePagination = function(page){
  paginationDisplay.empty();
  var prevPage = clamp(currentPage - 1, 0, totalPages);
  var nextPage = clamp(currentPage + 1, 0, totalPages);

  paginationDisplay.append('<a href="#" class="first" data-page="0">First</a>');
  paginationDisplay.append('<a href="#" class="prev" data-page="'+prevPage+'">Previous</a>');

  for(var i = 0; i <= totalPages; i++){
    var pageNavEl = $('<a href="#" class="page" data-page="'+i+'">'+(i+1)+'</a>');
    if(!!currentSort){
      var pData = getPageData(i);
      var pItemFirst = pData[0][currentSort];
      var pItemLast = pData[pData.length - 1][currentSort];
      if(parseInt(pItemFirst) == pItemFirst){
        pageNavEl.text('['+pItemFirst+'-'+pItemLast+']');
      } else {
        pageNavEl.text('['+pItemFirst.toLowerCase().substr(0,2)+'-'+pItemLast.toLowerCase().substr(0,2)+']');
      }

    }
    if(i === page){
      pageNavEl.addClass('active');
    }
    paginationDisplay.append(pageNavEl);
  }

  paginationDisplay.append('<a href="#" class="next" data-page="'+nextPage+'">Next</a>');
  paginationDisplay.append('<a href="#" class="last" data-page="'+totalPages+'">Last</a>');
}

/**
 * Sort the list data based on a given property and direction
 * @param  {string} sort      Property to sort on
 * @param  {string} direction "asc" or "desc"
 */
var sortData = function(sort, direction){
  if(!direction) direction = 'asc';
  currentSort = sort;
  currentSortDirection = direction;

  listData = listData.sort(function(a,b){
    if(a[sort] === b[sort])
      return 0;
    if(direction === 'asc')
      return (a[sort] > b[sort])?1:-1;
    if(direction === 'desc')
      return (b[sort] > a[sort])?1:-1;
  });
  gotoPage(0);
}

/**
 * Get list for a given page number
 * @param  {number} page Page number
 * @return {array}      Resulting data set
 */
var getPageData = function(page){
  return listData.slice(page * playersPerPage, (page + 1) * playersPerPage);
}

/**
 * Navigate to a given page number
 * @param  {number} page Page to navigate to
 */
var gotoPage = function(page){
  totalPages = Math.ceil(listData.length / playersPerPage) - 1;
  currentPage = clamp(page, 0, totalPages);

  var pageItems = getPageData(page);
  renderPage(pageItems);

  updatePagination(currentPage);
}

/**
 * Initialize on document ready
 */
$(document).on('ready', function() {
  // Cache the jQuery selectors
  headerDisplay = $('#list thead tr');
  itemDisplay = $('#list tbody');
  paginationDisplay = $('.pagination');

  // Render the initial headers
  renderHeaders(allData.cols);

  // Take the array of data from the original list and convert into objects
  originalSet = allData.data.map(function(item){
    return _.object(columnHeaders, item);
  });

  // update the actual list to match the object version
  listData = originalSet;

  // Render statistics
  renderStats();

  // Render the filters
  renderFilters();

  // Render the first page
  gotoPage(0);

  // Delegate the pagination links
  paginationDisplay.on('click', 'a', function(e){
    e.preventDefault();
    gotoPage(parseInt($(this).attr('data-page')));
  });

  // Delegate the sort links
  headerDisplay.on('click', 'a', function(e){
    e.preventDefault();
    var sortOn = $(this).attr('data-sort');
    var sortDir = $(this).attr('data-direction') || 'asc';
    sortData(sortOn, sortDir);

    // update directions, clear out all other sorting items
    $(this).closest('tr').find('a').removeAttr('data-direction');
    $(this).attr('data-direction', (sortDir === 'asc')?'desc':'asc');
  });

  // Set up the form to allow filtering
  $('.filter').on('submit', function(e) {
    e.preventDefault();
    performFilters();
  });

  // Handle filter resetting
  $('.filter .reset').on('click', function(e){
    // clear all the fields and reset the filters
    $('.filter input[type=text]').val('');
    $('.filter select').val('All');
    listData = originalSet.slice();
    if(currentSortDirection && currentSort)
      sortData(currentSort, currentSortDirection);
    gotoPage(0);
  });
});

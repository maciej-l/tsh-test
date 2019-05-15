(($) => {

    // dom controller
    const domController = (() => {
        const domStrings = {
            dataTable: '#data-table',
            poundSelect: '#pound-rating',
            poundsRaitingBadge: '.badge-container',
            searchInput: '#search-suppliers',
            resetBtn: '#reset-btn',
            searchBtn: '#search-btn',
            paginationBtn: '.page-link'
        }

        return {
            getDomStrings: () => {
                return domStrings;
            }
        }
    })();

    // app controller
    const appController = ((domCtrl) => {
        const domElements = domCtrl.getDomStrings();

        // get data from file
        const getData = (dataFile = 'page1.json') => {
            $.ajax({
                url: `./assets/data/${dataFile}`,
                method: 'GET',
                dataType: 'json'
            })
            .done(response => {
                insertDataToTable(response);
                buildSelect(response);
            })
            .fail(error => {
                alert(error.statusText);
            })
        }

        // build table
        const insertDataToTable = (data) => {
            const $tableBody = $(domElements.dataTable).find('tbody');

            // insert pound rating badge to table and set active rating pound badge
            const poundBadge = () => {
                let $poundBadge = `<span class="badge badge-pill badge-light">&#163;</span>`,
                    $badgeContainer = $('.badge-container'),
                    i = 0;

                    // insert pound badge to table cell
                    while (i < 5) {
                        $badgeContainer.prepend($poundBadge);
                        i++;
                    }
                    
                    $.each($badgeContainer, (index, value) => {
                        let ratingCounter = $(value).data('rating'),
                            $badge = $(value).children();

                            $.each($badge, (i, v) => {
                                if (i < ratingCounter) {
                                    $(v).addClass('badge-active');
                                }
                            });
                    });
            }

            // clear table body
            $tableBody.empty();

            $.each(data, (index, value) => {
                let $tableRow = `
                    <tr>
                        <td class="name-container" data-name="${value.name}">
                            ${value.name}
                        </td>
                        <td class="badge-container" data-rating="${value.rating}"></td>
                        <td class="reference-container">
                            ${value.reference}
                        </td>
                        <td class="value-container">
                            &#163; ${value.value}
                        </td>
                    </tr>
                `;

                // append row to table
                $tableBody.append($tableRow);
            });

            poundBadge();
        }
        
        // build select
        const buildSelect = (data) => {
            let $select = $(domElements.poundSelect),
                subRating = [];

            // create array with rating values
            $.each(data, (index, value) => {
                subRating.push(value.rating);
            });

            // remove duplicated rating values
            let uniqueRating = [...new Set(subRating)].sort();


            // clear selec from options
            $select.empty();

            // insert info to select
            $select.append('<option value="">Select pound rating</option>');

            // isert rating to pound rating select
            $.each(uniqueRating, (index, value) => {
                let $option = `<option value="${value}">${value}</option>`;
                $select.append($option);
            });
        }

        // Pagination
        const pagination = () => {
            const $paginationLink = $(domElements.paginationBtn);

            $paginationLink.on('click', (event) => {
                event.preventDefault();
                let $clickedPageLink = $(event.currentTarget);

                // Remove active class from pagination element
                if ($paginationLink.parent().hasClass('active')) {
                    $paginationLink.parent().removeClass('active');
                }

                // Add active class to current page link
                if ($clickedPageLink.attr('href') !== 'start' && $clickedPageLink.attr('href') !== 'end') {
                    $clickedPageLink.parent().addClass('active');
                } else if($clickedPageLink.attr('href') === 'start') {
                    $($paginationLink[1]).parent().addClass('active');
                } else if($clickedPageLink.attr('href') === 'end') {
                    $($paginationLink[$paginationLink.length - 2]).parent().addClass('active');
                }

                // check pagination and set active link item
                if ($clickedPageLink.attr('href') === 'start' || $clickedPageLink.attr('href') === 'page-1') {
                    getData('page1.json');
                } else if ($clickedPageLink.attr('href') === 'end' || $clickedPageLink.attr('href') === 'page-2') {
                    getData('page2.json');
                }
            });
        }

        

        return {
            init: () => {
                getData();
                pagination();
                // searchForm();
                console.log('app is running'); //NOTE
            }
        }
    })(domController);

    appController.init();
})(jQuery);
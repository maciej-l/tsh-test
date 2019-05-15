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
            paginationBtn: '.page-link',
            modalSupplierName: '.supplier-name',
            modalSupplierRatingContainer: '.rating-modal-container',
            modalSupplierReference: '.supplier-reference',
            modalSupplierValue: '.supplier-value'
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

            // clear table body
            $tableBody.empty();

            // build table row with data
            $.each(data, (index, value) => {
                let $tableRow = (`
                    <tr class="modal-handler">
                        <td class="name-container" data-name="${value.name}">
                            ${value.name}
                        </td>
                        <td class="badge-container" data-rating="${value.rating}"></td>
                        <td class="reference-container" data-reference="${value.reference}">
                            ${value.reference}
                        </td>
                        <td class="value-container" data-value="${value.value}" valign="center">
                            &#163; ${value.value}
                        </td>
                    </tr>
                `);

                // append row to table
                $tableBody.append($tableRow);
                
                $.each($('.badge-container'), (i,v) => {
                    $(v).html(createPoundBadge($(v).data('rating')));
                });
            });
        }

        // create pound rating badge for table and modal and set active rating pound badge
        const createPoundBadge = (rating) => {
            let $badgeContainer = $('<div>'),
                counter = 0;

                // create pound badge and pass it to container
                while (counter < 5) {
                    let $poundBadge = $('<span class="badge badge-pill badge-light">&#163;</span>');

                    // set active pound 
                    if (counter < rating) {
                        $poundBadge.addClass('badge-active');
                    }
                    
                    $badgeContainer.append($poundBadge);
                    counter++;
                }
            return $badgeContainer;
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

        // Click event on table row to open Data modal
        const dataTableModal = () => {
            const $supplierName = $(domElements.modalSupplierName),
                $supplierRating = $(domElements.modalSupplierRatingContainer),
                $supplierReference = $(domElements.modalSupplierReference),
                $supplierValue = $(domElements.modalSupplierValue);
            
            // click event on table row
            $(document).on('click', 'tr.modal-handler', (event) => {
                let supplierName = $(event.currentTarget).find('td').data('name'),
                    supplierRating = $(event.currentTarget).find('td.badge-container').data('rating'),
                    supplierReference =$(event.currentTarget).find('td.reference-container').data('reference'),
                    supplierValue = $(event.currentTarget).find('td.value-container').data('value');

                // Insert data to modal
                $supplierName.text(supplierName);
                $supplierRating.html(createPoundBadge(supplierRating));
                $supplierReference.text(supplierReference);
                $supplierValue.text(supplierValue);

                // Show modal
                $('.data-tabel-modal').modal('show');
            });
       }

        return {
            init: () => {
                getData();
                pagination();
                dataTableModal();
                console.log('app is running'); //NOTE
            }
        }
    })(domController);

    appController.init();
})(jQuery);
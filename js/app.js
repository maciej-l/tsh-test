(($) => {

    // dom controller
    const domController = (() => {
        const domStrings = {
            dataTable: '#data-table',
            poundSelect: '#pound-rating',
            searchInput: '#search-suppliers',
            resetBtn: '#reset-btn',
            searchBtn: '#search-btn'
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
        const getData = () => {
            $.ajax({
                url: './assets/data/page1.json',
                method: 'GET',
                dataType: 'json'
            })
            .done(response => {
                insertDataToTable(response);
                buildSelec(response);
                console.log(response); //NOTE
            })
            .fail(error => {
                alert(error.statusText);
            })
        }

        // build table
        const insertDataToTable = (data) => {
            const $table = $(domElements.dataTable);

            $.each(data, (index, value) => {
                let $tableRow = `
                    <tr>
                        <td data-name="${value.name}">
                            ${value.name}
                        </td>
                        <td data-rating="${value.rating}">
                            ${value.rating}
                        </td>
                        <td>
                            ${value.reference}
                        </td>
                        <td>
                            ${value.value}
                        </td>
                    </tr>
                `;

                // append row to table
                $table.find('tbody').append($tableRow);
            });
        }
        
        // build select
        const buildSelec = (data) => {
            let $select = $(domElements.poundSelect),
                subRating = [];

            // create array with rating values
            $.each(data, (index, value) => {
                subRating.push(value.rating);
            });

            // remove duplicated rating values
            let uniqueRating = [...new Set(subRating)].sort();

            // isert rating to pound rating select
            $.each(uniqueRating, (index, value) => {
                let $option = `<option value="${value}">${value}</option>`;
                $select.append($option);
            });
        }

        

        return {
            init: () => {
                getData();
                searchForm();
                console.log('app is running'); //NOTE
            }
        }
    })(domController);

    appController.init();
})(jQuery);
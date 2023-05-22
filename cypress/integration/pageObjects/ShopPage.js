
class ShopPage {
    getCheckoutBtn() {
        return cy.get('.btn-primary').contains('Checkout')
    }

    // getItemsPrice() {
    //     var sum = 0;
    //     cy.get('table.table-hover tbody tr > :nth-child(4) > strong').each((el, index, list) => {
    //         const amount = el.text();
    //         var result = amount.split(' ');
    //         result = result[1].trim();
    //         sum = Number(sum) + Number(result);
    //     })
    // }

    // compareTotalPrice() {
    //     cy.get('td.text-right strong').then((el) => {
    //         const amount = el.text();
    //         var res = amount.split(' ');
    //         const total = Number (res[1].trim());
    //         expect(Number(total)).to.equal()
    //     })
    // }

    getCountryField() {
        return cy.get('#country');
    }

    getAutoSuggestion() {
        return cy.get('.suggestions > ul > li > a', {timeout:10000})
    }

    getPurchaseBtn() {
        return cy.get("input[value='Purchase']")
    }

    getSuccessMessage() {
        return cy.get('div.alert-success')
        }
}

export default ShopPage;
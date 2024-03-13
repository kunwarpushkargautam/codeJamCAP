const cds = require('@sap/cds');
const { uuid } = cds.utils;
module.exports = cds.service.impl(async function () {
    const northwind = await cds.connect.to('northwind');
    this.on('READ', 'Products', async req => {
        return northwind.run(req.query);
    });
    this.on('checkPrices', 'Products', async req => {
        let product = await northwind.run(req.query);
        let discount = (product.UnitsInStock > 20) ? 5 : 0;
        return {
            Price: product.UnitPrice * req.data.units,
            FinalPrice: product.UnitPrice * req.data.units * (1 - discount / 100),
            Discount: discount
        };
    });
    this.on('order','Products',async req => {
        try {
            let product = await northwind.run( req.query );
            let discount = (product.UnitsInStock > 20)? 5 : 0;
            
            let orderID = uuid() // generates a new UUID

            await cds.run(INSERT({ID:orderID, CustomerName:"Test", Address:"Test Address"})
                                    .into`my.bookshop.Orders`);
            console.log("before entry",product);
            product[0].OrderID = orderID;
            product[0].Price = product[0].UnitPrice * req.data.units;
            product[0].FinalPrice = product[0].UnitPrice * req.data.units * (1 - discount/100);
            product[0].Discount = discount;
            product[0].Developer=req.data.developer;
            console.log("this is console.log ",product);
            await cds.run(INSERT(product).into`my.bookshop.OrderProducts`);
            
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    });
});
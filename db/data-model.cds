namespace my.bookshop;

using {cuid} from '@sap/cds/common';

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}


entity OrderProducts : cuid {
  OrderID         : UUID;
  ProductID       : Integer;
  ProductName     : String;
  SupplierID      : Integer;
  CategoryID      : Integer;
  QuantityPerUnit : String;
  UnitPrice       : Decimal;
  UnitsInStock    : Decimal;
  UnitsOnOrder    : Decimal;
  ReorderLevel    : Decimal;
  Discontinued    : Boolean;
  Price           : Decimal;
  FinalPrice      : Decimal;
  Discount        : Decimal;
  Developer       : String;
}

entity Orders : cuid {
  Products     : Association to many OrderProducts
                   on $self.ID = Products.OrderID;
  CustomerName : String;
  Address      : String;
}

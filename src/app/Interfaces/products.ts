export interface IProducts {
    Product_SKU: string;
    IProductsData: ListProducts
}

export interface ListProducts {
    Product_Image: string;
    PRODUCT_NAME: string;

    Product_Price: string;
    Product_Stock: string;
}
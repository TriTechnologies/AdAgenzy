export interface IProducts {
    Pk: string
    Sk: string

    ProductData: IProductsData;
}

export interface IProductsData {
    Product_Image: string;
    PRODUCT_NAME: string;

    Product_Price: string;
    Product_Stock: string;

    Product_SKU: string;
    Product_Link: string;
}
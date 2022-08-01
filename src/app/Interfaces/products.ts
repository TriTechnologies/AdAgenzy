export interface IProducts {
    Pk: string
    Sk: string

    ProductData: IProductsData;
    CompetitorData: ICompetitorData;

}

export interface IProductsData {


    Product_Image: string;
    PRODUCT_NAME: string;

    Product_Price: string;
    Product_Stock: string;

    Product_SKU: string;
    Product_Link: string;

    Categories: string;
    Brands: string;

   


}
export interface ICompetitorData {

    Comp_Store: string;
    Comp_Store_Link: string;

    Comp_prod_delivery_price: string;
    Comp_Prod_Price: string;
}


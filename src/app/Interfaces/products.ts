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

    Product_ID: string;

   


}
export interface ICompetitorData {

    Competitor_Store: string;
    Competitor_Store_Link: string;

    Competitor_product_delivery: string;
    Competitor_Product_Price: string;
}


from email import message
from woocommerce import API
import boto3
from flask import Flask, jsonify, request

def handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('adagenzytable-dev')

    total_prod = []
    wcapi = API(
        url="https://newnordichome.dk",
        consumer_key="ck_6c85434a7375c2376149c0c0bb7ad89f5ba5aaaa",
        consumer_secret="cs_080b1d9fcc10d021b29a77a3bd06f2615f31ed94",
        wp_api=True,
        version="wc/v3",
        timeout=50
    )   
    page = 1
    while True:
            products = wcapi.get('products', params={'per_page': 40, 'page': page}).json()
            for s in products:
                    prod_id = s['id']
                    prod_sku = s['sku']
                    prod_name = s['name']
                    prod_link = s['permalink']
                    prod_barcode = s['barcode']
                    prod_price = s['price']
                    prod_stock = s['stock_status']
                    image = s['images']
                    categories = s['categories']
                    brands = s['brands']
                    category_arr = []
                    brand_arr = []
                    for c in categories:
                        category = c['name']
                        category_arr.append(category)
                    for b in brands:
                        brand = b['name']
                        brand_arr.append(brand)
                    for i in image:
                        prod_image = i['src']
                        break
                    prod_json = {
                        'Product_ID' : prod_id,
                        'Product_SKU' : prod_sku,
                        'PRODUCT_NAME' : prod_name,
                        'Product_Link' : prod_link,
                        'Product_Image' : prod_image,
                        'Product_Price' : prod_price,
                        'Product_Stock' : prod_stock,
                        'Product_Barcode' : prod_barcode,
                        'Categories': category_arr,
                        'Brands': brand_arr

                    }
                    total_prod.append(prod_json)
            
            if len(products) == 0:
                break
            page = page + 1
    print("Products Store", len(total_prod))
    i = 0
    for product in total_prod:
        i = i + 1
        table.put_item(
                    Item={
                        "PK": str(i),
                        "SK": "products",
                        "ProductData": product
                    }
                )
    return jsonify(message="Created")
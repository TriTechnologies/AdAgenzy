from woocommerce import API
import time
import boto3
import uuid

def handler(event, context):
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table('adagenzytable-dev')

    total_prod = []
    wcapi = API(
        url="https://newnordichome.dk",
        consumer_key="ck_6c85434a7375c2376149c0c0bb7ad89f5ba5aaaa",
        consumer_secret="cs_080b1d9fcc10d021b29a77a3bd06f2615f31ed94",
        version="wc/v3"
    )
    time.sleep(2)

    r = wcapi.get("products", params={"per_page": 40}).json()

    for s in r:
        prod_id = s['id']
        prod_sku = s['sku']
        prod_name = s['name']
        prod_link = s['permalink']
        prod_barcode = s['barcode']
        prod_price = s['price']
        prod_stock = s['stock_status']
        image = s['images']
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
            'Product_Barcode' : prod_barcode

        }
        total_prod.append(prod_json)
    print(total_prod)

    resp = table.put_item(
        Item={
            "PK": str(uuid.uuid4()),
            "SK": "products",
            "ProductData": total_prod
        }
    )